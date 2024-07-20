import { BattleClickLocations } from "../cursor/BattleEventClickLocations";
import Enemy from "../enemy/enemy";
import Player from "../character/player";

export const addBattleEventListeners = (player: Player, enemy: Enemy) => {
    const gameCanvas = document.getElementById('gameCanvas');

    gameCanvas.addEventListener('mousedown', (event) => {
        BattleClickLocations(player, enemy, gameCanvas, event);
    });
};

export const removeBattleEventListeners = (player: Player, enemy: Enemy) => {
    const gameCanvas = document.getElementById('gameCanvas');

    gameCanvas.removeEventListener('mousedown', (event) => {
        BattleClickLocations(player, enemy, gameCanvas, event);
    });
};