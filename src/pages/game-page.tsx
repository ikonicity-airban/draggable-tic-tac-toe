import { useNavigate, useParams } from "react-router";
import Board from "../components/main/Board";
import Versus from "../components/main/Versus";
import {
  useCollectionDataOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "@/lib/firebase";
import { collection, doc, DocumentData } from "firebase/firestore";
import { useEffect } from "react";
import Confetti from "../components/Confetti";
import { useEffectOnce, useLocation } from "react-use";
import Logo from "../components/Logo";
import { GameState, useGameState } from "@/lib/context/GameContext";
import { Player } from "@/lib/types";

function Game() {
  const { gameId: roomId } = useParams() || "";
  const { search } = useLocation();
  const gameId = new URLSearchParams(search).get("gameId");
  const navigate = useNavigate();

  useEffectOnce(() => {
    if (!roomId || !gameId) {
      navigate("/rooms", { replace: true });
    }
  });

  const gameState = useGameState();

  // const { reset } = useGameActions();
  const [game, loadingGame] = useDocumentData<GameState | DocumentData>(
    doc(db, "rooms", roomId ?? "", "games", `${gameId}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [players, loadingPlayers] = useCollectionDataOnce<
    Player | DocumentData
  >(collection(db, "rooms", `${roomId}`, "players"));

  useEffect(() => {
    if (
      !roomId ||
      (!players && !loadingPlayers) ||
      (!game?.index && !loadingGame)
    ) {
      navigate("/rooms");
    }
  }, []);

  /**
   * responsible for saving boardState to the database
   */
  ///////////////


  if (loadingGame || loadingPlayers) {
    return (
      <section className="h-full flex flex-col justify-center items-center p-4">
        <div>
          <Logo />
        </div>
      </section>
    );
  }

  return (
    <>
      <Versus players={players as Player[]} />
      <Board
        gameState={(game as GameState) ?? gameState}
        players={players as Player[]}
      />
      <Confetti game={game as GameState} players={players as Player[]} />
      {/* footer */}
    </>
  );
}

export default Game;
