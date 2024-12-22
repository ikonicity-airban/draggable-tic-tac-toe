/* eslint-disable react-refresh/only-export-components */
//create a context for the screen to be displayed toggling between the game, the menu, score, login, create room, join room, and settings

import { create } from "zustand";

type ModalContent = "game" | "menu" | "score" | "login" | "createRoom" | "joinRoom" | "settings";
type BottomSheetContent = "info" | "settings" | "notifications";

interface ScreenState {
  modalVisible: boolean;
  modalContent: ModalContent;
  modalTitle: string;
  bottomSheetVisible: boolean;
  bottomSheetContent: BottomSheetContent;
  bottomSheetTitle: string;
  setModalVisible: (visible: boolean) => void;
  setModalContent: (content: ModalContent) => void;
  setModalTitle: (title: string) => void;
  setBottomSheetVisible: (visible: boolean) => void;
  setBottomSheetContent: (content: BottomSheetContent) => void;
  setBottomSheetTitle: (title: string) => void;
}

const useScreenStore = create<ScreenState>((set) => ({
  modalVisible: false,
  modalContent: "login",
  modalTitle: "",
  bottomSheetVisible: false,
  bottomSheetContent: "info",
  bottomSheetTitle: "",
  setModalVisible: (visible) => set({ modalVisible: visible }),
  setModalContent: (content) => set({ modalContent: content }),
  setModalTitle: (title) => set({ modalTitle: title }),
  setBottomSheetVisible: (visible) => set({ bottomSheetVisible: visible }),
  setBottomSheetContent: (content) => set({ bottomSheetContent: content }),
  setBottomSheetTitle: (title) => set({ bottomSheetTitle: title }),
}));

export const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const useScreenState = () => {
  const {
    modalVisible,
    modalContent,
    modalTitle,
    bottomSheetVisible,
    bottomSheetContent,
    bottomSheetTitle,
  } = useScreenStore();
  return {
    modalVisible,
    modalContent,
    modalTitle,
    bottomSheetVisible,
    bottomSheetContent,
    bottomSheetTitle,
  };
};

export const useScreenActions = () => {
  const {
    setModalVisible,
    setModalContent,
    setModalTitle,
    setBottomSheetVisible,
    setBottomSheetContent,
    setBottomSheetTitle,
  } = useScreenStore();
  return {
    setModalVisible,
    setModalContent,
    setModalTitle,
    setBottomSheetVisible,
    setBottomSheetContent,
    setBottomSheetTitle,
  };
};
