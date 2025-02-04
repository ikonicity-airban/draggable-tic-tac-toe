import React, { ChangeEvent, useState } from "react";
// Make sure to configure Firebase

import { Link } from "react-router";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { Pause, Play, Plus, Trash2 } from "lucide-react";
import { irregularLetterSearch, roomConverter } from "@/lib/utils";
import Loading from "../Loading";
import { Input } from "../ui/input";
import Room from "./Room";
import { UI_LINKS } from "@/lib/links";
import useAuth from "@/lib/hooks/useAuth";

const RoomList: React.FC = () => {
  const { user } = useAuth();
  const [rooms, loading] = useCollectionData(
    collection(db, "rooms").withConverter(roomConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Room[] | undefined>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    if (rooms) setSearchResults(irregularLetterSearch(query, rooms));
  };

  if (loading) return <Loading />;

  function handleDeleteRoom(creator: string, roomId: string) {
    if (creator === user?.uid) {
      if (confirm("Are you sure you want to delete this room?")) {
        deleteDoc(doc(db, "rooms", roomId));
      }
    } else {
      alert("You are not the creator of this room");
    }
  }

  return (
    <section className="h-full min-w-fit flex flex-col justify-center items-center p-4">
      <section className="login-page flex flex-col max-h-[100%] max-w-xl justify-center items-center p-4">
        <h2 className="text-2xl font-bold text-outline">Available Rooms</h2>
        <div className="bg-[#fff1] z-10 backdrop-blur-sm min-h-24 flex flex-col gap-2 p-4 rounded-lg w-full">
          <div className="flex items-center justify-between gap-3">
            <Input
              // type="search"
              className="text-sm"
              value={inputValue}
              placeholder="Search rooms"
              onChange={handleInputChange}
            />
            <Link
              className={buttonVariants({ variant: "outline" })}
              to="/rooms/new"
            >
              <Plus />
              Create Room
            </Link>
          </div>
          <ScrollArea className="w-full max-h-[40vh] p-2 text-sm">
            {(searchResults || (!inputValue ? rooms : []))?.map((room) => (
              <div className="" key={room.id}>
                {!room.isActive ? (
                  <div className="flex items-center gap-2 justify-between">
                    <Link
                      key={room.id}
                      to={UI_LINKS.room(room.id)}
                      className="flex items-center gap-2 p-3 flex-1 justify-between"
                    >
                      {room.name}
                      <Play size={16} />
                    </Link>
                    {user?.uid === room.creator && (
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleDeleteRoom(room.creator, room.id)}
                      >
                        <Trash2 size={16} />
                      </div>
                    )}
                  </div>
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
              </div>
            ))}
            <ScrollBar className="w-1" />
          </ScrollArea>
        </div>
      </section>
    </section>
  );
};

export default RoomList;
