import gameOverSoundAsset from "/game-over.wav";
import clickSoundAsset from "/click.wav";

export enum GameState {
  inProgress = "inProgress",
  playerXWins = "playerXWins",
  playerOWins = "playerOWins",
  draw = "draw",
}

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;
