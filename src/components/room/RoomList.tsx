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
import { cn, irregularLetterSearch, roomConverter } from "@/lib/utils";
import Loading from "../Loading";
import Room from "./Room";
import { UI_LINKS } from "@/lib/links";
import useAuth from "@/lib/hooks/useAuth";
import SearchBar from "../comp-26";
import { Card } from "../ui/card";
import LinkButton from "../comp-86";

const RoomList: React.FC = () => {
  const { user } = useAuth();
  console.log("🚀 ~ user:", user);
  const [rooms, loading] = useCollectionData(
    collection(db, "rooms").withConverter(roomConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  console.log("🚀 ~ rooms:", rooms);
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
    <section className="min-w-fit min-h-full max-w-xl mx-auto flex flex-col items-center p-4 z-10">
      {/* <section className="login-page flex flex-col max-h-[100%] max-w-xl justify-center items-center p-4"></section> */}

      <h2 className="text-2xl font-bold pixel mb-3 mt-10 z-10">
        Available Rooms
      </h2>
      <Card className="bg-[#fff1] backdrop-blur-lg min-h-24 flex flex-col gap-2 p-4 rounded-lg w-full">
        <div className="flex items-center justify-between gap-3">
          {!loading && rooms?.length ? (
            <SearchBar
              placeholder="Search rooms"
              onChange={handleInputChange}
            />
          ) : null}
          <Link
            className={buttonVariants({
              variant: "outline",
              className: cn(
                "group max-sm:px-1 p-6 gap-2  hover:bg-accent/10 hover:text-accent/80",
                { "w-full": !rooms?.length }
              ),
            })}
            to="/rooms/new"
          >
            <Plus
              color="lightgreen"
              className="group-hover:translate-x-0.5 transition-transform"
            />
            <div
              className={cn("max-sm:hidden", {
                "max-sm:block": !rooms?.length,
              })}
            >
              Create Room
            </div>
          </Link>
        </div>
        <ScrollArea className="w-full max-h-[40vh] p-2 text-sm">
          {(inputValue ? searchResults : rooms)?.map((room) => (
            <div className="" key={room.id}>
              <div className="flex items-center gap-2 justify-between group">
                <LinkButton
                  key={room.id}
                  to={room.isActive ? UI_LINKS.room(room.id) : UI_LINKS.game(room.id)}
                  Icon={!room.isActive ? Play : Pause}
                  className="flex items-center border-none gap-2 py-6 flex-1 transition-all justify-between"
                >
                  {room.name}
                </LinkButton>
                {user?.uid === room.creator && (
                  <div
                    className="group-hover:flex items-center gap-2 hidden cursor-pointer "
                    onClick={() => handleDeleteRoom(room.creator, room.id)}
                  >
                    <Trash2 size={16} />
                  </div>
                )}
              </div>

              <Separator className="my-2 opacity-20" />
            </div>
          ))}
          <ScrollBar className="w-1" />
        </ScrollArea>
        {rooms ? <Card className=""></Card> : null}
      </Card>
    </section>
  );
};

export default RoomList;
