import { useGameActions } from "../lib/context/GameContext";

const Modal = () => {
  const { reset } = useGameActions();
  return (
    <dialog className="dialog">
      <div className="dialog-overlay"></div>
      <div className="dialog-box">
        <h2>Game Over</h2>
        <button className="dialog-button" onClick={reset}>
          Play Again
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
