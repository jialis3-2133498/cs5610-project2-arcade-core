# Changelog
All notable changes to this package will be documented in this file.

## [0.1.1] - 2026-11-06

### Added
- Added `moveWithScore(board, direction)` to return the updated board
  and points earned from merges.
- Added unit tests for scoring, merge behavior, immutability, and
  invalid directions.

### Changed
- Refactored `move()` to reuse `moveWithScore()` while preserving
  its original return type.
- Removed redundant movement helper functions.

## [0.1.0] - Initial Release
### Added
* Implemented move(board, direction) to slide and merge tiles in all four directions.

* Implemented canMove(board, direction) to validate moves.

* Implemented hasMoves(board) to determine whether any valid moves remain.

* Implemented spawn(board, rng) to generate a new tile in a randomly selected empty cell.

* Added unit tests using the Node.js built-in test runner.

* Added a README with installation instructions, usage examples, and API documentation.