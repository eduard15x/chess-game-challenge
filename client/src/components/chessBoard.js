import { useState, useEffect } from "react";
// components
import BoardDetails from "./boardDetails";
import SingleSquare from "./singleSquare";
import PlayerDetails from "./playerDetails";
// utils functions
import { getNumericPosition } from "../utils/getNumericPosition";
import { checkMovesOptions } from "../utils/checkValidMoves";

const ChessBoard = ({ whitePlayer, blackPlayer, isTurn, setIsTurn }) => {
  // variable
  const ROWS = [1, 2, 3, 4, 5, 6, 7, 8];
  const COLS = ["a", "b", "c", "d", "e", "f", "g", "h"];
  // states
  const [showValidMoves, setShowValidMoves] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [combinedArr, setCombinedArr] = useState([
    ...whitePlayer.pieces,
    ...blackPlayer.pieces,
  ]);

  // create array to check if any king is dead
  const deadKing = combinedArr
    .filter((item) => item.name === "White King" || item.name === "Black King")
    .find((item) => item.alive === false);

  // creating matrix of the chess board
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const matrix = [];
  for (let i = 0; i < 8; i++) {
    let rowArr = [];
    matrix.push(rowArr);
    for (let x = 1; x <= 8; x++) {
      rowArr.push(null);
    }
  }

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
        console.log("blackPlayer Turn");
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
        console.log("whitePlayer Turn");
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
      update();
    }

    // condition after piece is selected, then select same piece
    if (
      e.target.classList.contains("piece-img") &&
      selectedPiece !== null &&
      e.target.dataset.pieceName === selectedPiece.name
    ) {
      return;
    } else if (
      // condition after piece is selected, then select another enemy piece, different color
      e.target.classList.contains("piece-img") &&
      selectedPiece !== null &&
      e.target.dataset.pieceName !== selectedPiece.name &&
      e.target.dataset.pieceColor !== selectedPiece.color
    ) {
      // show available moves
      const pieceSelected = combinedArr.find((item) => {
        return item.selected;
      });
      // check valid moves
      checkMovesOptions(
        pieceSelected,
        Number(selectedDataset.row),
        Number(selectedDataset.col),
        setShowValidMoves,
        matrix
      );
      // set valid moves based on the row and column of the piece
      const existValidPosition = showValidMoves.find(
        (item) => item === `${e.target.dataset.row},${e.target.dataset.col}`
      );
      if (existValidPosition === undefined) return;

      // condition to delete piece
      if (selectedPiece.color === "white") {
        whitePlayer.turnToMove = false;
        blackPlayer.turnToMove = true;
        const enemyPieceSelected = blackPlayer.pieces.find(
          (item) => e.target.dataset.pieceName === item.name
        );
        deletePiece(enemyPieceSelected);
      } else if (selectedPiece.color === "black") {
        blackPlayer.turnToMove = false;
        whitePlayer.turnToMove = true;
        const enemyPieceSelected = whitePlayer.pieces.find(
          (item) => e.target.dataset.pieceName === item.name
        );
        deletePiece(enemyPieceSelected);
      }

      function deletePiece(enemyPieceSelected) {
        enemyPieceSelected.alive = false;
        selectedPiece.numericPosition = enemyPieceSelected.numericPosition;
        // remade the other items unselected
        combinedArr.map((item) => (item.selected = false));
        setSelectedPiece(null);
        setSelectedDataset(null);
        // redefine new the array with the updates
        setCombinedArr([...whitePlayer.pieces, ...blackPlayer.pieces]);
        setShowValidMoves([]);
      }
    }

    function update() {
      setShowValidMoves([]);
      // set state for array with new values of player objects
      setCombinedArr([...whitePlayer.pieces, ...blackPlayer.pieces]);
      // remade the other items unselected
      combinedArr.map((item) => (item.selected = false));
      // make the clicked item selected
      const pieceClicked = combinedArr.find(
        (item) => item.name === e.target.dataset.pieceName
      );
      pieceClicked.selected = true;
      setSelectedPiece(pieceClicked);
      setSelectedDataset(e.target.dataset);
      // show available moves
      checkMovesOptions(
        pieceClicked,
        Number(e.target.dataset.row),
        Number(e.target.dataset.col),
        setShowValidMoves,
        matrix
      );
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
        const [setRowNr, setColNr] = [
          Number(e.target.dataset.row),
          Number(e.target.dataset.col),
        ];

        const existValidPosition = showValidMoves.find(
          (item) => item === `${setRowNr},${setColNr}`
        );

        if (existValidPosition !== undefined) {
          positionSelected.numericPosition = Number(
            e.target.dataset.numericPosition
          );
        } else {
          return;
        }
      }
      combinedArr.map((item) => (item.selected = false));

      // set turn - reset valid moves array - deselect current selected piece - for the moved piece, change start position prop
      setIsTurn(whitePlayer.turnToMove);
      setShowValidMoves([]);
      setSelectedPiece(null);
      setSelectedDataset(null);
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
        type: square.dataset.pieceType,
      };
    }
  }, [showValidMoves, deadKing, selectedPiece, matrix]);
  return (
    <div className="chess-board">
      <PlayerDetails
        turn={isTurn}
        whitePlayer={whitePlayer}
        blackPlayer={blackPlayer}
      />
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
    </div>
  );
};

export default ChessBoard;
