import React from "react";
// Make sure to configure Firebase

import { Link } from "react-router";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/lib/firebase";
import { collection } from "firebase/firestore";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Logo from "../Logo";
import { roomConverter } from "@/lib/utils";


const RoomList: React.FC = () => {
  const [rooms, loading] = useCollection(
    collection(db, "rooms").withConverter(roomConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <section className="p-4">
      <section className="login-page flex flex-col max-h-[100%] max-w-xl justify-center items-center p-4">
        {loading ? (
          <div className="flex items-center justify-center animate-pulse size-20">
            <Logo />
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
              <ScrollArea className="w-full max-h-[40vh] p-2">
                {rooms?.docs.map((room) => (
                  <>
                    <Link
                      key={room.id}
                      to={`/rooms/${room.id}`}
                      className="flex items-center gap-2 p-3 justify-between"
                    >
                      {room.data().name}
                      <ArrowRight />
                    </Link>
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
