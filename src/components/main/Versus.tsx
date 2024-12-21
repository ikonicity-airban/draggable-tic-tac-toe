import useAuth from "../../lib/hooks/useAuth";
import UserImage from "../UserImage";

function Versus() {
  const { user, opponent } = useAuth();

  return (
    <div className="versus">
      <div className="user">
        <>
          <UserImage
            photoURL={user?.photoURL ?? ""}
            fallback={user?.displayName ?? "O"}
          />
          <p>{user?.displayName}</p>
        </>
      </div>
      <p>vs</p>
      <div className="opponent">
        <UserImage
          photoURL={opponent?.photoURL ?? ""}
          fallback={opponent?.displayName ?? "O"}
        />
        <p>{opponent?.displayName || "Oppponent"}</p>
      </div>
    </div>
  );
}

export default Versus;
