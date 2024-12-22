import { db } from "@/lib/firebase";
import { type Room } from "@/lib/types";
import { roomConverter } from "@/lib/utils";
import { doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Link, useParams } from "react-router";
import { Button, buttonVariants } from "../ui/button";
import { useEffect } from "react";
import useAuth from "@/lib/hooks/useAuth";
import { Play } from "lucide-react";
import createPlayerDto from "@/lib/DTOs/player-dto";

function Room() {
  const { roomId } = useParams();
  const { user } = useAuth();

  const [room, loading] = useDocumentData(
    doc(db, "rooms", roomId ?? "").withConverter(roomConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  console.log("🚀 ~ Room ~ room:", room?.players.length);

  useEffect(() => {
    if (user && room?.creator !== user?.uid && room?.players.length != 2) {
      updateDoc(doc(db, "rooms", roomId ?? ""), {
        isActive: true,
        players: [
          {
            ...room?.players[0],
          },
          { ...createPlayerDto(user) },
        ],
      });
    }
  }, [room, roomId, user]);

  if (loading) {
    return <div>loading</div>;
  }

  if (!room) {
    return null;
  }
  return (
    <section className="p-4">
      <section className="login-page flex flex-col h-full  max-w-lg justify-center items-center p-4">
        <h2 className="text-xl font-bold text-center text-outline">
          Welcome to {room?.name} room
        </h2>
        <div className="bg-[#fff1] z-10 backdrop-blur-sm min-h-24 flex flex-col gap-2 p-4 rounded-lg w-full">
          <div className="w-full max-h-[40vh] p-2">
            <div className="flex flex-col gap-2">
              {room?.players?.map(() => {
                return (
                  <div className="flex items-center gap-2" key={1}>
                    <div className="size-5 rounded-full border-2 border-secondary"></div>
                    <div className="flex flex-col gap-1">
                      <div className="text-xl font-bold">Player 1</div>
                      <div className="text-sm">Score: 0</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            className={buttonVariants({ variant: "outline" })}
            disabled={room?.players?.length != 2}
          >
            <Link to="/rooms/new" className="flex items-center gap-2">
              <Play />
            </Link>
          </Button>
        </div>
      </section>
    </section>
  );
}
export default Room;
