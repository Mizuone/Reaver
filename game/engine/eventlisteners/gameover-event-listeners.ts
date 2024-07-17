import { GameOverClickLocations } from "../cursor/GameOverClickLocations";

export const addGameOverEventListeners = () => {
    const myCanvas = document.getElementById('myCanvas');

    myCanvas.addEventListener('mousedown', (event) => GameOverClickLocations(myCanvas, event));
};

export const removeGameOverEventListeners = () => {
    const myCanvas = document.getElementById('myCanvas');

    myCanvas.removeEventListener('mousedown', (event) => GameOverClickLocations(myCanvas, event));
};