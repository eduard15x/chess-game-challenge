// components
import { useState, useEffect } from "react";
import BoardDetails from "./boardDetails";
import { BlackPlayer } from "../models/blackPlayer";
import { WhitePlayer } from "../models/whitePlayer";

// utils
import { getNumericPosition } from "../utils/getNumericPosition";
import SingleSquare from "./singleSquare";
import PlayerDetails from "./playerDetails";
import {
  checkMovesOptionsPawn,
  checkMovesOptionsBishop,
  checkMovesOptionsKnight,
  checkMovesOptionsRook,
  checkMovesOptionsQueen,
  checkMovesOptionsKing,
} from "../utils/getSelectedPieceOptions";
import {
  checkMoveAvailablePawn,
  checkMoveAvailableBishop,
  checkMoveAvailableKnight,
  checkMoveAvailableRook,
  checkMoveAvailableQueen,
  checkMoveAvailableKing,
} from "../utils/checkPieceMoves";

const ChessBoard = () => {
  // variable
  const ROWS = [1, 2, 3, 4, 5, 6, 7, 8];
  const COLS = ["a", "b", "c", "d", "e", "f", "g", "h"];

  // states
  const [whitePlayer, setWhitePlayer] = useState(WhitePlayer);
  const [blackPlayer, setBlackPlayer] = useState(BlackPlayer);
  const [isTurn, setIsTurn] = useState(whitePlayer.turnToMove);
  const [showValidMoves, setShowValidMoves] = useState([]);

  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPieceHtmlDataset, setSelectedPieceHtmlDataset] =
    useState(null);

  const [combinedArr, setCombinedArr] = useState([
    ...whitePlayer.pieces,
    ...blackPlayer.pieces,
  ]);
  // TODO const [positionArray, setPositionArray]

  // TODO -----------------------------------------------------------
  let matrix = [];

  for (let i = 0; i < 8; i++) {
    let rowArr = [];
    matrix.push(rowArr);
    for (let x = 1; x <= 8; x++) {
      rowArr.push(null);
    }
  }

  const kingsArr = combinedArr.filter(
    (item) => item.name === "White King" || item.name === "Black King"
  );

  const deadKing = kingsArr.find((item) => item.alive === false);

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
      } else {
        alert("blackPlayer Turn");
        return;
      }
      update();
    } else if (
      // condition after piece is selected, then select another piece with same color
      e.target.classList.contains("piece-img") &&
      selectedPiece !== null &&
      e.target.dataset.pieceName !== selectedPiece.name &&
      e.target.dataset.pieceColor === selectedPiece.color
    ) {
      console.log("another piece with same color selected");
      update();
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
      } else {
        alert("whitePlayer Turn");
        return;
      }
      update();
    } else if (
      // condition after piece is selected, then select another piece with same color
      e.target.classList.contains("piece-img") &&
      selectedPiece !== null &&
      e.target.dataset.pieceName !== selectedPiece.name &&
      e.target.dataset.pieceColor === selectedPiece.color
    ) {
      console.log("another piece with same color selected");
      update();
    }

    // condition after piece is selected, then select same piece
    if (
      e.target.classList.contains("piece-img") &&
      selectedPiece !== null &&
      e.target.dataset.pieceName === selectedPiece.name
    ) {
      console.log("select the same");
      return;
    } else if (
      // condition after piece is selected, then select another enemy piece, different color
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
      const conditionKnight = checkMoveAvailableKnight(
        selectedPiece,
        currRowNr,
        currColNr,
        setRowNr,
        setColNr
      );
      const conditionQueen = checkMoveAvailableQueen(
        selectedPiece,
        currRowNr,
        currColNr,
        setRowNr,
        setColNr
      );
      const conditionKing = checkMoveAvailableKing(
        selectedPiece,
        currRowNr,
        currColNr,
        setRowNr,
        setColNr
      );

      // TODO I think this is unnecessary for
      if (
        conditionPawn ||
        conditionBishop ||
        conditionRook ||
        conditionKnight ||
        conditionQueen ||
        conditionKing
      ) {
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
      setShowValidMoves([]);
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

      checkMovesOptionsPawn(
        pieceClicked,
        Number(e.target.dataset.row),
        Number(e.target.dataset.col),
        setShowValidMoves,
        matrix
      );
      checkMovesOptionsBishop(
        pieceClicked,
        Number(e.target.dataset.row),
        Number(e.target.dataset.col),
        setShowValidMoves,
        matrix
      );
      checkMovesOptionsKnight(
        pieceClicked,
        Number(e.target.dataset.row),
        Number(e.target.dataset.col),
        setShowValidMoves,
        matrix
      );
      checkMovesOptionsRook(
        pieceClicked,
        Number(e.target.dataset.row),
        Number(e.target.dataset.col),
        setShowValidMoves,
        matrix
      );
      checkMovesOptionsQueen(
        pieceClicked,
        Number(e.target.dataset.row),
        Number(e.target.dataset.col),
        setShowValidMoves,
        matrix
      );
      checkMovesOptionsKing(
        pieceClicked,
        Number(e.target.dataset.row),
        Number(e.target.dataset.col),
        setShowValidMoves,
        matrix
      );
      console.log(pieceClicked);
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
        const conditionKnight = checkMoveAvailableKnight(
          selectedPiece,
          currRowNr,
          currColNr,
          setRowNr,
          setColNr
        );
        const conditionQueen = checkMoveAvailableQueen(
          selectedPiece,
          currRowNr,
          currColNr,
          setRowNr,
          setColNr
        );
        const conditionKing = checkMoveAvailableKing(
          selectedPiece,
          currRowNr,
          currColNr,
          setRowNr,
          setColNr
        );

        if (
          conditionPawn ||
          conditionBishop ||
          conditionRook ||
          conditionKnight ||
          conditionQueen ||
          conditionKing
        ) {
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
      setShowValidMoves([]);
      setSelectedPiece(null);
      setSelectedPieceHtmlDataset(null);
      positionSelected.startPosition = false;
      setCombinedArr([...whitePlayer.pieces, ...blackPlayer.pieces]);
    }
  };

  useEffect(() => {
    if (deadKing !== undefined) {
      alert(deadKing.color === "white" ? "Black Won" : "White Won");
    }

    const piecesCheck = document.querySelectorAll(
      ".chess-board__piece-img.piece-img"
    );
    for (let square of piecesCheck) {
      let rowMatrix = Number(square.dataset.row);
      let colMatrix = Number(square.dataset.col);
      matrix[rowMatrix - 1][colMatrix - 1] = {
        row: square.dataset.row,
        col: square.dataset.col,
        color: square.dataset.pieceColor,
      };
    }
  }, [showValidMoves, deadKing, selectedPiece, matrix]);
  console.log(matrix);
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
              showValidMoves={showValidMoves}
            />
          ))}
        </div>
      ))}
      <BoardDetails array={ROWS} direction="col" />
      <BoardDetails array={COLS} direction="row" />
      <PlayerDetails
        turn={isTurn}
        whitePlayer={whitePlayer}
        blackPlayer={blackPlayer}
      />
    </div>
  );
};

export default ChessBoard;
