/* eslint-disable react-refresh/only-export-components */
//create a context for the screen to be displayed toggling between the game, the menu, score, login, create room, join room, and settings

import { createContext, useContext, useReducer } from "react";
type Screens =
  | "game"
  | "menu"
  | "score"
  | "login"
  | "createRoom"
  | "joinRoom"
  | "settings";

const initialState = {
  screen: "login" as Screens,
  step: 0,
};

type ScreenAction =
  | {
      type: "setScreen";
      payload: Screens;
    }
  | { type: "setStep"; payload: number };

export const ScreenContext = createContext<
  | [state: typeof initialState, dispatch: React.Dispatch<ScreenAction>]
  | undefined
>(undefined);

export const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    (state: typeof initialState, action: ScreenAction) => {
      switch (action.type) {
        case "setScreen":
          return {
            ...state,
            screen: action.payload,
          };
        case "setStep":
          return {
            ...state,
            step: action.payload,
          };
        default:
          return state;
      }
    },
    initialState
  );

  return (
    <ScreenContext.Provider value={[state, dispatch]}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreenState = () => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error("useScreenContext must be used within a ScreenProvider");
  }

  const [state] = context;

  return state;
};

export const useScreenActions = () => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error("useScreen must be used within a ScreenProvider");
  }

  const [, dispatch] = context;

  return {
    setScreen: (screen: Screens) => {
      dispatch({ type: "setScreen", payload: screen });
    },
    setStep: (step: number) => {
      dispatch({ type: "setStep", payload: step });
    },
  };
};
