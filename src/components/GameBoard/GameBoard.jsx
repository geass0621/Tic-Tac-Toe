
const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

export function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // const [gameBoard, setGameBoard] = useState(initialBoard);

  // const handleSelectSquare = (rowIndex, colIndex, symbol) => {
  //   setGameBoard((prevGameBoard) => {
  //     const newGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
  //     newGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return newGameBoard;
  //   });
  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => {
              return <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
              </li>
            })}
          </ol>
        </li>
      })}
    </ol>
  )
}