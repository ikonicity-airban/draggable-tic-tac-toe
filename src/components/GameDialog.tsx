import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useScreenActions, useScreenState } from "@/lib/context/ScreenContext";
import Reset from "./main/Reset";
import { ReactNode } from "react";

export default function GameDialog() {
  const { setModalVisible } = useScreenActions();
  const { modalContent, modalTitle, modalVisible } = useScreenState();

  return (
    <Dialog open={modalVisible} onOpenChange={setModalVisible}>
      <DialogContent
        className="sm:max-w-md bg-[#fff1] backdrop-blur-sm border-none rounded-lg"
        style={{ width: "85%" }}
      >
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        {<GameOverContent>{modalContent}</GameOverContent>}
      </DialogContent>
    </Dialog>
  );
}

const GameOverContent = ({ children }: { children: ReactNode }) => (
  <>
    <div>{children}</div>
    <DialogFooter>
      <Reset />
    </DialogFooter>
  </>
);
