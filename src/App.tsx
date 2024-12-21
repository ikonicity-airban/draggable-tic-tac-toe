import "./App.css";
import Login from "./components/auth/Login";
import Header from "./components/Header";

import Game from "./components/main/Game";
import { useScreenState } from "./lib/context/ScreenContext";
import useAuth from "./lib/hooks/useAuth";

function App() {
  const { isLoggedIn } = useAuth();
  const { screen } = useScreenState();

  if (!isLoggedIn) {
    return <Login />;
  }
  return (
    <div className="App">
      <Header />
      {screen === "login" && <Login />}
      {screen === "game" && <Game />}
    </div>
  );
}

export default App;
