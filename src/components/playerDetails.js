const PlayerDetails = ({ turn, whitePlayer, blackPlayer }) => {
  const takenWhitePiecesArr = whitePlayer.pieces.filter(
    (item) => item.alive === false
  );

  const takenBlackPiecesArr = blackPlayer.pieces.filter(
    (item) => item.alive === false
  );

  return (
    <div className="players-details">
      <div>
        <h2 className={turn ? "turn" : ""}>White Player</h2>
        {/* Show taken pieces */}
        {takenBlackPiecesArr.length > 0 ? (
          <div className="players-details__single-player-info">
            {takenBlackPiecesArr.map((item) => (
              <img alt={item.name} src={item.imageSrc} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        <h2 className={!turn ? "turn" : ""}>Black Player</h2>
        {/* Show taken pieces */}
        {takenWhitePiecesArr.length > 0 ? (
          <div className="players-details__single-player-info">
            {takenWhitePiecesArr.map((item) => (
              <img alt={item.name} src={item.imageSrc} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PlayerDetails;
