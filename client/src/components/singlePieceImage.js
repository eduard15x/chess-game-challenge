const SinglePieceImage = ({
  piece,
  numericPosition,
  selected,
  selectPiece,
  row,
  col,
}) => {
  return (
    <img
      className={`chess-board__piece-img piece-img ${
        selected ? "piece-selected" : ""
      }`}
      alt={piece.name}
      src={piece.imageSrc}
      id={piece.numericPosition}
      data-numeric-position={numericPosition}
      data-piece-name={piece.name}
      data-piece-color={piece.color}
      data-piece-type={piece.type}
      data-row={row}
      data-col={col}
      onClick={selectPiece}
    />
  );
};

export default SinglePieceImage;
