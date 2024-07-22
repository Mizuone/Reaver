import Player from "../character/player";

export interface GameScene {
    draw(player: Player, drawTransitionOptions: Array<any>): void;
}