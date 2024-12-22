/* eslint-disable react-refresh/only-export-components */
import { create } from "zustand";
import clickSoundAsset from "/click.wav";
import gameOverSoundAsset from "/game-over.wav";
import { checkWinner } from "../utils";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

type GameStateType = "inProgress" | "playerXWins" | "playerOWins" | "draw";
type TurnType = "cross" | "circle";

interface GameStoreState {
  active: boolean;
  gameState: GameStateType;
  index: number | null;
  turn: TurnType;
  combo: number[];
  strikeClass: string | null;
  playerXTile: number[];
  playerOTile: number[];
  board: (TurnType | null)[];
  setActive: (index: number, type: TurnType) => void;
  changeGameState: (gameState: GameStateType) => void;
  makeMove: (index: number) => void;
  reset: () => void;
}

const initialState = {
  active: false,
  gameState: "inProgress" as GameStateType,
  index: null as number | null,
  turn: "cross" as TurnType,
  playerXTile: [] as number[],
  playerOTile: [] as number[],
  combo: [] as number[],
  strikeClass: null as string | null,
  board: Array(9).fill(null) as (TurnType | null)[],
};

const useGameStore = create<GameStoreState>((set, get) => ({
  ...initialState,
  setActive: (index, type) => {
    const state = get();
    if (state.gameState !== "inProgress" || state.turn !== type) {
      return;
    }

    set({
      active: state.active && state.index === index ? !state.active : true,
      index,
    });
  },
  changeGameState: (gameState) => set({ gameState }),
  makeMove: (index) => {
    const state = get();

    if (!state.active) {
      set({
        active: true,
        index:
          state.turn === "cross"
            ? 4 - state.playerXTile.length
            : 4 - state.playerOTile.length,
      });
      return;
    }

    if (state.board[index] !== null || state.gameState !== "inProgress") {
      return;
    }

    const newBoard = [...state.board];
    newBoard[index] = state.turn;

    const playerXTile = [...state.playerXTile];
    const playerOTile = [...state.playerOTile];
    if (state.turn === "cross") {
      playerXTile.push(state.index ?? -1);
    } else {
      playerOTile.push(state.index ?? -1);
    }

    const check = checkWinner(newBoard, state.turn);
    if (check?.draw) {
      gameOverSound.play();
      set({
        board: newBoard,
        gameState: "draw",
        active: false,
        playerXTile,
        playerOTile,
      });
      return;
    }
    if (check?.match && check?.strikeClass) {
      gameOverSound.play();
      set({
        active: false,
        strikeClass: check?.strikeClass,
        combo: check?.combo ?? [],
        board: newBoard,
        gameState: state.turn === "cross" ? "playerOWins" : "playerXWins",
        playerXTile,
        playerOTile,
      });
      return;
    }

    clickSound.play();
    set({
      active: false,
      board: newBoard,
      turn: state.turn === "cross" ? "circle" : "cross",
      playerXTile,
      playerOTile,
    });
  },
  reset: () => set({ ...initialState }),
}));

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const useGameState = () => {
  const {
    active,
    gameState,
    index,
    turn,
    playerXTile,
    playerOTile,
    board,
    strikeClass,
    combo,
  } = useGameStore();
  return {
    active,
    gameState,
    index,
    turn,
    playerXTile,
    playerOTile,
    board,
    strikeClass,
    combo,
  };
};

export const useGameActions = () => {
  const { setActive, changeGameState, makeMove, reset } = useGameStore();
  return { setActive, changeGameState, makeMove, reset };
};

// Helper function to check for a winner

/*  */
