import Enemy from "../enemy/enemy";
import Player from "../character/player";
import { ClickPointCoordinates } from "../cursorcoordinates";

export const addCursorEventListener = (playerObject: Player, enemyObject: Enemy) => {
    const myCanvas = document.getElementById('myCanvas');
    myCanvas.addEventListener('mousedown', (event) => { ClickPointCoordinates(playerObject, enemyObject, myCanvas, event); })
}

export const removeCursorEventListener = (playerObject: Player, enemyObject: Enemy) => {
    const myCanvas = document.getElementById('myCanvas');
    myCanvas.removeEventListener('mousedown', (event) => { ClickPointCoordinates(playerObject, enemyObject, myCanvas, event); });
}
