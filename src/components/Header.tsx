import "./Header.css";

export default function Header() {
  // const { login, logout, user } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      {/* <div className="user">
        {user ? (
          <UserImage user={user} logout={logout} />
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div> */}
    </header>
  );
}
