import { GetXYClickLocation } from "./CursorClickHelpers";
import { RestartScenes } from "../../scenes/scenes";
import { removeGameOverEventListeners } from "../eventlisteners/gameover-event-listeners";
import { startGame } from "../../startgame.ts";

export const GameOverClickLocations = (canvas: Element, event: MouseEvent) => {
    const { x, y } = GetXYClickLocation(canvas, event);

    if (x > 215 && y > 112 && x < 405 && y < 143) {
        RestartScenes();
        startGame();
        removeGameOverEventListeners();
    }
};