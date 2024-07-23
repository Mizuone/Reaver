import Player from "../character/player";
import { TransferScene } from "./transfer-scene";

export interface GameScene {
    draw(player: Player, drawTransitionOptions: Array<any>): void;
    setTransferScenes(_transferScenes: TransferScene[]): void;
}