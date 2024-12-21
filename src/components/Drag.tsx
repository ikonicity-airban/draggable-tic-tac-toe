import { useGameState, useGameActions } from "../lib/context/GameContext";

function Drag({ tiles, type }: { tiles: number[]; type: "cross" | "circle" }) {
  //implement drag functionalit
  const {
    state: { active, index, turn },
  } = useGameState();

  const { handleClick } = useGameActions();

  return (
    <div className="drag">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="drag-box"
          style={{
            transform:
              active && index === i && type === turn
                ? "scale(1.2)"
                : "scale(1)",
          }}
        >
          {!tiles.includes(i) && (
            <div
              className={type}
              draggable
              onDragStart={(e) => {
                e.preventDefault();
                //@ts-expect-error (not a complete implementation of the DOM)
                e.dataTransfer.setData("text", e.target.id);
              }}
              id={`${type}-${i}`}
              onClick={() => handleClick(i, type)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Drag;
