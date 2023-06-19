const PiecesTaken = ({ piecesTakenArr }) => {
  if (piecesTakenArr.length > 0) {
    return (
      <div className="players-details__single-player-info">
        {piecesTakenArr.map((item) => (
          <img
            key={item.position}
            id={item.name}
            alt={item.name}
            src={item.imageSrc}
          />
        ))}
      </div>
    );
  }
};

export default PiecesTaken;
