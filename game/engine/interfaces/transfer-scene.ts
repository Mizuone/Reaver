import { BuiltGameScene } from "./built-game-scene";

export interface TransferScene {
    gameScene: BuiltGameScene,
    transferX: number;
    transferY: number;
    arriveX: number;
    arriveY: number;
}