import { GameScene } from "./game-scene";
import Player from "../character/player";

export interface RunGameOptions {
    player: Player;
    gameScene: GameScene;
}