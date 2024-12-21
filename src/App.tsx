import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";
import Login from "./components/Login";
import Reset from "./components/Reset";
import Versus from "./components/Versus";
import { GameProvider } from "./lib/context/GameContext";
import useAuth from "./lib/hooks/useAuth";

function App() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Login />;
  return (
    <GameProvider>
      <main>
        {/* header */}
        <Header />
        <Versus />
        <Board />
        {/* footer */}

        <Reset />
      </main>
    </GameProvider>
  );
}

export default App;
