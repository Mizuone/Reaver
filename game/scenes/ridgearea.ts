import Enemy from '../engine/enemy/enemy';
import { Location } from '../engine/interfaces/location';
import Player from '../engine/character/player';
import { RunGame } from '../rungame';
import Scene from '../engine/scene';
import { TransferOptions } from '../engine/dtos/transfer-options';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';
import canPatrol from '../engine/composition/entitypatrol';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';
import ridgeAreaMap from './maps/maps';
import ridgeEntities from '../entity/ridgearea_entities/sprites';
import { sceneDictionary } from './scenedictionary';
import slimeDetails from '../engine/enemyentities/slime';
import slimeSuperDetails from '../engine/enemyentities/slimesuper';
import terrain from '../entity/terrain_entities/sprites';

const spriteObj = {
  grass_terrain: terrain.grass_terrain,
  dirt_terrain: terrain.dirt_terrain,
  ...ridgeEntities
};

export default class RidgeArea implements Location {
  private slimeMidTop: Enemy;
  private slimeMidBottom: Enemy;
  private slimeBottom: Enemy;
  private slimeRight: Enemy;
  private slimeLeft: Enemy;
  private slimeSuper: Enemy;

  constructor() {
    console.log("new ridge area");
    this.slimeMidBottom = new Enemy(slimeDetails, 300, 215);
    Object.assign(this.slimeMidBottom, canPatrol(this.slimeMidBottom));

    this.slimeMidTop = new Enemy(slimeDetails, 325, 155);
    Object.assign(this.slimeMidTop, canPatrol(this.slimeMidTop));

    this.slimeBottom = new Enemy(slimeDetails, 285, 275);
    Object.assign(this.slimeBottom, canPatrol(this.slimeBottom));

    this.slimeRight = new Enemy(slimeDetails, 525, 155);
    Object.assign(this.slimeRight, canPatrol(this.slimeRight));

    this.slimeLeft = new Enemy(slimeDetails, 75, 55);
    Object.assign(this.slimeLeft, canPatrol(this.slimeLeft));

    this.slimeSuper = new Enemy(slimeSuperDetails, 542, 93);  
  }

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

      this.slimeMidBottom.process(influenceObject, this, { patrol: { patToX: 200, patToY: undefined } });
      this.slimeMidTop.process(influenceObject, this, { patrol: { patToX: 250, patToY: undefined } });
      this.slimeBottom.process(influenceObject, this, { patrol: { patToX: undefined, patToY: 380 } });
      this.slimeRight.process(influenceObject, this, { patrol: { patToX: 450, patToY: undefined } });
      this.slimeLeft.process(influenceObject, this, { patrol: { patToX: 300, patToY: undefined } });
      this.slimeSuper.process(influenceObject, this);
  
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
      RunGame({ player: transferOptions.player, locationClass: location });
    }
  }
}
