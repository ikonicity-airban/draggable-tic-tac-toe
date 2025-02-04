/* eslint-disable react-refresh/only-export-components */
import { create } from "zustand";
import clickSoundAsset from "/click.wav";
import gameOverSoundAsset from "/game-over.wav";
import { checkWinner } from "../utils";
import { User } from "firebase/auth";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

type GameStateType = "inProgress" | "playerXWins" | "playerOWins" | "draw";
type TurnType = "cross" | "circle";

interface GameStoreState {
  id: string;
  active: boolean;
  gameState: GameStateType;
  index: number | null;
  turn: TurnType;
  combo: number[];
  strikeClass: string | null;
  playerXTile: number[];
  playerOTile: number[];
  board: (TurnType | null)[];
  winner?: string | null;
  setActive: (index: number, type: TurnType, gameState: GameState) => void;
  changeGameState: (gameState: GameStateType, game: GameState) => void;
  makeMove: (index: number, gameState: GameState) => void;
  reset: () => void;
  updateGame: (data: Partial<GameState>) => void;
}

export const initialGameState = {
  id: "1",
  active: false,
  gameState: "inProgress" as GameStateType,
  index: null as number | null,
  turn: "cross" as TurnType,
  playerXTile: [] as number[],
  playerOTile: [] as number[],
  combo: [] as number[],
  strikeClass: null as string | null,
  board: Array(9).fill(null) as (TurnType | null)[],
  winner: null as string | null,
};

const getGameId = () => new URLSearchParams(location.search).get("gameId");

const getRoomId = () => new URLSearchParams(location.search).get("roomId");
const updateGameState = async (
  game: GameState,
  update: Partial<GameState>,
  roomId: string | null = getRoomId(),
  gameId: string | null = getGameId()
) => {
  return updateDoc(doc(db, "rooms", `${roomId}`, "games", gameId ?? "ai"), {
    ...game,
    ...update,
  });
};

const useGameStore = create<GameStoreState>((set) => ({
  ...initialGameState,
  setActive: (index, type, gameState) => {

    const state = gameState;
    if (state.gameState !== "inProgress" || state.turn !== type) return;

    const active = state.active && state.index === index ? !state.active : true;
    set({ active, index });
    updateGameState(state, { active, index });
  },
  changeGameState: (gameState, game) => {

    set({ gameState });
    updateGameState(game, { gameState });
  },
  makeMove: (index, gameState) => {

    const state = gameState;
    if (!state.active) {
      const newIndex =
        state.turn === "cross"
          ? 4 - state.playerXTile.length
          : 4 - state.playerOTile.length;
      set({ active: true, index: newIndex });
      updateGameState(state, { active: true, index: newIndex });
      return;
    }

    if (state.board[index] !== null || state.gameState !== "inProgress") return;

    const newBoard = [...state.board];
    newBoard[index] = state.turn;
    const playerXTile = [...state.playerXTile];
    const playerOTile = [...state.playerOTile];
    if (state.turn === "cross") playerXTile.push(state.index ?? -1);
    else playerOTile.push(state.index ?? -1);

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
      updateGameState(
        state,
        {
          board: newBoard,
          gameState: "draw",
          active: false,
          playerXTile,
          playerOTile,
        }
      );
      return;
    }
    if (check?.match && check?.strikeClass) {
      gameOverSound.play();
      const winner = state.turn === "cross" ? state.playerX : state.playerO;
      const gameStateUpdate = {
        active: false,
        strikeClass: check.strikeClass,
        combo: check.combo ?? [],
        board: newBoard,
        winner,
        gameState: state.turn === "cross" ? "playerXWins" : "playerOWins",
        playerXTile,
        playerOTile,
      } satisfies Partial<GameState>;

      set(gameStateUpdate);
      updateGameState(state, gameStateUpdate);
      updateDoc(doc(db, "rooms", `${getRoomId()}`, "players", `${winner}`), {
        score: increment(1),
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
    updateGameState(
      state,
      {
        active: false,
        board: newBoard,
        turn: state.turn === "cross" ? "circle" : "cross",
        playerXTile,
        playerOTile,
      }
    );
  },
  reset: () => {
    set({ ...initialGameState });

    // console.log("🚀 ~ gameId:", gameId);
    updateDoc(doc(db, "rooms", `${getRoomId()}`, "games", `${getGameId()}`), {
      ...initialGameState,
    });
  },
  updateGame: (data: Partial<GameState>) => {
    console.log("🚀 ~ useGameStore ~ data:", data);
  },
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
  const { setActive, changeGameState, makeMove, reset, updateGame } =
    useGameStore();
  return { setActive, changeGameState, makeMove, reset, updateGame };
};

export type GameState = {
  active: boolean;
  gameState: GameStateType;
  index: number | null;
  turn: TurnType;
  combo: number[];
  strikeClass: string | null;
  playerXTile: number[];
  playerOTile: number[];
  winner?: string | null;
  board: (TurnType | null)[];
  playerX: User["uid"] | null;
  playerO: User["uid"] | null;
};
