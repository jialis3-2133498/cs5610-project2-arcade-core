function removeZeros (row) {
    const result = row.filter(n => n !== 0);
    return result;
}

function padZeros(row, targetLength) {
    const result = [...row];
    while (result.length < targetLength) {
        result.push(0);
    }
    return result;
}

function transpose(board) {
    return board.map(
        (_, colIndex) => (board.map(row => row[colIndex]))
    );
}

function mergeRowWithScore(row) {
    const result = [];
    let score = 0;
    let i = 0;

    while (i < row.length) {
        if (i + 1 < row.length && row[i] === row[i+1]) {
            const mergedValue = row[i] + row[i + 1];

            result.push(mergedValue);
            score += mergedValue;

            i += 2;
        } else{
            result.push(row[i]);
            i += 1;
        }
    }
    return {
        row: result,
        score: score
    };
}

function slideLeftWithScore(row) {
    const rowLength = row.length;
    const rowWithNoZeros = removeZeros(row);
    const mergedRow = mergeRowWithScore(rowWithNoZeros);
    const resultRow = padZeros(mergedRow.row, rowLength);
    return {
        row: resultRow,
        score: mergedRow.score
    }
}

function slideRightWithScore(row) {
    const reversedRow = [...row].reverse();
    const slideLeftRow = slideLeftWithScore(reversedRow);
    const slideToRightRow = [...slideLeftRow.row].reverse();
    return {
        row: slideToRightRow,
        score:slideLeftRow.score
    }
}

function moveLeftWithScore(board) {
    let totalScore = 0;

    const newBoard = board.map(row => {
        const eachObject = slideLeftWithScore(row);
        const resultRow = eachObject.row;
        totalScore += eachObject.score;
        return resultRow;
    });
    return {
        board: newBoard,
        score: totalScore
    }
}

function moveRightWithScore(board) {
    let totalScore = 0;

    const newBoard = board.map(row => {
        const eachObject = slideRightWithScore(row);
        const resultRow = eachObject.row;
        totalScore += eachObject.score;
        return resultRow;
    });
    return {
        board: newBoard,
        score: totalScore
    }
}

function moveUpWithScore(board) {
    const newBoard = transpose(board);
    const newBoardMovedLeftObject = moveLeftWithScore(newBoard);
    const newBoardMovedLeft = newBoardMovedLeftObject.board;
    const totalScore = newBoardMovedLeftObject.score;
    return {
        board: transpose(newBoardMovedLeft),
        score: totalScore
    }
}

function moveDownWithScore(board) {
    const newBoard = transpose(board);
    const newBoardMovedRightObject = moveRightWithScore(newBoard);
    const newBoardMovedRight = newBoardMovedRightObject.board;
    const totalScore = newBoardMovedRightObject.score;
    return {
        board: transpose(newBoardMovedRight),
        score: totalScore
    }
}

export function move(board, direction) {
    return moveWithScore(board, direction).board;
}

export function canMove(board, direction) {
    const boardAfterMove = move(board, direction);
    if (JSON.stringify(board) === JSON.stringify(boardAfterMove)) {
        return false;
    } else {
        return true;
    }

}

export function hasMoves(board) {
    const directions = ["left", "right", "up", "down"];
    for (const direction of directions) {
        if (canMove(board, direction)) {
            return true;
        }
    }
    return false;
}

export function spawn(board, rng = Math.random) {
    const newBoard = board.map(row => [...row]);
    const emptyCells = [];
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            if (board[rowIndex][colIndex] === 0) {
                emptyCells.push([rowIndex, colIndex]);
            }
        }
    }
    if (emptyCells.length === 0) {
        return newBoard;
    }
    const randomIndex = Math.floor(rng() * emptyCells.length);
    const [rowIndex, colIndex] = emptyCells[randomIndex];
    const tileValue = rng() < 0.9 ? 2 : 4;
    newBoard[rowIndex][colIndex] = tileValue;
    return newBoard;
}

export function moveWithScore(board, direction) {
    switch (direction) {
        case "left":
            return moveLeftWithScore(board);
        case "right":
            return moveRightWithScore(board);
        case "up":
            return moveUpWithScore(board);
        case "down":
            return moveDownWithScore(board);
        default:
            throw new RangeError("Invalid Direction"); 
    }
}
