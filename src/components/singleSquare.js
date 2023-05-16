import SinglePieceImage from "./singlePieceImage";

const SingleSquare = ({
  color,
  namePosition,
  numericPosition,
  combinedArr,
  condition,
  selectPiece,
  handleMove,
}) => {
  return (
    <div
      className={color}
      data-alphabetical-position={namePosition}
      data-numeric-position={numericPosition}
      onClick={handleMove}
    >
      {combinedArr.map((piece) =>
        piece.numericPosition === condition && piece.alive === true ? (
          <SinglePieceImage
            key={piece.numericPosition}
            piece={piece}
            numericPosition={numericPosition}
            selected={piece.selected}
            selectPiece={selectPiece}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default SingleSquare;
