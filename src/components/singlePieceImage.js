const SinglePieceImage = ({ piece }) => {
  return (
    <img
      className="chess-board__piece-img"
      alt={piece.name}
      src={piece.imageSrc}
      id={piece.numericPosition}
    />
  );
};

export default SinglePieceImage;
