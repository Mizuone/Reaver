import ridgeAreaMap from './maps/maps';
import ridgeEntities, { cliffgrass_front, cliffgrass_topleft, cliffgrass_topright, cliffentrance_open, cliffgrass_back, cliffgrass_right, cliffgrass_left, cliffgrass_bottomleft, cliffgrass_bottomright, cliff_front } from '../entity/ridgearea_entities/sprites';
import caveEntities from '../entity/cave_entities/sprites';
import terrain from '../entity/terrain_entities/sprites';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';

import Scene from '../engine/scene';

import Enemy from '../engine/enemy/enemy';
import slimeDetails from '../engine/enemyentities/slime';
import slimeSuperDetails from '../engine/enemyentities/slimesuper';

import canPatrol from '../engine/composition/entitypatrol';
import Player from '../engine/character/player';
import { Location } from '../engine/interfaces/location';
import { TransferOptions } from '../engine/dtos/transfer-options';
import RidgeArea from './ridgearea';
import { runGame } from '../rungame';
import RidgeAreaCaveLevelOne from './ridgeareacave_level1';
import { sceneDictionary } from './scenedictionary';

const spriteObj = {
    grass_terrain: terrain.grass_terrain,
    dirt_terrain: terrain.dirt_terrain,
    cliffentrance_open: cliffentrance_open,
    cliffgrass_topleft: cliffgrass_topleft,
    cliffgrass_topright: cliffgrass_topright,
    cliffgrass_front: cliffgrass_front,
    cliffgrass_back: cliffgrass_back,
    cliffgrass_right: cliffgrass_right,
    cliffgrass_left: cliffgrass_left,
    cliffgrass_bottomright: cliffgrass_bottomright,
    cliffgrass_bottomleft: cliffgrass_bottomleft,
    cliff_front: cliff_front
};
let slimeSuper = new Enemy(slimeSuperDetails, 429, 315);
Object.assign(slimeSuper, canPatrol(slimeSuper));

let slimeTop = new Enemy(slimeDetails, 175, 115);
Object.assign(slimeTop, canPatrol(slimeTop));

let slimeMiddle = new Enemy(slimeDetails, 255, 270);
Object.assign(slimeMiddle, canPatrol(slimeMiddle));


/** Class representing a ridge area that will be drawn on the canvas */
export default class RidgeAreaCave implements Location {
    /**
      * Draws the ridge area to the canvas
    */
    draw(influenceObject: Player) {

        let tileCollisionMin = 3;
        let ridgeScene = new Scene(ridgeAreaMap.mapridgeareacave, spriteObj, influenceObject);
        ridgeScene.renderMap(tileCollisionMin);

        for (let i = 0; i < 6; i++) {
            ridgeScene.renderMiscellaneousSprites(miscellaneousEntities.bush, [
                { x: 450, y: 400 },
                { x: 495, y: 185 },
                { x: 575, y: 75 },
                { x: 50, y: 175 },
                { x: 125, y: 350 }
            ]);
        }

        if (slimeSuper.health > 0) {
            slimeSuper.renderEnemy();
            slimeSuper.direction = [1,1,2];
            slimeSuper.fightPlayer(influenceObject, this);
        }
        if (slimeTop.health > 0) {
            slimeTop.renderEnemy();
            slimeTop.patrol(350);
            slimeTop.fightPlayer(influenceObject, this);
        }
        if (slimeMiddle.health > 0) {
            slimeMiddle.renderEnemy();
            slimeMiddle.patrol(350)
            slimeMiddle.fightPlayer(influenceObject, this);
        }
        for (let i = 0; i < sceneDictionary.ridgeAreaCave.transitionLocations.length; i++) {
            const transfer = sceneDictionary.ridgeAreaCave.transitionLocations[i];

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
              runGame({ playerObject: transferOptions.player, locationClass:location });
        }
    }
}
