import React from "react";

function ChessBoard() {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

  return (
    <div className="chess-board">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`${row} row`}>
          {cols.map((col, colIndex) => (
            <div
              key={colIndex}
              id={`col-${col}`}
              className={`${row % 2 === colIndex % 2 ? "dark" : "white"}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ChessBoard;
