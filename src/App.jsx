import { GameBoard } from "./components/GameBoard/GameBoard";
import { Log } from "./components/Log/Log";
import { Player } from "./components/Player/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { GameOver } from "./components/GameOver/GameOver";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function derivedActivePlayer(gameTurns) {
  let activePlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    activePlayer = 'O'
  }
  return activePlayer
}



function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);

  let gameBoard = [...initialBoard.map(array => [...array])];

  function handleRematch() {
    setGameTurns([]);
  }

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol
    }
  };

  const hasDraw = gameTurns.length === 9 && !winner;

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
        {(winner || hasDraw) && <GameOver onRestart={handleRematch} winner={winner} />}
        <GameBoard board={gameBoard} activePlayerSymbol={activePlayer} onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns}></Log>
    </main >
  )
}

export default App
