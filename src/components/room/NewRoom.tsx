import { db } from "@/lib/firebase";
import { type Room } from "@/lib/types";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn, getRoomLink } from "@/lib/utils";
import useAuth from "@/lib/hooks/useAuth";
import createPlayerDto from "@/lib/DTOs/player-dto";
import { faker } from "@faker-js/faker";
import { UI_LINKS } from "@/lib/links";
import CopyInput from "../comp-53";
import LinkButton from "../comp-86";
import { ArrowLeft, Play } from "lucide-react";
import { Card } from "../ui/card";
import { useNavigate } from "react-router";

const NewRoom: React.FC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [roomNamePlaceholder] = useState<string>(() => faker.lorem.words(2));

  const navigate = useNavigate();
  //loading state
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  /**]
   * create room
   */
  const createRoom = async () => {
    if (!roomName) setRoomName(() => roomNamePlaceholder);
    if (!user || !roomName) return;
    setLoading(true);
    try {
      const room = await addDoc<Room, Room>(collection(db, "rooms"), {
        name: roomName,
        creator: user.uid,
      });

      setDoc(doc(db, "rooms", room.id, "players", user.uid), {
        ...createPlayerDto(user),
        tile: "cross",
      });

      setRoomId(room.id);
      setRoomName("");
    } catch (error) {
      console.log("error:", error);
      alert("Error creating room");
      setLoading(false);
      return;
    }

    //clear the input
    // navigate(`/room/${roomId}`);
  };

  return (
    <section className="p-4 w-full flex flex-col max-w-xl mx-auto min-h-[70%] items-center gap-4 z-10">
      <h2 className="text-xl md:text-4xl antialiased font-bold pixel">Create New Room</h2>
      <Card className="bg-[#fff1] z-10 backdrop-blur-sm min-h-24 flex flex-col gap-6 p-4 rounded-lg w-full">
        {!roomId ? (
          <div className="grid flex-1 gap-2">
            <Input
              name="roomName"
              autoComplete={faker.lorem.lines(2)}
              defaultValue={roomName}
              className={cn("text-xs uppercase", {
                "border-green-500": roomName,
              })}
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
              placeholder={roomNamePlaceholder}
            />
            <Button
              variant="outline"
              onClick={createRoom}
              className="gap-4"
              disabled={loading}
            >
              Create Room
              {/* spinner */}
              {loading && (
                <div className="border-[2px] border-secondary border-b-transparent rounded-full size-4 animate-spin"></div>
              )}
            </Button>
          </div>
        ) : (
          <>
            <p className="text-center font-medium text-lg hover:underline">
              Share this link with your opponent
            </p>

            <CopyInput
              value={getRoomLink(roomId)}
              readOnly
              className={cn("text-xs text-green-300 cursor-pointer", {
                "border-red-300": roomId,
              })}
            />
            <LinkButton Icon={Play} to={UI_LINKS.room(roomId)} className="py-6">
              Join Room
            </LinkButton>
          </>
        )}
      </Card>
      <Button
        onClick={() => navigate(UI_LINKS.rooms)}
        variant="link"
        className="gap-4 z-10 text-accent group"
      >
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Room
      </Button>
    </section>
  );
};

export default NewRoom;
