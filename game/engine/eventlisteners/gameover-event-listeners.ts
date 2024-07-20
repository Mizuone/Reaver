import { GameOverClickLocations } from "../cursor/GameOverClickLocations";

export const addGameOverEventListeners = () => {
    const gameCanvas = document.getElementById('gameCanvas');

    gameCanvas.addEventListener('mousedown', (event) => GameOverClickLocations(gameCanvas, event));
};

export const removeGameOverEventListeners = () => {
    const gameCanvas = document.getElementById('gameCanvas');

    gameCanvas.removeEventListener('mousedown', (event) => GameOverClickLocations(gameCanvas, event));
};