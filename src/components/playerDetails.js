const PlayerDetails = ({ turn }) => {
  return (
    <div className="players-details">
      <div>
        <h2 className={turn ? "turn" : ""}>White Player</h2>
      </div>

      <div>
        <h2 className={!turn ? "turn" : ""}>Black Player</h2>
      </div>
    </div>
  );
};

export default PlayerDetails;
