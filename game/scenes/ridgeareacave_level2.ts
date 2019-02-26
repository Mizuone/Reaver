import ridgeAreaMap from './maps/maps';
import ridgeEntities, { cliffgrass_front, cliffgrass_topleft, cliffgrass_topright, cliffentrance_open, cliffgrass_back, cliffgrass_right, cliffgrass_left, cliffgrass_bottomleft, cliffgrass_bottomright, cliff_front } from '../entity/ridgearea_entities/sprites';
import caveEntities, { cave_wall, cave_ceiling, cave_opening } from '../entity/cave_entities/sprites';
import terrain from '../entity/terrain_entities/sprites';
import miscellaneousEntities, { blackblock } from '../entity/miscellaneous_entities/sprites';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';

import Scene from '../engine/scene';

import Enemy from '../engine/enemy/enemy';
import shadeKeeperDetails from '../engine/enemyentities/shadekeeper';

import canPatrol from '../engine/composition/entitypatrol';
import Player from '../engine/character/player';
import { Location } from '../engine/interfaces/location';
import { TransferOptions } from '../engine/dtos/transfer-options';
import { runGame } from '../rungame';
import RidgeAreaCave from './ridgeareacave';
import { sceneDictionary } from './scenedictionary';

const spriteObj = {
    cave_wall: cave_wall,
    cave_terrain: terrain.cave_terrain,
    cave_ceiling: cave_ceiling,
    blackblock: blackblock,
};
let shadeKeeper = new Enemy(shadeKeeperDetails, 275, 200);
Object.assign(shadeKeeper, canPatrol(shadeKeeper));


/** Class representing a ridge area that will be drawn on the canvas */
export default class RidgeAreaCaveLevelTwo implements Location {
    /**
      * Draws the ridge area to the canvas
    */
    draw(influenceObject: Player) {

        let tileCollisionMin = 1;
        let ridgeScene = new Scene(ridgeAreaMap.mapridgeareacaveleveltwo, spriteObj, influenceObject);
        ridgeScene.renderMap(tileCollisionMin);

        if (shadeKeeper.health > 0) {
            shadeKeeper.renderEnemy();
            shadeKeeper.direction = [6, 6, 7];
            shadeKeeper.fightPlayer(influenceObject, this);
        }
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
            runGame({ playerObject: transferOptions.player, locationClass: location });
        }
    }
}
