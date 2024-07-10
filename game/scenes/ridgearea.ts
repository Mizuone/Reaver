import Enemy from '../engine/enemy/enemy';
import { Location } from '../engine/interfaces/location';
import Player from '../engine/character/player';
import Scene from '../engine/scene';
import { TransferOptions } from '../engine/dtos/transfer-options';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';
import canPatrol from '../engine/composition/entitypatrol';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';
import ridgeAreaMap from './maps/maps';
import ridgeEntities from '../entity/ridgearea_entities/sprites';
import { runGame } from '../rungame';
import { sceneDictionary } from './scenedictionary';
import slimeDetails from '../engine/enemyentities/slime';
import slimeSuperDetails from '../engine/enemyentities/slimesuper';
import terrain from '../entity/terrain_entities/sprites';

const spriteObj = {
  grass_terrain: terrain.grass_terrain,
  dirt_terrain: terrain.dirt_terrain,
  ...ridgeEntities
};
let slimeMidBottom = new Enemy(slimeDetails, 300, 215);
Object.assign(slimeMidBottom, canPatrol(slimeMidBottom));

let slimeMidTop = new Enemy(slimeDetails, 325, 155);
Object.assign(slimeMidTop, canPatrol(slimeMidTop));

let slimeBottom = new Enemy(slimeDetails, 285, 275);
Object.assign(slimeBottom, canPatrol(slimeBottom));

let slimeRight = new Enemy(slimeDetails, 525, 155);
Object.assign(slimeRight, canPatrol(slimeRight));

let slimeLeft = new Enemy(slimeDetails, 75, 55);
Object.assign(slimeLeft, canPatrol(slimeLeft));

let slimeSuper = new Enemy(slimeSuperDetails, 429, 315);

export default class RidgeArea implements Location {

  draw(influenceObject: Player) {
      let tileCollisionMin = 2;
      let ridgeScene = new Scene(ridgeAreaMap.mapridge, spriteObj, influenceObject);
      ridgeScene.renderMap(tileCollisionMin);
  
      for (let i = 0; i < 6; i++) {
        ridgeScene.renderMiscellaneousSprites(miscellaneousEntities.bush, [
          { x:230, y:300 },
          { x:400, y:250 },
          { x:425, y:10 },
          { x:120, y:100 },
          { x:125, y:350 }
        ]);
      }

      slimeMidBottom.process

      if (slimeMidBottom.health > 0) {
        slimeMidBottom.render();
        slimeMidBottom.patrol(200)
        slimeMidBottom.fightPlayer(influenceObject, this);
      }
      if (slimeMidTop.health > 0) {
        slimeMidTop.render();
        slimeMidTop.patrol(250);
        slimeMidTop.fightPlayer(influenceObject, this);
      }
      if (slimeBottom.health > 0) {
        slimeBottom.render();
        slimeBottom.patrol(false, 380)
        slimeBottom.fightPlayer(influenceObject, this);
      }

      if (slimeRight.health > 0) {
        slimeRight.render();
        slimeRight.patrol(450);
        slimeRight.fightPlayer(influenceObject, this);
      }
  
      if (slimeLeft.health > 0) {
        slimeLeft.render();
        slimeLeft.patrol(300);
        slimeLeft.fightPlayer(influenceObject, this);
      }
  
      for (let i = 0; i < sceneDictionary.ridgeArea.transitionLocations.length; i++) {
        const transfer = sceneDictionary.ridgeArea.transitionLocations[i];
        
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
