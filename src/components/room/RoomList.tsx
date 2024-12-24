import React from "react";
// Make sure to configure Firebase

import { Link } from "react-router";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/lib/firebase";
import { collection } from "firebase/firestore";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { Pause, Play, Plus } from "lucide-react";
import { roomConverter } from "@/lib/utils";
import Logo from "../Logo";

const RoomList: React.FC = () => {
  const [rooms, loading] = useCollectionData(
    collection(db, "rooms").withConverter(roomConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <section className="h-full min-w-fit flex flex-col justify-center items-center p-4">
      <section className="login-page flex flex-col max-h-[100%] max-w-xl justify-center items-center p-4">
        {loading ? (
          <div className="flex items-center min-h-[70vh] justify-center animate-pulse z-10">
            <Logo className="size-40"/>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-outline">Available Rooms</h2>
            <div className="bg-[#fff1] z-10 backdrop-blur-sm min-h-24 flex flex-col gap-2 p-4 rounded-lg w-full">
              <div className={buttonVariants({ variant: "outline" })}>
                <Link to="/rooms/new" className="flex items-center gap-2">
                  <Plus />
                  Create Room
                </Link>
              </div>
              <ScrollArea className="w-full max-h-[40vh] p-2 text-sm">
                {rooms?.map((room) => (
                  <>
                    {!room.isActive ? (
                      <Link
                        key={room.id}
                        to={`/rooms/${room.id}`}
                        className="flex items-center gap-2 p-3 justify-between"
                      >
                        {room.name}
                        <Play size={16} />
                      </Link>
                    ) : (
                      <div
                        key={room.id}
                        className="flex items-center gap-2 p-3 justify-between"
                      >
                        {room.name}
                        <Pause className="animate-pulse" size={16} />
                      </div>
                    )}
                    <Separator className="my-2 opacity-20" />
                  </>
                ))}
                <ScrollBar className="w-1" />
              </ScrollArea>
            </div>
          </>
        )}
      </section>
    </section>
  );
};

export default RoomList;
