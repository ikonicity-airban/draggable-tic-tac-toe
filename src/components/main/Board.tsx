import { useGameState, useGameActions } from "../../lib/context/GameContext";
import "./Board.css";
import Drag from "./Drag";
import Strike from "./Strike";

import Tile from "./Tile";

function Board() {
  const { board, strikeClass, combo, playerOTile, playerXTile } =
    useGameState();

  const { makeMove } = useGameActions();

  return (
    <section className="game-board">
      <Drag type="cross" tiles={playerXTile} />
      <div className="board">
        {board.map((cell, i) => (
          <div key={i} className="drop-box" onClick={() => makeMove(i)}>
            {cell ? (
              <Tile
                className={cell + ` ${combo.includes(i) ? "winner" : ""}`}
              />
            ) : null}
          </div>
        ))}
        <Strike strikeClass={strikeClass ?? ""} />
      </div>
      <Drag type="circle" tiles={playerOTile} />
    </section>
  );
}

export default Board;
