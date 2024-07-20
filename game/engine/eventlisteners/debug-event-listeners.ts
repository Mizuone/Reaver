import { DebugClickCursorCoordinates } from "../cursor/CursorClickHelpers";

export const debugCursorCoordinates = () => {
    const gameCanvas = document.getElementById('gameCanvas');

    gameCanvas.addEventListener('mousedown', (event) => {
        DebugClickCursorCoordinates(gameCanvas, event);
    });
};