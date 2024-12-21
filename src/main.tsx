import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ScreenProvider } from "./lib/context/ScreenContext.tsx";
import { GameProvider } from "./lib/context/GameContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScreenProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </ScreenProvider>
  </StrictMode>
);
