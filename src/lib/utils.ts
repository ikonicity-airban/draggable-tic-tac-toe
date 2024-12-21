import { winningCombinations } from "./constants";

export function checkWinner(
  tiles: ("cross" | "circle" | null)[],
  playerTurn: "cross" | "circle"
): {
  match: boolean;
  combo?: number[];
  strikeClass?: string | null;
  draw?: boolean;
} | null {
  for (const { combo, strikeClass } of winningCombinations) {
    const match = combo.every((index) => tiles[index] === playerTurn);
    if (match) {
      return {
        match,
        strikeClass,
        combo,
        draw: false,
      };
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    return {
      match: false,
      strikeClass: "",
      draw: true,
    };
  }
  return null;
}