import { cn } from "@/lib/utils";
import { useGameActions, GameState } from "../../lib/context/GameContext";
import { useMemo } from "react";

function Drag({
  tiles,
  type,
  userTile: userTile,
  gameState,
}: {
  tiles: number[];
  type: "cross" | "circle";
  userTile: "cross" | "circle";
  gameState: GameState;
}) {
  //implement drag functionality
  const { active, index, turn } = gameState;

  const myTurn = useMemo(() => turn === type, [turn, type]);
  const myTile = useMemo(() => type == userTile, [type, userTile]);

  const { setActive } = useGameActions();

  return (
    <div className="drag ">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={cn("drag-box", {
            "opacity-30": !myTurn,
          })}
          style={{
            transform:
              active && index === i && myTurn ? "scale(1.2)" : "scale(1)",
          }}
        >
          {!tiles.includes(i) && (
            <div
              className={cn(type)}
              draggable={true}
              onDragStart={(e) => {
                e.preventDefault();
                //@ts-expect-error (not a complete implementation of the DOM)
                e.dataTransfer.setData("text", e.target.id);
              }}
              id={`${type}-${i}`}
              onClick={() =>
                myTurn && !myTile ? setActive(i, type, gameState) : undefined
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Drag;
