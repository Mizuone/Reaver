import { cave_ceiling, cave_opening, cave_wall } from '../entity/cave_entities/sprites';

import Enemy from '../engine/enemy/enemy';
import { Location } from '../engine/interfaces/location';
import Player from '../engine/character/player';
import { RunGame } from '../rungame';
import Scene from '../engine/scene';
import { TransferOptions } from '../engine/dtos/transfer-options';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';
import { blackblock } from '../entity/miscellaneous_entities/sprites';
import canPatrol from '../engine/composition/entitypatrol';
import ridgeAreaMap from './maps/maps';
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

export default class RidgeAreaCaveLevelOne implements Location {
    draw(influenceObject: Player) {

        let tileCollisionMin = 2;
        let ridgeScene = new Scene(ridgeAreaMap.mapRidgeAreaCaveLevelOne, spriteObj, influenceObject);
        ridgeScene.renderMap(tileCollisionMin);

        shadeWalkerLeft.process(influenceObject, this, { patrol: { patToX: 200, patToY: undefined } });
        shadeWalkerRight.process(influenceObject, this);

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
            RunGame({ player: transferOptions.player, locationClass: location });
        }
    }
}
