import Enemy from "../enemy/enemy";
import { GetXYClickLocation } from "./CursorClickHelpers";
import Player from "../character/player";
import { attackEnemy } from "../../ui/playerBattleEvents";

export const BattleClickLocations = (playerObject: Player, enemyObject: Enemy, canvas: Element, event: MouseEvent) => {
    const { x, y } = GetXYClickLocation(canvas, event);

    if (playerObject.fighting && x > 507 && y > 184 && x < 565 && y < 200) {
        attackEnemy(playerObject, enemyObject);
    }

    return { x: x, y: y };
};