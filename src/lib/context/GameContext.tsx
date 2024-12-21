/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, ReactNode } from "react";
import { checkWinner } from "../utils";

import gameOverSoundAsset from "/game-over.wav";
import clickSoundAsset from "/click.wav";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

// Define the initial game state
const initialState = {
  active: false,
  gameState: "inProgress" as
    | "inProgress"
    | "playerXWins"
    | "playerOWins"
    | "draw",
  index: null as number | null, // Null if no cell is selected
  turn: "cross" as "cross" | "circle", // Alternating turns between 'cross' and 'circle'
  board: Array(9).fill(null) as ("cross" | "circle" | null)[], // 3x3 board initialized as empty
  strikeClass: null as string | null,
  winner: null as "cross" | "circle" | null,
  combo: [] as number[],
  playerXTile: [] as number[],
  playerOTile: [] as number[],
};

type GameState = typeof initialState;

type GameAction =
  | { type: "setActive"; payload: { index: number; type: "cross" | "circle" } }
  | { type: "changeGameState"; payload: GameState["gameState"] }
  | { type: "makeMove"; payload: { index: number } }
  | { type: "reset"; payload: null };

const GameContext = createContext<
  [GameState, React.Dispatch<GameAction>] | undefined
>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
      case "setActive":
        if (
          state.gameState !== "inProgress" ||
          state.turn !== action.payload.type
        ) {
          return state;
        }

        return {
          ...state,
          active:
            state.active && state.index === action.payload.index
              ? !state.active
              : true,
          index: action.payload.index,
        };

      case "changeGameState":
        return {
          ...state,
          gameState: action.payload,
        };
      case "makeMove": {
        const { index } = action.payload;

        if (!state.active) {
          return {
            ...state,
            active: true,
            index:
              state.turn === "cross"
                ? 4 - state.playerXTile.length
                : 4 - state.playerOTile.length,
          };
        }

        // Ensure the move is valid
        if (state.board[index] !== null) {
          return state;
        }
        if (state.gameState !== "inProgress") {
          return state;
        }
        const newBoard = [...state.board];
        newBoard[index] = state.turn;

        const playerXTile: number[] = [...state.playerXTile];
        const playerOTile: number[] = [...state.playerOTile];
        if (state.turn === "cross") {
          playerXTile.push(state.index ?? -1);
        } else {
          playerOTile.push(state.index ?? -1);
        }

        const check = checkWinner(newBoard, state.turn);
        if (check?.draw) {
          gameOverSound.play();
          return {
            ...state,
            board: newBoard,
            gameState: "draw",
            active: false,
            playerXTile,
            playerOTile,
          };
        }
        if (check?.match && check?.strikeClass) {
          gameOverSound.play();
          return {
            ...state,
            active: false,
            board: newBoard,
            gameState: state.turn === "cross" ? "playerOWins" : "playerXWins",
            winner: state.turn,
            combo: check?.combo ?? [],
            strikeClass: check?.strikeClass,
            playerXTile,
            playerOTile,
          };
        }

        clickSound.play();
        return {
          ...state,
          active: false,
          board: newBoard,
          turn: state.turn === "cross" ? "circle" : "cross",
          playerXTile,
          playerOTile,
        };
      }
      case "reset":
        return {
          ...initialState,
        };

      default:
        return state;
    }
  };

  const gameState = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  const [state] = context;

  return state;
};

export const useGameActions = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  const [, dispatch] = context;

  return {
    handleClick: (index: number, type: "cross" | "circle") => {
      dispatch({ type: "setActive", payload: { index, type } });
    },
    makeMove: (index: number) => {
      dispatch({ type: "makeMove", payload: { index } });
    },
    changeGameState: (state: GameState["gameState"]) => {
      dispatch({ type: "changeGameState", payload: state });
    },
    reset: () => {
      dispatch({ type: "reset", payload: null });
    },
  };
};
