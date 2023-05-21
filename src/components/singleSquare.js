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
      className={color}
      data-alphabetical-position={namePosition}
      data-numeric-position={numericPosition}
      onClick={handleMove}
      data-row={row}
      data-col={col}
    >
      {checkMoves ? <div className="valid-moves v1"></div> : ""}
      {checkMoves ? <div className="valid-moves v2"></div> : ""}
      {checkMoves ? <div className="valid-moves v3"></div> : ""}
      {checkMoves ? <div className="valid-moves v4"></div> : ""}
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
