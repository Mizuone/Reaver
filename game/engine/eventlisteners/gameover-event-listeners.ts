import GameCanvas from "../canvas/game-canvas";
import { GameOverClickLocations } from "../cursor/GameOverClickLocations";

const GameOverClickHandler = (event: MouseEvent) => {
    GameOverClickLocations(GameCanvas.canvas, event);
};

export const addGameOverEventListeners = () => GameCanvas.canvas.addEventListener('mousedown', GameOverClickHandler);
export const removeGameOverEventListeners = () => GameCanvas.canvas.removeEventListener('mousedown', GameOverClickHandler);