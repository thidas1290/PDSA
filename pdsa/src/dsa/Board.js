// Board.tsx

const DIMENSIONS = 3;
const DRAW = 0;

export default class Board {
  grid = [];
  constructor(grid) {
    this.grid = new Array(DIMENSIONS ** 2).fill(null);
  }

  getEmptySquares = (grid = this.grid) => {
    let squares = [];
    grid.forEach((square, i) => {
      if (square === null) squares.push(i);
    });
    return squares;
  };

  isEmpty = (grid = this.grid) => {
    return this.getEmptySquares(grid).length === DIMENSIONS ** 2;
  };

  makeMove = (square, player) => {
    if (this.grid[square] === null) {
      this.grid[square] = player;
    }
  };

  getWinner = (grid = this.grid) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let res = null;
    winningCombos.forEach((el, i) => {
      if (
        grid[el[0]] !== null &&
        grid[el[0]] === grid[el[1]] &&
        grid[el[0]] === grid[el[2]]
      ) {
        res = grid[el[0]];
      } else if (res === null && this.getEmptySquares(grid).length === 0) {
        res = DRAW;
      }
    });
    return res;
  };

  clone = () => {
    return new Board(this.grid.concat());
  };
}
