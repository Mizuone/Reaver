import { cave_ceiling, cave_wall } from '../entity/cave_entities/sprites';

import Enemy from '../engine/enemy/enemy';
import { Location } from '../engine/interfaces/location';
import Player from '../engine/character/player';
import { RunGame } from '../rungame';
import Scene from '../engine/scene';
import { TransferOptions } from '../engine/dtos/transfer-options';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';
import { blackblock } from '../entity/miscellaneous_entities/sprites';
import ridgeAreaMap from './maps/maps';
import { sceneDictionary } from './scenedictionary';
import shadeKeeperDetails from '../engine/enemyentities/shadekeeper';
import terrain from '../entity/terrain_entities/sprites';

const spriteObj = {
    cave_wall: cave_wall,
    cave_terrain: terrain.cave_terrain,
    cave_ceiling: cave_ceiling,
    blackblock: blackblock,
};
let shadeKeeper = new Enemy(shadeKeeperDetails, 275, 200);
shadeKeeper.direction = [6, 6, 7];

export default class RidgeAreaCaveLevelTwo implements Location {
    draw(influenceObject: Player) {

        let tileCollisionMin = 1;
        let ridgeScene = new Scene(ridgeAreaMap.mapRidgeAreaCaveLevelTwo, spriteObj, influenceObject);
        ridgeScene.renderMap(tileCollisionMin);

        shadeKeeper.process(influenceObject, this);

        for (let i = 0; i < sceneDictionary.ridgeAreaCaveLevelTwo.transitionLocations.length; i++) {
            const transfer = sceneDictionary.ridgeAreaCaveLevelTwo.transitionLocations[i];


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
