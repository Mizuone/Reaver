import Enemy from "../enemy/enemy";
import { GetXYClickLocation } from "./CursorClickHelpers";
import Player from "../character/player";
import { attackEnemy } from "../../ui/playerBattleEvents";

export const BattleClickLocations = (player: Player, enemy: Enemy, canvas: HTMLCanvasElement, event: MouseEvent) => {
    const { x, y } = GetXYClickLocation(canvas, event);

    if (player.fighting && x > 507 && y > 184 && x < 565 && y < 200) {
        attackEnemy(player, enemy);
    }

    return { x: x, y: y };
};