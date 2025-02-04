import { db } from "@/lib/firebase";
import { Player, type Room } from "@/lib/types";
import { cn, playerConverter, roomConverter } from "@/lib/utils";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router";
import { Button, buttonVariants } from "../ui/button";
import { useEffect, useState } from "react";
import useAuth from "@/lib/hooks/useAuth";
import { Play } from "lucide-react";
import createPlayerDto from "@/lib/DTOs/player-dto";
import { initialGameState } from "@/lib/context/GameContext";
import Logo from "../Logo";
import { Skeleton } from "../ui/skeleton";

function Room() {
  const { roomId } = useParams() || "";
  const { user } = useAuth();
  const navigate = useNavigate();
  // const { reset } = useGameActions();

  const [waiting, setWaiting] = useState(false);

  // useEffectOnce(() => {
  //   if (!roomId) {
  //     navigate("/games", { replace: true });
  //   }
  // });

  const [room, loading] = useDocumentData(
    doc(db, "rooms", roomId ?? "").withConverter(roomConverter),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  console.log("🚀 ~ Room ~ room:", room);

  const [players, loadingPlayers] = useCollectionData(
    collection(db, "rooms", `${roomId}`, "players").withConverter(
      playerConverter
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [player, loadingPlayer] = useDocumentData<Player>(
    doc(db, "players", `${user?.uid}`).withConverter(playerConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (room?.isActive) {
      updateDoc(doc(db, "rooms", room?.id), {
        isActive: false,
      });
    }
  }, [room?.id]);

  useEffect(() => {
    setWaiting(true);
    if (user && players && room?.creator !== user.uid && players?.length < 2) {
      try {
        setDoc(doc(db, "rooms", room?.id, "players", user?.uid), {
          ...createPlayerDto(user),
          tile: "circle",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setWaiting(false);
      }
    } else {
      setWaiting(false);
    }
  }, [room, roomId, user]);

  const handleGameCreation = async (room: Room) => {
    const roomDocRef = doc(db, "rooms", room.id);
    const gamesCollectionRef = collection(roomDocRef, "games");
    const gameId = room.creator;
    const game = await getDoc(doc(gamesCollectionRef, gameId));
    const playerO: string =
      room.creator == user?.uid ? room.creator : user?.uid;

    try {
      if (!game.exists()) {
        await setDoc(doc(gamesCollectionRef, gameId), {
          ...(game.exists() ? game.data() : initialGameState),
          id: gameId,
          playerX: gameId,
          playerO,
          isActive: true,
        });

        const activePlayerId =
          room.creator == user?.uid ? room.creator : playerO;
        const playerDocRef = doc(
          db,
          "rooms",
          room.id,
          "players",
          activePlayerId
        );

        await updateDoc(playerDocRef, {
          isActive: true,
        });
        // await updateDoc(doc(db, "rooms", room.id), {
        //   isActive: true,
        // });
      }
    } catch (error) {
      console.log("🚀 ~ handleGameCreation ~ error:", error);
      alert("Error creating game, please try again");
    }
    navigate(`/game/${room.id}?gameId=${gameId}&roomId=${room.id}`);
  };

  const handleClick = () => {
    // if (room && room.players.length >= 2)
    //   navigate(`/game/${room.id}?gameId=${gameId}&roomId=${room.id}`);
    if (room) {
      handleGameCreation(room);
    }
  };

  if (!room && !loading)
    return (
      <section className="p-4 min-w-fit flex flex-col justify-center items-center">
        <section className="login-page flex flex-col h-full max-w-lg justify-center items-center p-4">
          no room found
        </section>
      </section>
    );

  return (
    <section className="p-4 min-w-fit flex flex-col justify-center items-center">
      <section className="login-page flex flex-col h-full max-w-lg justify-center items-center p-4 gap-4">
        {loading || loadingPlayers ? (
          <div className="flex items-center min-h-[70vh] justify-center animate-pulse z-10">
            <Logo className="size-40" />
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-center text-outline">
              Welcome to {room?.name} room
            </h2>
            <div className="bg-[#fff1] z-10 backdrop-blur-sm min-h-24 flex flex-col gap-2 p-4 rounded-lg w-full">
              <div className="w-full max-h-[40vh] p-2">
                <div className="flex flex-col gap-2">
                  {(players as Player[])?.map((player: Player) => (
                    <div className="flex items-center gap-2" key={player.id}>
                      <div className="size-5 rounded-full border-2 flex items-center justify-center border-secondary">
                        <div
                          className={cn("bg-green-500 p-1 rounded-full", {
                            "animate-pulse": waiting,
                          })}
                        ></div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-xl font-bold">
                          {player.displayName}
                        </div>
                        <div className="text-sm">Score: {player.score}</div>
                      </div>
                    </div>
                  ))}
                  {waiting && (players ?? [])?.length < 2 && (
                    <div className="flex items-center gap-2">
                      <div className="size-5 rounded-full border-2 flex items-center justify-center border-secondary">
                        <Skeleton
                          className={cn("p-1 rounded-full", {
                            "animate-pulse": waiting,
                          })}
                        ></Skeleton>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Skeleton className="text-xl w-40 h-3 font-bold"></Skeleton>
                        <Skeleton className="text-sm w-20 h-2"></Skeleton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Button
                className={buttonVariants({ variant: "outline" })}
                disabled={(players as Player[])?.length !== 2}
                onClick={handleClick}
              >
                <div className="flex w-full justify-center items-center gap-2">
                  <Play />
                </div>
              </Button>
            </div>
          </>
        )}
      </section>
    </section>
  );
}

export default Room;
