import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useScreenActions, useScreenState } from "@/lib/context/ScreenContext";
import Reset from "./main/Reset";

export default function GameDialog() {
  const { setModalVisible } =
    useScreenActions();
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
        {modalContent == "score" && <GameOverContent />}
        
      </DialogContent>
    </Dialog>
  );
}

const GameOverContent = () => <>
<div>Game Over Soon</div>
<DialogFooter>
  <Reset/>
</DialogFooter>
</>
