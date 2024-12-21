import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";
import Reset from "./components/Reset";
import Versus from "./components/Versus";
import { GameProvider } from "./lib/context/GameContext";
import useAuth from "./lib/hooks/useAuth";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <GameProvider>
      <main>
        {/* header */}
        <Header />
        <Versus />
        {isLoggedIn ? <Board /> : <div />}
        {/* footer */}

        <Reset />
      </main>
    </GameProvider>
  );
}

export default App;
