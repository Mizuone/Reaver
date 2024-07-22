import Enemy from "../enemy/enemy";
import Player from "../character/player";
import { RunGame } from "../../rungame";
import Sprite from "../../entity/sprite";
import { StaticEntity } from "../interfaces/static-entity";
import { TransferScene } from "../interfaces/transfer-scene";

export const isColliding = (entity: Player | Enemy, boundsX: number, boundsY: number, collisionSize: number) => {
    const withinXBounds = entity.x >= (boundsX - collisionSize) && entity.x <= boundsX;
    const withinYBounds = entity.y >= (boundsY - collisionSize) && entity.y <= boundsY;

    return withinXBounds && withinYBounds;
}

export const computeDistanceBetweenEntities = (xOne: number, yOne: number, xTwo: number, yTwo: number) => {

    let xDistance = xOne - xTwo;
    let yDistance = yOne - yTwo;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

export const transferNewLocationOnCollision = (player: Player, transferScenes: TransferScene[], currentAnimationID: number) => {
    for (let i = 0; i < transferScenes.length; i++) {
        const transferScene = transferScenes[i];
        const { gameScene, transferX, transferY, } = transferScene;

        if (isColliding(player, transferX, transferY, player.size)) {

            console.log(gameScene);
            console.log(currentAnimationID);
            cancelAnimationFrame(currentAnimationID);
            player.setPlayerCoordinates(transferScene.arriveX, transferScene.arriveY);
            RunGame({ player, gameScene });
        }
    }
}

export const renderMiscSprites = (staticSprite: Sprite, entities: StaticEntity[]) => {
    for (let i = 0; i < entities.length; i++) {
        staticSprite.draw(entities[i].x, entities[i].y);
    }
}