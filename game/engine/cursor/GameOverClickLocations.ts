import { GetXYClickLocation } from "./CursorClickHelpers";
import { startGame } from "../../htmlcanvas";

export const GameOverClickLocations = (canvas: Element, event: MouseEvent) => {
    const { x, y } = GetXYClickLocation(canvas, event);

    if (x > 215 && y > 112 && x < 405 && y < 143) {
        startGame();
    }

    return { x: x, y: y };
};