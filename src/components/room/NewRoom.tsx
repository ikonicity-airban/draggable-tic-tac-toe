import { db } from "@/lib/firebase";
import { type Room } from "@/lib/types";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { useCopyToClipboard } from "react-use";
import { Check, Copy } from "lucide-react";
import { Input } from "../ui/input";
import { Link } from "react-router";
import { getRoomLink } from "@/lib/utils";
import useAuth from "@/lib/hooks/useAuth";

const NewRoom: React.FC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [state, copyToClipboard] = useCopyToClipboard();
  //loading state
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const createRoom = async () => {
    if (!roomName) return;
    setLoading(true);

    try {
      const room = await addDoc<Room, Room>(collection(db, "rooms"), {
        name: roomName,
        players: [
          {
            uid: user?.uid,
            name: user?.displayName,
          },
        ],
        creator: user?.uid,
      });
      setRoomId(room.id);
      setRoomName("");
    } catch (error) {
      console.log("🚀 ~ createRoom ~ error:", error);
      alert("Error creating room");
      setLoading(false);
      return;
    }

    //clear the input
    // navigate(`/room/${roomId}`);
  };

  return (
    <section className="p-4">
      <section className="login-page flex flex-col max-h-[100%] max-w-lg justify-center items-center p-4">
        <h2 className="text-2xl font-bold text-outline">Create New Room</h2>
        <div className="bg-[#fff1] z-10 backdrop-blur-sm min-h-24 flex flex-col gap-2 p-4 rounded-lg w-full">
          {!roomId ? (
            <div className="grid flex-1 gap-2">
              <Input
                name="roomName"
                defaultValue={roomName}
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
                placeholder="Room Name"
              />{" "}
              <Button variant="outline" onClick={createRoom} disabled={loading}>
                Create Room
              </Button>
            </div>
          ) : (
            <>
              <p className="text-center font-medium text-sm">
                Share this link with your opponent
              </p>
              <div className="flex items-center gap-2 rounded-lg w-full">
                <div className="grid flex-1 gap-2 text-center">
                  <Input
                    defaultValue={getRoomLink(roomId)}
                    value={getRoomLink(roomId)}
                    readOnly
                    className="text-xs text-green-300 cursor-pointer"
                    onClick={() => copyToClipboard(getRoomLink(roomId))}
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="px-3 focus:bg-transparent"
                  variant="outline"
                  onClick={() => copyToClipboard(getRoomLink(roomId))}
                >
                  <span className="sr-only">Copy</span>
                  {!state.value ? (
                    <Copy />
                  ) : (
                    <Check className="text-green-500 " />
                  )}
                </Button>
              </div>
              <Link
                to={`/rooms/roomId`}
                className={buttonVariants({ variant: "outline" })}
              >
                Join Room
              </Link>
            </>
          )}
        </div>
      </section>
    </section>
  );
};

export default NewRoom;
