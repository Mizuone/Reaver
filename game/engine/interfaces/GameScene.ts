import Player from "../character/player";
import { TransferScene } from "./transfer-scene";

export interface GameScene {
    draw(influenceObject: Player, drawTransitionOptions: Array<any>): void;
    transferNewLocation(transferScene: TransferScene, player: Player): void;
}