import Board from "./Board";
import Reset from "./Reset";
import Versus from "./Versus";

function Game() {
  return (
    <main className="">
      <Versus />
      <Board />
      {/* footer */}

      <Reset />
    </main>
  );
}

export default Game;
