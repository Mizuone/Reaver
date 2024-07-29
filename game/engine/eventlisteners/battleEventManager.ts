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

    addBattleEventListeners = () => this.canvas.addEventListener('mousedown', this.battleEventHandler);
    removeBattleEventListeners = () => this.canvas.removeEventListener('mousedown', this.battleEventHandler);
    
    battleEventHandler = (event: MouseEvent) => BattleClickLocations(this.player, this.enemy, this.canvas, event);
}

