import SinglePieceImage from "./singlePieceImage";

const SingleSquare = ({
  color,
  namePosition,
  numericPosition,
  combinedArr,
  condition,
  getPosition,
}) => {
  return (
    <div
      className={color}
      data-alphabetical-position={namePosition}
      data-numeric-position={numericPosition}
      onClick={getPosition}
    >
      {combinedArr.map((piece) =>
        piece.numericPosition === condition && piece.alive === true ? (
          <SinglePieceImage
            key={piece.numericPosition}
            piece={piece}
            numericPosition={numericPosition}
            selected={piece.selected}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default SingleSquare;
