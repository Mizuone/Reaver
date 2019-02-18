import Player from "./character/player";
import Enemy from "./enemy/enemy";
import { attackEnemy } from "../ui/playerBattleEvents";

export const ClickPointCoordinates = (playerObject: Player, enemyObject: Enemy, canvas: Element, event: MouseEvent)  => {
    const rect: ClientRect | DOMRect = canvas.getBoundingClientRect();
    const x: number = event.clientX - rect.left;
    const y: number = event.clientY - rect.top;

    if (playerObject.fighting && x > 507 && y > 184 && x < 565 && y < 200) {
        attackEnemy(playerObject, enemyObject);
    }

    console.log({x: x, y: y});
    return {x: x, y: y};
};

// {x: 507, y: 184}
// {x: 564, y: 197}