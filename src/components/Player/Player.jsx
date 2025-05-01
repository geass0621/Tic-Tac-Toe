import { useState } from "react"

export function Player({ initialName, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName)

  const editHandler = () => {
    setIsEditing(editing => !editing);
  }

  const handleChangeName = (event) => {
    console.log(event);
    setPlayerName(event.target.value)
  }
  return (
    <li>
      <span className="player">
        {isEditing ? <input type="text" required value={playerName} onChange={handleChangeName}></input> :
          <span className="player-name">{playerName}</span>
        }
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}