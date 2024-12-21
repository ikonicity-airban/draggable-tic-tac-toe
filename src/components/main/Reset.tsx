import { useGameActions } from "../../lib/context/GameContext";

function Reset() {
  const { reset } = useGameActions();
  return (
    <footer className="footer">
      <button onClick={reset}>Reset</button>
    </footer>
  );
}

export default Reset;
