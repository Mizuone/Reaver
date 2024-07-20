import Enemy from "../enemy/enemy";
import Player from "../character/player";

export default function (entity: Player | Enemy, boundsX: number, boundsY: number, collisionSize: number) {
    const withinXBounds = entity.x >= (boundsX - collisionSize) && entity.x <= boundsX;
    const withinYBounds = entity.y >= (boundsY - collisionSize) && entity.y <= boundsY;

    return withinXBounds && withinYBounds;
}