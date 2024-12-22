import useWindowSize from "react-use/lib/useWindowSize";
import ConfettiComponent from "react-confetti";
import { useGameState } from "@/lib/context/GameContext";

export default function Confetti() {
  const { gameState } = useGameState();
//   useScreenActions();
  const { width, height } = useWindowSize();
  return (
    <ConfettiComponent
      width={width}
      height={height}
      gravity={0.05}
      numberOfPieces={1000}
      wind={0.001}
      friction={0.99}
      recycle={false}
      run={gameState === "playerOWins" || gameState === "playerXWins"}
    //   onConfettiComplete={() => {
    //     setModalTitle("Game Over");
    //     setModalContent("score");
    //     setModalVisible(true);
    //   }}
    />
  );
}
