import test from "node:test";
import assert from "node:assert/strict";
import { hasMoves, move } from "../src/index.js";
import { canMove } from "../src/index.js";
import { spawn } from "../src/index.js";

test("Move left merges equal tiles", () => {
  const board = [
    [2, 0, 2, 4],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const expected = [
    [4, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const actual = move(board, "left");
  assert.deepStrictEqual(actual, expected);
});

test("Move right merges equal tiles", () => {
  const board = [
    [2, 0, 2, 4],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const expected = [
    [0, 0, 4, 4],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const actual = move(board, "right");
  assert.deepStrictEqual(actual, expected);
});

test("Move up merges equal tiles", () => {
  const board = [
    [2, 0, 0, 0],
    [2, 0, 0, 0],
    [4, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const expected = [
    [4, 0, 0, 0],
    [4, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const actual = move(board, "up");
  assert.deepStrictEqual(actual, expected);
});

test("Move down merges equal tiles", () => {
  const board = [
    [2, 0, 0, 0],
    [2, 0, 0, 0],
    [4, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const expected = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [4, 0, 0, 0],
    [4, 0, 0, 0],
  ];
  const actual = move(board, "down");
  assert.deepStrictEqual(actual, expected);
});

test("A tile can merge only once per move", () => {
  const board = [
    [4, 4, 8, 0],
    [2, 2, 2, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const expected = [
    [8, 8, 0, 0],
    [4, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const actual = move(board, "left");
  assert.deepStrictEqual(actual, expected);
});

test("Move does not mutate the original board", () => {
  const board = [
    [2, 0, 2, 4],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const original = board.map((row) => [...row]);
  const result = move(board, "left");

  // Verify board is unchanged
  assert.deepStrictEqual(board, original);

  // Verify result is a different array from board
  assert.notStrictEqual(result, board);

  // Verify the returned row is a different array
  assert.notStrictEqual(result[0], board[0]);
});

test("Move does not change an already settled board", () => {
  const board = [
    [2, 4, 8, 16],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const expected = [
    [2, 4, 8, 16],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const actual = move(board, "left");
  assert.deepStrictEqual(actual, expected);
});

test("Moving an empty board does not change it", () => {
  const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const directions = ["left", "right", "up", "down"];

  for (const direction of directions) {
    const actual = move(board, direction);
    assert.deepStrictEqual(actual, board);
  }
});

test("Move throws an error for an invalid direction", () => {
  const board = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  assert.throws(() => move(board, "diagonal"), RangeError);
});

test("canMove returns false when moving left changes nothing", () => {
  const board = [
    [2, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const expected = false;
  const actual = canMove(board, "left");
  assert.strictEqual(actual, expected);
});

test("canMove returns true when moving right changes the board", () => {
  const board = [
    [2, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const expected = true;
  const actual = canMove(board, "right");
  assert.strictEqual(actual, expected);
});

test("canMove returns true when a full board has mergeable tiles", () => {
  const board = [
    [2, 2, 4, 8],
    [4, 8, 16, 32],
    [8, 16, 32, 64],
    [16, 32, 64, 128],
  ];
  const expected = true;
  const actual = canMove(board, "left");
  assert.strictEqual(actual, expected);
});

test("canMove returns false when a full board has no mergeable tiles", () => {
  const board = [
    [2, 4, 2, 4],
    [4, 2, 4, 2],
    [2, 4, 2, 4],
    [4, 2, 4, 2],
  ];
  const expected = false;
  const directions = ["left", "right", "up", "down"];
  for (const direction of directions) {
    const actual = canMove(board, direction);
    assert.strictEqual(actual, expected);
  }
});

test("hasMoves returns true when at least one move is possible", () => {
  const board = [
    [2, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const expected = true;
  const actual = hasMoves(board);
  assert.strictEqual(actual, expected);
});

test("hasMoves returns false when no move is possible", () => {
  const board = [
    [2, 4, 2, 4],
    [4, 2, 4, 2],
    [2, 4, 2, 4],
    [4, 2, 4, 2],
  ];
  const expected = false;
  const actual = hasMoves(board);
  assert.strictEqual(actual, expected);
});

test("hasMoves returns true when at least one move is possible when the board is full", () => {
  const board = [
    [2, 2, 4, 8],
    [4, 8, 16, 32],
    [8, 16, 32, 64],
    [16, 32, 64, 128],
  ];
  const expected = true;
  const actual = hasMoves(board);
  assert.strictEqual(actual, expected);
});

test("spawn adds a 2 to a randomly selected empty cell", () => {
  const board = [
    [2, 0],
    [0, 4],
  ];

  const expected = [
    [2, 2],
    [0, 4],
  ];
  const actual = spawn(board, () => 0.2);
  assert.deepStrictEqual(actual, expected);
});

test("spawn adds a 4 to a randomly selected empty cell", () => {
  const board = [
    [2, 0],
    [0, 4],
  ];

  const expected = [
    [2, 0],
    [4, 4],
  ];
  const actual = spawn(board, () => 0.97);
  assert.deepStrictEqual(actual, expected);
});

test("spawn does not change a full board", () => {
  const board = [
    [2, 4, 8, 16],
    [4, 8, 16, 32],
    [8, 16, 32, 64],
    [16, 32, 64, 128],
  ];
  const expected = [
    [2, 4, 8, 16],
    [4, 8, 16, 32],
    [8, 16, 32, 64],
    [16, 32, 64, 128],
  ];
  const actual = spawn(board, () => 0.5);
  assert.deepStrictEqual(actual, expected);
});

test("spawn fills the only empty cell", () => {
  const board = [
    [2, 4, 8, 16],
    [4, 8, 16, 32],
    [8, 16, 0, 64],
    [16, 32, 64, 128],
  ];
  const expected = [
    [2, 4, 8, 16],
    [4, 8, 16, 32],
    [8, 16, 2, 64],
    [16, 32, 64, 128],
  ];
  const actual = spawn(board, () => 0.5);
  assert.deepStrictEqual(actual, expected);
});

test("spawn does not modify the original board", () => {
  const board = [
    [2, 4, 8, 16],
    [4, 8, 16, 32],
    [8, 16, 0, 64],
    [16, 32, 64, 128],
  ];
  const original = board.map((row) => [...row]);
  const result = spawn(board, () => 0.2);
  assert.deepStrictEqual(board, original);
  assert.notStrictEqual(result, board);
  for (let rowIndex = 0; rowIndex < original.length; rowIndex++) {
    assert.notStrictEqual(result[rowIndex], original[rowIndex]);
  }
});
