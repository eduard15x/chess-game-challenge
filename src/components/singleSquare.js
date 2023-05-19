import SinglePieceImage from "./singlePieceImage";

const SingleSquare = ({
  color,
  namePosition,
  numericPosition,
  combinedArr,
  condition,
  selectPiece,
  handleMove,
  row,
  col,
  showValidMoves,
}) => {
  const checkMoves = showValidMoves.find((item) => item === `${row},${col}`);

  return (
    <div
      className={`${color} ${checkMoves ? "possible" : ""}`}
      data-alphabetical-position={namePosition}
      data-numeric-position={numericPosition}
      onClick={handleMove}
      data-row={row}
      data-col={col}
    >
      {combinedArr.map((piece) =>
        piece.numericPosition === condition && piece.alive === true ? (
          <SinglePieceImage
            key={piece.numericPosition}
            piece={piece}
            numericPosition={numericPosition}
            selected={piece.selected}
            selectPiece={selectPiece}
            row={row}
            col={col}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default SingleSquare;
