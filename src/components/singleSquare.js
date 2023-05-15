import SinglePieceImage from "./singlePieceImage";

const SingleSquare = ({
  color,
  namePosition,
  numericPosition,
  combinedArr,
  condition,
}) => {
  return (
    <div
      className={color}
      data-alphabetical-position={namePosition}
      data-numeric-position={numericPosition}
    >
      {combinedArr.map((piece) =>
        piece.numericPosition === condition ? (
          <SinglePieceImage key={piece.numericPosition} piece={piece} />
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default SingleSquare;
