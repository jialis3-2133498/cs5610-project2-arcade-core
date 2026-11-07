# @jialisheng/arcade-core
A lightweight JavaScript package that provides the core game logic for 2048.

## Description
This package exports four functions: `move()`, `spawn()`, `canMove()`, and `hasMoves()`, which handle tile movement, random tile generation, and move validation.

The package is independent of UI frameworks and can run in a Node.js environment.

## Installation
Install the package using npm:
```bash
npm install @jialisheng/arcade-core
```
## Usage
```javascript
import { move, spawn, canMove, hasMoves } from "@jialisheng/arcade-core";
const board = [
    [2, 0, 2, 4],
    [0, 4, 4, 0],
    [2, 2, 2, 2],
    [0, 0, 0, 0]
];
const newBoard = move(board, "left");
console.log(newBoard);
```
Expected output:
```javascript
[
    [4, 4, 0, 0],
    [8, 0, 0, 0],
    [4, 4, 0, 0],
    [0, 0, 0, 0]
]
```
## API Reference
### `move(board, direction)`
Slides and merges tiles on the board in the specified direction. It returns a new board without modifying the original board. This function does not spawn a new tile; use `spawn()` separately after a valid move.

The `direction` parameter accepts four possible values: `"left"`, `"right"`, `"up"`, and `"down"`.

### `spawn(board, rng)`
Randomly selects an empty cell and generates a new tile with a value of either 2 or 4. There is a 90% probability of generating a 2 and a 10% probability of generating a 4. It returns a new board without modifying the original board.

The `rng` parameter is optional and defaults to `Math.random`. The `rng` parameter must be a function that returns a number between 0 (inclusive) and 1 (exclusive). If no empty cells are available, the function returns a new board with the same contents.


### `canMove(board, direction)`
Checks whether moving the tiles in the specified direction would change the board. It returns `true` if the move is possible and `false` otherwise.

### `hasMoves(board)`
Checks whether at least one valid move remains in any of the four directions. It returns `true` if a valid move exists and `false` if no moves are possible.

### `moveWithScore(board, direction)`

Moves all tiles in the specified direction and calculates the score
earned from merging tiles.

**Parameters:**
- `board`: A two-dimensional array representing the game board.
- `direction`: One of `"left"`, `"right"`, `"up"`, or `"down"`.

**Returns:**
An object containing:
- `board`: The updated board after the move.
- `score`: The points earned from merges during this move.

**Example:**

```javascript
import { moveWithScore } from "@jialisheng/arcade-core";

const board = [
    [2, 2, 0, 0],
    [4, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const result = moveWithScore(board, "left");

console.log(result.score); // 12
```


## Testing
Run the unit tests using Node.js:

```bash
npm test
```