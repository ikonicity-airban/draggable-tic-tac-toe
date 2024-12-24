import { Player } from "@/lib/types";
import { useGameActions, GameState } from "../../lib/context/GameContext";
import "./Board.css";
import Drag from "./Drag";
import Strike from "./Strike";

import Tile from "./Tile";
import useAuth from "@/lib/hooks/useAuth";
import { useMemo } from "react";
import { cn, getOpponentPlayer, getUserPlayer } from "@/lib/utils";

function Board({
  gameState,
  players,
}: {
  gameState: GameState;
  players: Player[];
}) {
  const { user } = useAuth();
  const { makeMove } = useGameActions();
  const { board, strikeClass, combo, playerOTile, playerXTile, turn } =
    gameState;

  const userPlayer = useMemo(
    () => getUserPlayer(players, user?.uid),
    [players, user]
  );
  const opponentPlayer = useMemo(
    () => getOpponentPlayer(players, user?.uid),
    [players, user]
  );

  const myTurn = useMemo(
    () => turn === userPlayer?.tile,
    [turn, userPlayer?.tile]
  );

  return (
    <article className="game-board relative h-fit flex">
      <Drag
        gameState={gameState}
        userTile={opponentPlayer?.tile ?? "cross"}
        type={opponentPlayer?.tile || "cross"}
        tiles={opponentPlayer?.tile == "circle" ? playerOTile : playerXTile}
      />
      <div className="board">
        {board.map((cell, i) => (
          <div
            key={i}
            className="drop-box"
            onClick={() => (myTurn ? makeMove(i, gameState) : undefined)}
          >
            {cell ? (
              <Tile
                className={cn(cell + ` ${combo.includes(i) ? "winner" : ""}`, {
                  loser: turn !== userPlayer?.tile && combo.includes(i),
                })}
              />
            ) : null}
          </div>
        ))}
        <Strike
          strikeClass={strikeClass + ` ${turn !== userPlayer?.tile ? "loser" : ""}`}
        />
      </div>
      <Drag
        gameState={gameState}
        userTile={opponentPlayer?.tile ?? "cross"}
        type={userPlayer?.tile ?? "circle"}
        tiles={userPlayer?.tile == "cross" ? playerXTile : playerOTile}
      />
    </article>
  );
}

export default Board;
