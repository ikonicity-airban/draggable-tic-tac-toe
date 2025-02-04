import useWindowSize from "react-use/lib/useWindowSize";
import ConfettiComponent from "react-confetti";
import { GameState } from "@/lib/context/GameContext";
import useAuth from "@/lib/hooks/useAuth";
import { useEffect, useMemo } from "react";
import { Player } from "@/lib/types";
import { useScreenActions, useScreenState } from "@/lib/context/ScreenContext";

const winnerSound = new Audio("/win.mp3");
winnerSound.volume = 0.8;
const loserSound = new Audio("/fail.mp3");
loserSound.volume = 0.8;

export default function Confetti({
  game,
  players,
}: {
  game: GameState;
  players: Player[];
}) {
  console.log("🚀 ~ game:", game)
  //   useScreenActions();ver
  const { user } = useAuth();
  const userPlayer = useMemo(
    () => players?.find((player) => player.id == user?.uid),
    [players, user]
  );
  console.log("🚀 ~ userPlayer:", userPlayer)

  const { setModalVisible } = useScreenActions();
  const { modalVisible } = useScreenState();

  useEffect(() => {
    if (game?.winner) {
      if (game?.winner === userPlayer?.id) {
        winnerSound.play();
      } else {
        loserSound.play();
      }
    }
  }, [game?.gameState && game?.winner]);

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
      run={
        (game?.gameState === "playerOWins" ||
          game?.gameState === "playerXWins") &&
        !!(userPlayer?.id === game?.winner)
      }
      onConfettiComplete={() => {
        let shown = false;
        if (!modalVisible) {
          shown = true;
          setModalVisible(shown);
        }
      }}
    />
  );
}
