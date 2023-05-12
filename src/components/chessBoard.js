// components
import { useState } from "react";
import BoardDetails from "./boardDetails";
import { BlackPlayer } from "../models/blackPlayer";
import { WhitePlayer } from "../models/whitePlayer";

const ChessBoard = () => {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const [position, setPosition] = useState("");
  const [whitePlayer, setWhitePlayer] = useState(WhitePlayer);
  const [blackPlayer, setBlackPlayer] = useState(BlackPlayer);

  const getPosition = (e) => {
    setPosition(e.target.dataset.squarePosition);
  };

  return (
    <div className="chess-board">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`${row} row`}>
          {cols.map((col, colIndex) => (
            <div
              key={colIndex}
              id={`col-${col}`}
              className={`${row % 2 === colIndex % 2 ? "dark" : "white"}`}
              data-square-position={`${row}${col}`}
              onClick={getPosition}
            ></div>
          ))}
        </div>
      ))}
      <BoardDetails array={rows} direction="col" />
      <BoardDetails array={cols} direction="row" />
    </div>
  );
};

export default ChessBoard;
