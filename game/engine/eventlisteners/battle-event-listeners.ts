import { BattleClickLocations } from "../cursor/BattleEventClickLocations";
import Enemy from "../enemy/enemy";
import GameCanvas from "../canvas/game-canvas";
import Player from "../character/player";

export class BattleEventManager {
    private player: Player;
    private enemy: Enemy;
    private canvas: HTMLCanvasElement = GameCanvas.canvas;
    
    constructor(_player: Player, _enemy: Enemy) {
        this.player = _player;
        this.enemy = _enemy;
    }

    

    addBattleEventListeners = (player: Player, enemy: Enemy) => {
        this.canvas.addEventListener('mousedown', (event) => {
            BattleClickLocations(player, enemy, gameCanvas, event);
        });
    };

    removeBattleEventListeners = (player: Player, enemy: Enemy) => {

        this.canvas.removeEventListener('mousedown', (event) => {
            BattleClickLocations(player, enemy, gameCanvas, event);
        });
    };
}

const battleEventHandler = () => {

}
// BattleEventManager - class that takes a player, enemy
// three methods

