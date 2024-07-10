import { cave_ceiling, cave_opening, cave_wall } from '../entity/cave_entities/sprites';

import Enemy from '../engine/enemy/enemy';
import { Location } from '../engine/interfaces/location';
import Player from '../engine/character/player';
import Scene from '../engine/scene';
import { TransferOptions } from '../engine/dtos/transfer-options';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';
import { blackblock } from '../entity/miscellaneous_entities/sprites';
import canPatrol from '../engine/composition/entitypatrol';
import ridgeAreaMap from './maps/maps';
import { runGame } from '../rungame';
import { sceneDictionary } from './scenedictionary';
import shadeWalkerDetails from '../engine/enemyentities/shadewalker';
import terrain from '../entity/terrain_entities/sprites';

const spriteObj = {
    cave_wall: cave_wall,
    cave_opening: cave_opening,
    cave_terrain: terrain.cave_terrain,
    cave_ceiling: cave_ceiling,
    blackblock: blackblock,
};
let shadeWalkerLeft = new Enemy(shadeWalkerDetails, 100, 150);
Object.assign(shadeWalkerLeft, canPatrol(shadeWalkerLeft));

let shadeWalkerRight = new Enemy(shadeWalkerDetails, 480, 65);
Object.assign(shadeWalkerRight, canPatrol(shadeWalkerRight));



/** Class representing a ridge area that will be drawn on the canvas */
export default class RidgeAreaCaveLevelOne implements Location {
    /**
      * Draws the ridge area to the canvas
    */
    draw(influenceObject: Player) {

        let tileCollisionMin = 2;
        let ridgeScene = new Scene(ridgeAreaMap.mapridgeareacavelevelone, spriteObj, influenceObject);
        ridgeScene.renderMap(tileCollisionMin);

        /*for (let i = 0; i < 6; i++) {
            ridgeScene.renderMiscellaneousSprites(miscellaneousEntities.bush, [
                { x: 230, y: 300 },
                { x: 400, y: 250 },
                { x: 425, y: 10 },
                { x: 120, y: 100 },
                { x: 125, y: 350 }
            ]);
        }*/

        if (shadeWalkerLeft.health > 0) {
            shadeWalkerLeft.render();
            shadeWalkerLeft.patrol(200);
            shadeWalkerLeft.fightPlayer(influenceObject, this);
        }
        if (shadeWalkerRight.health > 0) {
            shadeWalkerRight.render();
            shadeWalkerRight.direction = [1,1,2];
            shadeWalkerRight.fightPlayer(influenceObject, this);
        }
        for (let i = 0; i < sceneDictionary.ridgeAreaCaveLevelOne.transitionLocations.length; i++) {
            const transfer = sceneDictionary.ridgeAreaCaveLevelOne.transitionLocations[i];


            this.transferNewLocation(transfer.location,
                {
                    player: influenceObject,
                    transferXCoordinate: transfer.transferXCoordinate,
                    transferYCoordinate: transfer.transferYCoordinate,
                    playerNewX: transfer.playerNewX,
                    playerNewY: transfer.playerNewY
                });
        }
        
        animation.resetanimationcounter();
    }

    transferNewLocation(location: any, transferOptions: TransferOptions) {
        if (transferOptions.transferXCoordinate - 32 < transferOptions.player.xCoordinates &&
            transferOptions.transferYCoordinate - 32 < transferOptions.player.yCoordinates &&
            transferOptions.transferXCoordinate > transferOptions.player.xCoordinates &&
            transferOptions.transferYCoordinate > transferOptions.player.yCoordinates) {

            cancelAnimationFrame(animationID.animationid.id);
            transferOptions.player.setPlayerCoordinates(transferOptions.playerNewX, transferOptions.playerNewY);
            runGame({ playerObject: transferOptions.player, locationClass: location });
        }
    }
}
