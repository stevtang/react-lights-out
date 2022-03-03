import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let row = 0; row < nrows; row++) {
      let rowArr = [];
      for (let col = 0; col < ncols; col++) {
        const cellVal = (Math.random() < chanceLightStartsOn) ? true : false;
        rowArr.push(cellVal);
      }
      initialBoard.push(rowArr);
    }

    console.log("initialBoard = ", initialBoard);

    return initialBoard;
  }


  function hasWon() {
    for (let row of board) {
      for (let cell of row) {
        console.log("cell= ", cell);
        if (cell === true) return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => row.slice())

      flipCell(y, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);

      return boardCopy;
    });
  }


  return (
    // if the game is won, just show a winning msg & render nothing else
    <div className="Board">
      <p className="Board-win"> {hasWon && "You won!"} </p>

      <table className="Board-display">
        {
          board.map(function (row, rowIdx) {
            const displayBoard = row.map(function (col, colIdx) {
              const flipCellsAroundMe = (rowIdx, colIdx) => flipCellsAround(`${rowIdx}-${colIdx}`);
              return < Cell flipCellsAroundMe={flipCellsAroundMe} isLit={board[rowIdx][colIdx]} />
            });
            return displayBoard
          })
        }
      </table>
    </div >
  );
}

export default Board;
