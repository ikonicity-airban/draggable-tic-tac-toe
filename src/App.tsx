import { Route, Routes } from "react-router";
import "./App.css";

import Game from "./pages/game-page";
import Room from "./components/room/Room";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/auth/Login";
import GameLayout from "./layouts/game-layout";

import { Helmet } from "react-helmet";
import { useGameState } from "./lib/context/GameContext";
import { useEffect } from "react";
import { useAppThemeColor } from "./lib/context/AppTheme";
import GameDialog from "./components/GameDialog";
import RoomList from "./components/room/RoomList";
import NewRoom from "./components/room/NewRoom";
import RoomLayout from "./layouts/RoomLayout";
import { colorWheel } from "./lib/constants";
import MainPage from "./pages/main-page";

function App() {
  const { gameState } = useGameState();
  const { themeColor, setThemeColor } = useAppThemeColor();

  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;
    if (gameState === "inProgress") {
      timeOut = setInterval(() => {
        setThemeColor(
          colorWheel[Math.floor(Math.random() * colorWheel.length)]
        );
      }, 30000);
    }
    if (gameState === "playerOWins") {
      setThemeColor(colorWheel[2]);
    }
    return () => {
      clearInterval(timeOut);
    };
  }, [gameState, setThemeColor]);

  return (
    <div className="App">
      <Helmet>
        <meta name="theme-color" content={themeColor} />
      </Helmet>
      <Routes>
        <Route element={<GameLayout />}>
          <Route index element={<MainPage/>} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<GameLayout />}>
          <Route path="game/:gameId" element={<Game />} />
        </Route>
        <Route element={<RoomLayout />}>
          <Route path="rooms/new" element={<NewRoom />} />
          <Route path="rooms" element={<RoomList />} />
          <Route path="rooms/:roomId" element={<Room />} />
        </Route>
      </Routes>
      {/* {<Confetti />} */}
      <GameDialog />
    </div>
  );
}

export default App;
