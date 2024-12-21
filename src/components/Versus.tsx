import useAuth from "../lib/hooks/useAuth";
import UserImage from "./UserImage";

function Versus() {
  const { user, opponent, isLoggedIn, login } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="not-logged-in">
        <p>You are not logged in</p>
        <button onClick={login} className="">
          Login
        </button>
      </div>
    );
  }

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
