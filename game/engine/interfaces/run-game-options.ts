import { BuiltGameScene } from "./built-game-scene";
import Player from "../character/player";

export interface RunGameOptions {
    player: Player;
    gameScene: BuiltGameScene;
}