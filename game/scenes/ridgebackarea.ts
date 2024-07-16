import Enemy from '../engine/enemy/enemy';
import { Location } from '../engine/interfaces/location';
import Player from '../engine/character/player';
import Scene from '../engine/scene';
import { TransferOptions } from '../engine/dtos/transfer-options';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';
import canPatrol from '../engine/composition/entitypatrol';
import maps from './maps/maps';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';
import ridgeEntities from '../entity/ridgearea_entities/sprites';
import { runGame } from '../rungame';
import { sceneDictionary } from './scenedictionary';
import shadewalker from '../engine/enemyentities/shadewalker';
import slimeDetails from '../engine/enemyentities/slime';
import slimeSuperDetails from '../engine/enemyentities/slimesuper';
import terrain from '../entity/terrain_entities/sprites';

const spriteObj = {
	grass_terrain: terrain.grass_terrain,
	dirt_terrain: terrain.dirt_terrain,
	...ridgeEntities
};
let shadeWalker = new Enemy(shadewalker, 259, 164)

let slimeMidBottom = new Enemy(slimeDetails, 355, 345);
Object.assign(slimeMidBottom, canPatrol(slimeMidBottom));

let slimeCenterTop = new Enemy(slimeDetails, 350, 197);
Object.assign(slimeCenterTop, canPatrol(slimeCenterTop));

let slimeCenterBottom = new Enemy(slimeDetails, 199, 250);
Object.assign(slimeCenterBottom, canPatrol(slimeCenterBottom));

let slimeSuper = new Enemy(slimeSuperDetails, 317, 345);

export default class RidgeAreaBack implements Location {

	draw(influenceObject: Player) {
			let tileCollisionMin = 2;
			let ridgeScene = new Scene(maps.mapRidgeAreaBack, spriteObj, influenceObject);

			ridgeScene.renderMap(tileCollisionMin);
	
			for (let i = 0; i < 6; i++) {
				ridgeScene.renderMiscellaneousSprites(miscellaneousEntities.bush, [
					{ x: 47, y: 200 },
					{ x: 174, y: 71 },
					{ x: 533, y: 86 },
					{ x: 332, y: 435 },
					{ x: 299, y: 48 }
				]);
			}

			slimeCenterTop.process(influenceObject, this, { patrol: { patToX: 190, patToY: undefined } });
			slimeCenterBottom.process(influenceObject, this, { patrol: { patToX: 401, patToY: undefined } });
			slimeMidBottom.process(influenceObject, this, { patrol: { patToX: 520, patToY: undefined } });
			slimeSuper.process(influenceObject, this);
			shadeWalker.process(influenceObject, this);
	
			for (let i = 0; i < sceneDictionary.ridgeBackArea.transitionLocations.length; i++) {
				const transfer = sceneDictionary.ridgeBackArea.transitionLocations[i];
				
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
