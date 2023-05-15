// components
import { useState, useEffect } from "react";
import BoardDetails from "./boardDetails";
import { BlackPlayer } from "../models/blackPlayer";
import { WhitePlayer } from "../models/whitePlayer";

// utils
import { getNumericPosition } from "../utils/getNumericPosition";
import SingleSquare from "./singleSquare";
import PlayerDetails from "./playerDetails";

const ChessBoard = () => {
  // variable
  const ROWS = [1, 2, 3, 4, 5, 6, 7, 8];
  const COLS = ["a", "b", "c", "d", "e", "f", "g", "h"];

  // states
  const [whitePlayer, setWhitePlayer] = useState(WhitePlayer);
  const [blackPlayer, setBlackPlayer] = useState(BlackPlayer);
  const [isTurn, setIsTurn] = useState(whitePlayer.turnToMove);

  const [combinedArr, setCombinedArr] = useState([
    ...whitePlayer.pieces,
    ...blackPlayer.pieces,
  ]);
  // TODO const [positionArray, setPositionArray]

  const getPosition = (e) => {
    if (e.target.classList.contains("piece-img")) {
      // condition for selecting item
      if (e.target.dataset.pieceColor === "white") {
        if (whitePlayer.turnToMove) {
          whitePlayer.turnToMove = false;
          blackPlayer.turnToMove = true;
        } else {
          alert("blackPlayer Turn");
          return;
        }
      }

      // condition for selecting item
      if (e.target.dataset.pieceColor === "black") {
        if (blackPlayer.turnToMove) {
          blackPlayer.turnToMove = false;
          whitePlayer.turnToMove = true;
        } else {
          alert("whitePlayer Turn");
          return;
        }
      }

      // remade the other items unselected
      combinedArr.map((item) => (item.selected = false));
      // make the clicked item selected
      const obj = combinedArr.find(
        (item) => item.name === e.target.dataset.pieceName
      );
      obj.selected = true;
      console.log(obj);
      // set state for array with new values of player objects
      setCombinedArr([...whitePlayer.pieces, ...blackPlayer.pieces]);
    }
  };

  // useEffect(() => {}, [isTurn, combinedArr]);

  return (
    <div className="chess-board">
      {ROWS.map((row) => (
        <div key={`${row}row`} className={`${row} row`}>
          {COLS.map((col, colIndex) => (
            // render component
            <SingleSquare
              key={getNumericPosition(col, row, COLS, ROWS)}
              namePosition={`${col}${row}`}
              numericPosition={getNumericPosition(col, row, COLS, ROWS)}
              combinedArr={combinedArr}
              condition={getNumericPosition(col, row, COLS, ROWS)}
              color={
                row % 2 === colIndex % 2
                  ? "dark single-square"
                  : "white single-square"
              }
              getPosition={getPosition}
            />
          ))}
        </div>
      ))}
      <BoardDetails array={ROWS} direction="col" />
      <BoardDetails array={COLS} direction="row" />
      <PlayerDetails turn={isTurn} />
    </div>
  );
};

export default ChessBoard;
