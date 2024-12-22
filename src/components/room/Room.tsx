import { db } from "@/lib/firebase";
import useAuth from "@/lib/hooks/useAuth";
import { type Room } from "@/lib/types";
import { roomConverter } from "@/lib/utils";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router";

function Room() {
  const { roomId } = useParams();
  const { user } = useAuth();

  const [value, loading, error] = useDocumentData(
    doc(db, "rooms", roomId ?? "").withConverter(roomConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div>
      <p>{JSON.stringify(error, null, 2)}</p>
      {JSON.stringify(value, null, 2)} : {user?.displayName}
      waiting for you to join
    </div>
  );
}
export default Room;
