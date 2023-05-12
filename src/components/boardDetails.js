const BoardDetails = ({ array, direction }) => {
  return (
    <div className={`chess-board-details chess-board-details--${direction}`}>
      {array.map((item) => (
        <p key={array.indexOf(item)} className="chess-board-details__item">
          {item}
        </p>
      ))}
    </div>
  );
};

export default BoardDetails;
