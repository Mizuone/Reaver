import { DebugClickCursorCoordinates } from "../cursor/CursorClickHelpers";
import GameCanvas from "../canvas/game-canvas";

export const debugCursorCoordinates = () => {

    GameCanvas.canvas.addEventListener('mousedown', (event) => {
        DebugClickCursorCoordinates(GameCanvas.canvas, event);
    });
};