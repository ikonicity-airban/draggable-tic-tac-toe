import { useGameActions } from "../../lib/context/GameContext";
import { Button } from "../ui/button";

function Reset() {
  const { reset } = useGameActions();
  return (
    <div className="flex items-center justify-center gap-2 p-2 text-sm">
      <Button variant="outline" onClick={reset}>
        Reset
      </Button>
    </div>
  );
}

export default Reset;
