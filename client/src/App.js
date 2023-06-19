import { useState } from "react";
// components
import ChessBoard from "./components/chessBoard";
// player models
import { BlackPlayer } from "./models/blackPlayer";
import { WhitePlayer } from "./models/whitePlayer";

function App() {
  // assign the models to variable
  // states
  const [isTurn, setIsTurn] = useState(WhitePlayer.turnToMove);
  return (
    <div className="App">
      <ChessBoard
        whitePlayer={WhitePlayer}
        blackPlayer={BlackPlayer}
        isTurn={isTurn}
        setIsTurn={setIsTurn}
      />
    </div>
  );
}

export default App;
