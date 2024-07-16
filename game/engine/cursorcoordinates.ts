import Enemy from "./enemy/enemy";
import Player from "./character/player";
import { attackEnemy } from "../ui/playerBattleEvents";

export const ClickPointCoordinates = (playerObject: Player, enemyObject: Enemy, canvas: Element, event: MouseEvent)  => {
    const rect: DOMRect = canvas.getBoundingClientRect();
    const x: number = event.clientX - rect.left;
    const y: number = event.clientY - rect.top;

    if (playerObject.fighting && x > 507 && y > 184 && x < 565 && y < 200) {
        attackEnemy(playerObject, enemyObject);
    }

    return {x: x, y: y};
};

export const DebugClickCursorCoordinates = (canvas: Element, event: MouseEvent) => {
    const rect: DOMRect = canvas.getBoundingClientRect();
    const x: number = Math.ceil(event.x - rect.left);
    const y: number = Math.ceil(event.y - rect.top);
    
    console.log(event.x)
    console.log(event.y)
    console.log(event.clientX)
    console.log(event.clientY)
    console.log(rect.left)
    console.log(rect.top)

    

    console.log({x: x, y: y});
}