import { cliff_front, cliffentrance_open, cliffgrass_back, cliffgrass_bottomleft, cliffgrass_bottomright, cliffgrass_front, cliffgrass_left, cliffgrass_right, cliffgrass_topleft, cliffgrass_topright } from '../entity/ridgearea_entities/sprites';

import Enemy from '../engine/enemy/enemy';
import { Location } from '../engine/interfaces/location';
import Player from '../engine/character/player';
import { RunGame } from '../rungame';
import Scene from '../engine/scene';
import { TransferOptions } from '../engine/dtos/transfer-options';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';
import canPatrol from '../engine/composition/entitypatrol';
import maps from './maps/maps';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';
import { sceneDictionary } from './scenedictionary';
import slimeDetails from '../engine/enemyentities/slime';
import slimeSuperDetails from '../engine/enemyentities/slimesuper';
import terrain from '../entity/terrain_entities/sprites';

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

let slimeTop = new Enemy(slimeDetails, 175, 115);
Object.assign(slimeTop, canPatrol(slimeTop));

let slimeMiddle = new Enemy(slimeDetails, 255, 270);
Object.assign(slimeMiddle, canPatrol(slimeMiddle));

export default class RidgeAreaCave implements Location {

    draw(influenceObject: Player) {

        let tileCollisionMin = 3;
        let ridgeScene = new Scene(maps.mapRidgeAreaCave, spriteObj, influenceObject);
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

        slimeSuper.process(influenceObject, this);
        slimeTop.process(influenceObject, this, { patrol: { patToX: 350, patToY: undefined} });
        slimeMiddle.process(influenceObject, this, { patrol: { patToX: 350, patToY: undefined } });

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
              RunGame({ player: transferOptions.player, locationClass:location });
        }
    }
}
