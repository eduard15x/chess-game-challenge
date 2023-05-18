// components
import PiecesTaken from "./piecesTaken";

const PlayerDetails = ({ turn, whitePlayer, blackPlayer }) => {
  const takenWhitePiecesArr = whitePlayer.pieces.filter(
    (item) => item.alive === false
  );

  const takenBlackPiecesArr = blackPlayer.pieces.filter(
    (item) => item.alive === false
  );

  if (takenBlackPiecesArr.length > 0) {
    whitePlayer.score = 0; // reinit the score to 0 before adding the value of taken pieces
    for (let pieceValue of takenBlackPiecesArr) {
      whitePlayer.score += pieceValue.value;
    }
  }

  if (takenWhitePiecesArr.length > 0) {
    blackPlayer.score = 0;
    for (let pieceValue of takenWhitePiecesArr) {
      blackPlayer.score += pieceValue.value;
    }
  }

  return (
    <div className="players-details">
      <div>
        <h2 className={turn ? "turn" : ""}>White Player</h2>
        {/* Show score */}
        <p className="total-score">Score {whitePlayer.score}</p>
        {/* Show taken pieces */}
        <PiecesTaken piecesTakenArr={takenBlackPiecesArr} />
      </div>

      <div>
        <h2 className={!turn ? "turn" : ""}>Black Player</h2>
        {/* Show score */}
        <p className="total-score">Score {blackPlayer.score}</p>
        {/* Show taken pieces */}
        <PiecesTaken piecesTakenArr={takenWhitePiecesArr} />
      </div>
    </div>
  );
};

export default PlayerDetails;
