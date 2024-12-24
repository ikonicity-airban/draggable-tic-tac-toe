import useAuth from "../../lib/hooks/useAuth";
import UserImage from "../UserImage";
import { cn, getOpponentPlayer, getUserPlayer } from "@/lib/utils";
import { Player } from "@/lib/types";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "../ui/skeleton";
import { User } from "firebase/auth";
import { Helmet } from "react-helmet";

function PlayerCard(props: {
  user?: Player | User | null;
  userPlayer: Player | DocumentData | undefined;
  loading: boolean;
}) {
  return (
    <div className="flex items-center justify-center flex-col gap-2 break-words w-[10ch] text-center">
      {props.loading || !props.userPlayer?.isActive ? (
        <UserCardSkeleton />
      ) : (
        <>
          <UserImage
            photoURL={props.user?.photoURL ?? ""}
            fallback={""}
            className={cn("border-2 scale-110 border-green-500")}
          />
          <div className="flex">
            <p>{props.userPlayer?.displayName}</p>
          </div>
        </>
      )}
    </div>
  );
}

function Versus({ players }: { players: Player[] }) {
  const { user } = useAuth();

  const roomId = new URLSearchParams(location.search).get("roomId");

  const [userPlayer, loadingUser] = useDocumentData<Player | DocumentData>(
    doc(
      db,
      "rooms",
      `${roomId}`,
      "players",
      `${getUserPlayer(players, user?.uid)?.id}`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [opponent] = useDocumentData<Player | DocumentData>(
    doc(
      db,

      "players",
      `${getOpponentPlayer(players, user?.uid)?.id}`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [opponentPlayer, loadingOpponent] = useDocumentData<
    Player | DocumentData
  >(
    doc(
      db,
      "rooms",
      `${roomId}`,
      "players",
      `${getOpponentPlayer(players, user?.uid)?.id}`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div className="flex items-center justify-evenly gap-4 w-full mt-4 -mb-20 md:mb-10">
      <Helmet>
        <title>
          {`${userPlayer?.displayName} vs ${opponentPlayer?.displayName}`}
        </title>
      </Helmet>
      <PlayerCard
        user={user}
        userPlayer={userPlayer}
        loading={loadingUser}
      ></PlayerCard>
      <div className="flex  items-center justify-between gap-2 break-words w-[10ch] text-center">
        <p className="text-2xl">{userPlayer?.score}</p>
        <p className="text-xl">vs</p>
        <p className="text-2xl">{opponentPlayer?.score}</p>
      </div>
      <PlayerCard
        user={opponent as Player}
        userPlayer={opponentPlayer}
        loading={loadingOpponent}
      ></PlayerCard>
    </div>
  );
}

function UserCardSkeleton() {
  return (
    <div className="flex items-center flex-col">
      <Skeleton className="rounded-full border-2 border-outline size-10 mb-2" />
      <Skeleton className="rounded-full border-2 border-outline w-24 h-3 mb-2" />
    </div>
  );
}
export default Versus;
