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

  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPieceHtmlDataset, setSelectedPieceHtmlDataset] =
    useState(null);

  const [combinedArr, setCombinedArr] = useState([
    ...whitePlayer.pieces,
    ...blackPlayer.pieces,
  ]);
  // TODO const [positionArray, setPositionArray]

  const kingsArr = combinedArr.filter(
    (item) => item.name === "White King" || item.name === "Black King"
  );

  const deadKing = kingsArr.find((item) => item.alive === false);

  // piece check moves
  const checkMoveAvailablePawn = (
    piece,
    currRow,
    currCol,
    nextPos,
    setRow,
    setCol
  ) => {
    if (piece.type !== "pawn") {
      return false;
    }
    if (nextPos) {
      if (piece.color === "black") {
        if (
          currRow - setRow === 1 &&
          (currCol - setCol === 1 || setCol - currCol === 1)
        ) {
          console.log("piece taken, move available");
          return true;
        }
        console.log("not an available move for pawn");
        return;
      }

      if (piece.color === "white") {
        if (
          setRow - currRow === 1 &&
          (currCol - setCol === 1 || setCol - currCol === 1)
        ) {
          console.log("piece taken, move available");
          return true;
        }
        console.log("not an available move for pawn");
        return;
      }
    } else if (!nextPos) {
      // check if pawn is at first position, let him move 2
      if (piece.color === "black") {
        if (
          piece.startPosition &&
          (currRow - setRow === 1 || currRow - setRow === 2) &&
          currCol - setCol === 0
        ) {
          console.log("piece in start position, available 1 or 2 square");
          return true;
        } else if (
          !piece.startPosition &&
          currRow - setRow === 1 &&
          currCol - setCol === 0
        ) {
          console.log(
            "piece not in start position, available 1 square forward"
          );
          return true;
        }
      }

      if (piece.color === "white") {
        if (
          piece.startPosition &&
          (setRow - currRow === 1 || setRow - currRow === 2) &&
          currCol - setCol === 0
        ) {
          console.log("piece in start position, available 1 or 2 square");
          return true;
        } else if (
          !piece.startPosition &&
          setRow - currRow === 1 &&
          currCol - setCol === 0
        ) {
          console.log(
            "piece not in start position, available 1 square forward"
          );
          return true;
        }
      }
    }
    console.log("not an available move for pawn");
    return false;
  };
  const checkMoveAvailableBishop = (
    piece,
    currRow,
    currCol,
    setRow,
    setCol
  ) => {
    if (piece.type !== "bishop") {
      return false;
    }
    if (
      currRow - setRow === setCol - currCol ||
      setRow - currRow === currCol - setCol ||
      currRow - setRow === currCol - setCol ||
      setRow - currRow === setCol - currCol
    ) {
      console.log("available - bishop");
      return true;
    } else {
      console.log("not an available move for bishop");
      return false;
    }
  };

  const checkMoveAvailableRook = (piece, currRow, currCol, setRow, setCol) => {
    if (piece.type !== "rook") {
      return false;
    }
    if (currRow === setRow || currCol === setCol) {
      console.log("available - rook");
      return true;
    } else {
      console.log("not an available move for rook");
      return false;
    }
  };

  const selectPiece = (e) => {
    if (deadKing !== undefined || deadKing === null) {
      return;
    }
    // condition for selecting item
    if (
      e.target.dataset.pieceColor === "white" &&
      e.target.classList.contains("piece-img") &&
      selectedPiece === null
    ) {
      if (whitePlayer.turnToMove) {
        whitePlayer.turnToMove = false;
        blackPlayer.turnToMove = true;
        update();
        console.log("da");
      } else {
        alert("blackPlayer Turn");
        return;
      }
    }

    // condition for selecting item
    if (
      e.target.dataset.pieceColor === "black" &&
      e.target.classList.contains("piece-img") &&
      selectedPiece === null
    ) {
      if (blackPlayer.turnToMove) {
        blackPlayer.turnToMove = false;
        whitePlayer.turnToMove = true;
        update();
        console.log("dac");
      } else {
        alert("whitePlayer Turn");
        return;
      }
    }

    // condition after piece is selected, then select same piece
    if (
      e.target.classList.contains("piece-img") &&
      selectedPiece !== null &&
      e.target.dataset.pieceName === selectedPiece.name
    ) {
      console.log("select the same");
      return;
      // condition after piece is selected, then select another piece with same color
    } else if (
      e.target.classList.contains("piece-img") &&
      selectedPiece !== null &&
      e.target.dataset.pieceName !== selectedPiece.name &&
      e.target.dataset.pieceColor === selectedPiece.color
    ) {
      console.log("same color");
      // condition after piece is selected, then select another enemy piece, different color
    } else if (
      e.target.classList.contains("piece-img") &&
      selectedPiece !== null &&
      e.target.dataset.pieceName !== selectedPiece.name &&
      e.target.dataset.pieceColor !== selectedPiece.color
    ) {
      const [currRowNr, currColNr, nextPos, setRowNr, setColNr] = [
        Number(selectedPieceHtmlDataset.row),
        Number(selectedPieceHtmlDataset.col),
        e.target.classList.contains("piece-img"),
        Number(e.target.dataset.row),
        Number(e.target.dataset.col),
      ];
      console.log(selectedPiece);
      const conditionPawn = checkMoveAvailablePawn(
        selectedPiece,
        currRowNr,
        currColNr,
        nextPos,
        setRowNr,
        setColNr
      );
      const conditionBishop = checkMoveAvailableBishop(
        selectedPiece,
        currRowNr,
        currColNr,
        setRowNr,
        setColNr
      );
      const conditionRook = checkMoveAvailableRook(
        selectedPiece,
        currRowNr,
        currColNr,
        setRowNr,
        setColNr
      );

      if (conditionPawn || conditionBishop || conditionRook) {
        console.log("enemy piece selected");
        // condition to delete piece
        if (selectedPiece.color === "white") {
          whitePlayer.turnToMove = false;
          blackPlayer.turnToMove = true;
          const enemyPieceSelected = blackPlayer.pieces.find(
            (item) => e.target.dataset.pieceName === item.name
          );
          enemyPieceSelected.alive = false;
          selectedPiece.numericPosition = enemyPieceSelected.numericPosition;
          // remade the other items unselected
          combinedArr.map((item) => (item.selected = false));
          console.log("blackPlayer");
          setSelectedPiece(null);
          setSelectedPieceHtmlDataset(null);
          // redefine new the array with the updates
          setCombinedArr([...whitePlayer.pieces, ...blackPlayer.pieces]);
        } else if (selectedPiece.color === "black") {
          blackPlayer.turnToMove = false;
          whitePlayer.turnToMove = true;
          const enemyPieceSelected = whitePlayer.pieces.find(
            (item) => e.target.dataset.pieceName === item.name
          );
          console.log(enemyPieceSelected);
          enemyPieceSelected.alive = false;
          selectedPiece.numericPosition = enemyPieceSelected.numericPosition;
          // remade the other items unselected
          combinedArr.map((item) => (item.selected = false));
          console.log("whitePlayer");
          setSelectedPiece(null);
          setSelectedPieceHtmlDataset(null);
          // redefine new the array with the updates
          setCombinedArr([...whitePlayer.pieces, ...blackPlayer.pieces]);
        }
      }
    }

    function update() {
      console.log(selectedPiece);

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
      setSelectedPieceHtmlDataset(e.target.dataset);
    }
  };

  const handleMove = (e) => {
    // check if any king is dead
    if (deadKing !== undefined || deadKing === null) {
      return;
    }

    if (selectedPiece === null) {
      return;
    }

    if (!e.target.classList.contains("piece-img")) {
      // change positon of selected piece if next click is not on other piece
      const positionSelected = combinedArr.find((item) => {
        return item.selected;
      });

      if (positionSelected) {
        // here starts the logic

        const [currRowNr, currColNr, nextPos, setRowNr, setColNr] = [
          Number(selectedPieceHtmlDataset.row),
          Number(selectedPieceHtmlDataset.col),
          e.target.classList.contains("piece-img"),
          Number(e.target.dataset.row),
          Number(e.target.dataset.col),
        ];
        console.log(positionSelected);

        const conditionPawn = checkMoveAvailablePawn(
          positionSelected,
          currRowNr,
          currColNr,
          nextPos,
          setRowNr,
          setColNr
        );
        const conditionBishop = checkMoveAvailableBishop(
          positionSelected,
          currRowNr,
          currColNr,
          setRowNr,
          setColNr
        );

        const conditionRook = checkMoveAvailableRook(
          positionSelected,
          currRowNr,
          currColNr,
          setRowNr,
          setColNr
        );
        if (conditionPawn || conditionBishop || conditionRook) {
          positionSelected.numericPosition = Number(
            e.target.dataset.numericPosition
          );
        } else {
          console.log("invalid");
          return;
        }
      }
      combinedArr.map((item) => (item.selected = false));

      // set turn
      // unselect the piece after move ended
      // redefine new the array with the updates
      setIsTurn(whitePlayer.turnToMove);
      setSelectedPiece(null);
      setSelectedPieceHtmlDataset(null);
      positionSelected.startPosition = false;
      setCombinedArr([...whitePlayer.pieces, ...blackPlayer.pieces]);
    }
  };

  // useEffect(() => {
  //   if (deadKing !== undefined) {
  //     alert(deadKing.color === "white" ? "Black Won" : "White Won");
  //   }
  // }, [combinedArr]);

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
              row={row}
              col={COLS.indexOf(col) + 1}
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
