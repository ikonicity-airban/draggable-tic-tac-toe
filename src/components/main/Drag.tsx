import { cn } from "@/lib/utils";
import { useGameState, useGameActions } from "../../lib/context/GameContext";

function Drag({ tiles, type }: { tiles: number[]; type: "cross" | "circle" }) {
  //implement drag functionality
  const { active, index, turn } = useGameState();

  const { setActive } = useGameActions();

  return (
    <div className="drag ">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={cn("drag-box", {
            "opacity-30": type != turn,
          })}
          style={{
            transform:
              active && index === i && type === turn
                ? "scale(1.2)"
                : "scale(1)",
          }}
        >
          {!tiles.includes(i) && (
            <div
              className={cn(type)}
              draggable
              onDragStart={(e) => {
                e.preventDefault();
                //@ts-expect-error (not a complete implementation of the DOM)
                e.dataTransfer.setData("text", e.target.id);
              }}
              id={`${type}-${i}`}
              onClick={() => (turn == type ? setActive(i, type) : undefined)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Drag;
