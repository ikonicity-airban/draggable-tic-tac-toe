import { Navigate, Route, Routes } from "react-router";
import "./App.css";

import Game from "./components/main/Game";
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

const colorWheel = ["#9055f0", "#ff0058", "#008500", "#f0f030", "#00f000", "#f000f0", "#900090, #f090f0"];

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
          <Route index element={<Navigate to='/rooms' replace />} />
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
