import { GameBoard } from "./components/GameBoard/GameBoard";
import { Log } from "./components/Log/Log";
import { Player } from "./components/Player/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { GameOver } from "./components/GameOver/GameOver";

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}


function derivedActivePlayer(gameTurns) {
  let activePlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    activePlayer = 'O'
  }
  return activePlayer
}

function derivedWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    };
  }
  return winner
}

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS)

  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns)

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prev => {
      return {
        ...prev,
        [symbol]: newName
      }
    })
  }

  const winner = derivedWinner(gameBoard, players);

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
          <Player isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} initialName={PLAYERS.X} symbol="X" />
          <Player isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} initialName={PLAYERS.O} symbol="O" />
        </ol>
        {(winner || hasDraw) && <GameOver onRestart={handleRematch} winner={winner} />}
        <GameBoard board={gameBoard} activePlayerSymbol={activePlayer} onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns}></Log>
    </main >
  )
}


export default App
