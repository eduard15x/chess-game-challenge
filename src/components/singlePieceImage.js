const SinglePieceImage = ({ piece, numericPosition, selected }) => {
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
    />
  );
};

export default SinglePieceImage;
