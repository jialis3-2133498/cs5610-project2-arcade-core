import test from "node:test";
import assert from "node:assert/strict";
import { move, moveWithScore } from "../src/index.js";

test("moveWithScore calculates score when moving left", () => {
  const board = [
    [2, 2, 0, 0],
    [2, 2, 0, 0],
    [4, 4, 0, 0],
    [4, 4, 0, 0],
  ];

  const expectedBoard = [
    [4, 0, 0, 0],
    [4, 0, 0, 0],
    [8, 0, 0, 0],
    [8, 0, 0, 0],
  ];
  const actual = moveWithScore(board, "left");
  assert.deepStrictEqual(actual.board, expectedBoard);
  assert.strictEqual(actual.score, 24);
});

test("moveWithScore calculates score when moving right", () => {
  const board = [
    [2, 2, 0, 0],
    [2, 2, 0, 0],
    [4, 4, 0, 0],
    [4, 4, 0, 0],
  ];

  const expectedBoard = [
    [0, 0, 0, 4],
    [0, 0, 0, 4],
    [0, 0, 0, 8],
    [0, 0, 0, 8],
  ];
  const actual = moveWithScore(board, "right");
  assert.deepStrictEqual(actual.board, expectedBoard);
  assert.strictEqual(actual.score, 24);
});

test("moveWithScore calculates score when moving up", () => {
  const board = [
    [2, 2, 0, 0],
    [2, 2, 0, 0],
    [4, 4, 0, 0],
    [4, 4, 0, 0],
  ];

  const expectedBoard = [
    [4, 4, 0, 0],
    [8, 8, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const actual = moveWithScore(board, "up");
  assert.deepStrictEqual(actual.board, expectedBoard);
  assert.strictEqual(actual.score, 24);
});

test("moveWithScore calculates score when moving down", () => {
  const board = [
    [2, 2, 0, 0],
    [2, 2, 0, 0],
    [4, 4, 0, 0],
    [4, 4, 0, 0],
  ];

  const expectedBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [4, 4, 0, 0],
    [8, 8, 0, 0],
  ];
  const actual = moveWithScore(board, "down");
  assert.deepStrictEqual(actual.board, expectedBoard);
  assert.strictEqual(actual.score, 24);
});

test("moveWithScore merges each tile only once", () => {
  const board = [
    [2, 2, 2, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const actual = moveWithScore(board, "left");

  assert.deepStrictEqual(actual.board, [
    [4, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  assert.strictEqual(actual.score, 8);
});

test("moveWithScore and move should return the same board in all directions", () => {
  const board = [
    [2, 0, 2, 4],
    [4, 4, 0, 8],
    [2, 2, 4, 4],
    [0, 8, 8, 0],
  ];
  const directions = ["left", "right", "up", "down"];
  for (const direction of directions) {
    const boardUsedMove = move(board, direction);
    const boardUsedMoveWithScore = moveWithScore(board, direction);

    assert.deepStrictEqual(boardUsedMove, boardUsedMoveWithScore.board);
  }
});

test("moveWithScore moves tiles without merging when no equal tiles can merge", () => {
  const board = [
    [0, 2, 4, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const expected = [
    [2, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const actual = moveWithScore(board, "left");

  assert.deepStrictEqual(actual.board, expected);

  assert.strictEqual(actual.score, 0);
});

test("moveWithScore does not modify the original board", () => {
  const board = [
    [2, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const original = board.map((row) => [...row]);
  const resultObject = moveWithScore(board, "left");

  assert.deepStrictEqual(board, original);
  assert.notStrictEqual(resultObject.board, board);
});

test("moveWithScore throws an error when the direction is invalid", () => {
  const board = [
    [2, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  assert.throws(() => moveWithScore(board, "diagonal"), RangeError);
});

test("moveWithScore does not merge tiles created by a previous merge", () => {
  const board = [
    [2, 2, 4, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const result = moveWithScore(board, "left");

  assert.deepStrictEqual(result.board[0], [4, 4, 0, 0]);
  assert.strictEqual(result.score, 4);
});
