import LinkButton from "@/components/comp-86";
import BreathingText from "@/components/fancy/breathing-text";
import TextRotate from "@/components/ui/text-rotate";
import { Gamepad2, Users2 } from "lucide-react";

function MainPage() {
  //loading state

  // if (loading) return <Loading />;
  return (
    <section className="login-page h-[90%] flex flex-col items-center justify-center md:justify-around">
      <div className="flex flex-col h-full items-center gap-[max(2rem,7.5vw)] justify-center z-10 ">
        <h1 className="max-w-[20ch] max-sm:text-[2.65rem] max-sm:leading-normal text-center whitespace-pre-wrap leading-relaxed">
          <BreathingText
            label="Let's play"
            className="pixel"
            staggerDuration={0.1}
            fromFontVariationSettings="'wght' 100, 'slnt' 0"
            toFontVariationSettings="'wght' 800, 'slnt' -10"
          />{" "}
          <TextRotate
            texts={[
              "Tic-Tac-Toe 🎮",
              "it's draggable",
              "It's Fun 😎",
              "For Friends 👫",
            ]}
            mainClassName="text-white font-bold text-accent/80 px-2 max-sm:text-4xl sm:px-2 md:px-3 bg-accent/5 overflow-hidden py-3 justify-center rounded-lg max-w-max mx-auto text-5xl"
            staggerFrom={"random"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            elementLevelClassName="tic"
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 tic"
            transition={{ type: "spring", damping: 19, stiffness: 400 }}
            rotationInterval={3000}
          />
        </h1>
        <div className="flex flex-col gap-6">
          <LinkButton
            to={"/game"}
            className="py-6"
            Icon={Gamepad2}
            iconClassName="-rotate-12"
          >
            Single Player Mode
          </LinkButton>
          <LinkButton
            to={"/rooms"}
            className="py-6"
            Icon={Users2}
            iconClassName="-rotate-12"
          >
            Multiplayer Mode
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

export default MainPage;
