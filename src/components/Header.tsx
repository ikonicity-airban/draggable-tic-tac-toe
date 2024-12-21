import useAuth from "../lib/hooks/useAuth";
import "./Header.css";
import UserImage from "./UserImage";

export default function Header() {
  const { login, logout, user } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className="user" onClick={logout}>
        {user ? (
          <UserImage photoURL={user.photoURL ?? "i"} fallback={"i"} />
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
    </header>
  );
}
