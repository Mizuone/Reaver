import { DebugClickCursorCoordinates } from "../cursor/CursorClickHelpers";

export const debugCursorCoordinates = () => {
    const myCanvas = document.getElementById('myCanvas');

    myCanvas.addEventListener('mousedown', (event) => {
        DebugClickCursorCoordinates(myCanvas, event);
    });
};