import { GameBoard } from "./components/GameBoard/GameBoard";
import { Log } from "./components/Log/Log";
import { Player } from "./components/Player/Player";
import { useState } from "react";

function derivedActivePlayer(gameTurns) {
  let activePlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    activePlayer = 'O'
  }
  return activePlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns)

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurn) => {
      const turnPlayer = derivedActivePlayer(prevTurn);

      const updatedTurns = [{
        square: {
          row: rowIndex,
          col: colIndex
        },
        player: turnPlayer
      }, ...prevTurn];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === 'X'} initialName="Player 1" symbol="X" />
          <Player isActive={activePlayer === 'O'} initialName="Player 2" symbol="O" />
        </ol>
        <GameBoard activePlayerSymbol={activePlayer} onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns}></Log>
    </main >
  )
}

export default App
