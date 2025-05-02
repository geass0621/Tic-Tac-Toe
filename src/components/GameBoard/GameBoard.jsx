


export function GameBoard({ onSelectSquare, board }) {


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
      {board.map((row, rowIndex) => {
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