import Player from "../character/player";
import { SpriteCollection } from "./map-sprites";
import { TransferScene } from "./transfer-scene";

export interface GameScene {
    sceneMapSprites: SpriteCollection;
    battleMapSprites: SpriteCollection; 
    draw(player: Player, drawTransitionOptions: Array<any>): void;
    setTransferScenes(_transferScenes: TransferScene[]): void;
}