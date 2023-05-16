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

  const [selectedPiece, setSelectedPiece] = useState({});

  const [combinedArr, setCombinedArr] = useState([
    ...whitePlayer.pieces,
    ...blackPlayer.pieces,
  ]);
  // TODO const [positionArray, setPositionArray]

  const selectPiece = (e) => {
    // condition for selecting item
    if (
      e.target.dataset.pieceColor === "white" &&
      e.target.classList.contains("piece-img")
    ) {
      if (whitePlayer.turnToMove) {
        whitePlayer.turnToMove = false;
        blackPlayer.turnToMove = true;
      } else {
        alert("blackPlayer Turn");
        return;
      }
    }

    // condition for selecting item
    if (
      e.target.dataset.pieceColor === "black" &&
      e.target.classList.contains("piece-img")
    ) {
      if (blackPlayer.turnToMove) {
        blackPlayer.turnToMove = false;
        whitePlayer.turnToMove = true;
      } else {
        alert("whitePlayer Turn");
        return;
      }
    }

    // set state for array with new values of player objects
    setCombinedArr([...whitePlayer.pieces, ...blackPlayer.pieces]);
    console.log("da");

    // remade the other items unselected
    combinedArr.map((item) => (item.selected = false));
    // make the clicked item selected
    const pieceClicked = combinedArr.find(
      (item) => item.name === e.target.dataset.pieceName
    );
    pieceClicked.selected = true;
    setSelectedPiece(pieceClicked);
  };

  const handleMove = (e) => {
    if (!e.target.classList.contains("piece-img")) {
      const positionSelected = combinedArr.find((item) => {
        return item.selected;
      });

      const transform = Number(e.target.dataset.numericPosition);

      if (positionSelected) {
        positionSelected.numericPosition = transform;
      }
      combinedArr.map((item) => (item.selected = false));

      // set turn
      setIsTurn(whitePlayer.turnToMove);
      // unselect the piece after move ended
      setSelectedPiece({});
      // redefine new the array with the updates
      setCombinedArr([...whitePlayer.pieces, ...blackPlayer.pieces]);
    }
  };

  // useEffect(() => {}, [whitePlayer, blackPlayer]);

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
              selectPiece={selectPiece}
              handleMove={handleMove}
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
