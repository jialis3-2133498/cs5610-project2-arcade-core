function removeZeros (row) {
    const result = row.filter(n => n !== 0);
    return result;
}

function mergeRow(row) {
    const result = [];
    let i = 0;

    while (i < row.length) {
        if (row[i] === row[i+1]) {
            result.push(row[i] + row[i+1]);
            i += 2;
        } else {
            result.push(row[i]);
            i += 1;
        }
    }
    return result;
}

function padZeros(row, targetLength) {
    const result = [...row];
    while (result.length < targetLength) {
        result.push(0);
    }
    return result;
}

function slideLeft(row) {
    let result = removeZeros(row);
    const rowLength = row.length;
    
    result = mergeRow(result);
    result = padZeros(result, rowLength);
    return result;
}

function moveLeft(board) {
    return board.map(row => slideLeft(row));
}

function slideRight(row) {
    const reversed = [...row].reverse();
    const newReversed = slideLeft(reversed);
    const result = [...newReversed].reverse();
    return result;
}

function moveRight(board) {
    return board.map(row => slideRight(row));
}

function transpose(board) {
    return board.map(
        (_, colIndex) => (board.map(row => row[colIndex]))
    );
}

function moveUp(board) {
    const newBoard = transpose(board);
    const leftBoard = moveLeft(newBoard);
    const result = transpose(leftBoard);
    return result;
}

function moveDown(board) {
    const newBoard = transpose(board);
    const rightBoard = moveRight(newBoard);
    const result = transpose(rightBoard);
    return result;
}

export function move(board, direction) {
    switch(direction) {
        case "left":
            return moveLeft(board);
        case "right":
            return moveRight(board);
        case "up":
            return moveUp(board);
        case "down":
            return moveDown(board);
        default:
            throw new RangeError("Invalid Direction");  
    }
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
