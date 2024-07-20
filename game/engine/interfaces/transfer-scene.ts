import { GameScene } from "./game-scene";

export interface TransferScene {
    gameScene: GameScene,
    transferX: number;
    transferY: number;
    arriveX: number;
    arriveY: number;
}