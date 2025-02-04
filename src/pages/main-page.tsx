import { Button } from "@/components/ui/button";
import { UI_LINKS } from "@/lib/links";
import { useNavigate } from "react-router";

function MainPage() {
  //loading state
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSinglePlayerMode = () => {
    navigate(UI_LINKS.game("1"));
  };

  const handleMultiplayerMode = () => {
    navigate(UI_LINKS.rooms);
  };

  // if (loading) return <Loading />;
  return (
    <section className="login-page h-[60%]">
      <div className="flex flex-col h-full items-center gap-6 justify-evenly z-10 ">
        <h1 className="max-w-[15ch] text-center text-gradient">
          Let play a game of Tic Tac Toe
        </h1>
        <div className="flex flex-col gap-6">
          <Button variant="outline" onClick={handleSinglePlayerMode}>
            Single Player Mode
          </Button>
          <Button variant="outline" onClick={handleMultiplayerMode}>
            Multiplayer Mode
          </Button>
        </div>
      </div>
    </section>
  );
}

export default MainPage;
