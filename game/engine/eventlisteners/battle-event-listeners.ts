import { BattleClickLocations } from "../cursor/BattleEventClickLocations";
import Enemy from "../enemy/enemy";
import Player from "../character/player";

export const addBattleEventListeners = (player: Player, enemy: Enemy) => {
    const myCanvas = document.getElementById('myCanvas');

    myCanvas.addEventListener('mousedown', (event) => {
        BattleClickLocations(player, enemy, myCanvas, event);
    });
};

export const removeBattleEventListeners = (player: Player, enemy: Enemy) => {
    const myCanvas = document.getElementById('myCanvas');

    myCanvas.removeEventListener('mousedown', (event) => {
        BattleClickLocations(player, enemy, myCanvas, event);
    });
};