import ridgeAreaMap from './maps/maps';
import ridgeEntities from '../entity/ridgearea_entities/sprites';
import terrain from '../entity/terrain_entities/sprites';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';

import animationID from '../engine/animationframeid/animationid';
import animation from '../engine/animationcounter';

import Scene from '../engine/scene';

import Enemy from '../engine/enemy/enemy';
import slimeDetails from '../engine/enemyentities/slime';

import canPatrol from '../engine/composition/entitypatrol';
import canAggro from '../engine/composition/entityaggro';
import Limiter from '../engine/fpslimiter';

console.log(canPatrol);

const spriteObj = {
  grass_terrain: terrain.grass_terrain,
  dirt_terrain: terrain.dirt_terrain,
  ...ridgeEntities
};

let slimeMidBottom = new Enemy(slimeDetails, 300, 215);
// slimeMidBottom.canPatrol = canPatrol();
Object.assign(slimeMidBottom, canPatrol(slimeMidBottom));

let slimeMidTop = new Enemy(slimeDetails, 325, 155);
Object.assign(slimeMidTop, canPatrol(slimeMidTop));

let slimeBottom = new Enemy(slimeDetails, 285, 275);
Object.assign(slimeBottom, canPatrol(slimeBottom));

let slimeRight = new Enemy(slimeDetails, 525, 155);
Object.assign(slimeRight, canPatrol(slimeRight));

let slimeLeft = new Enemy(slimeDetails, 75, 55);
Object.assign(slimeLeft, canPatrol(slimeLeft));

/** Class representing a ridge area that will be drawn on the canvas */
export default class RidgeArea {
  private readonly limiter = new Limiter(60);
  /**
    * Draws the ridge area to the canvas
  */
  draw(influenceObject: any) {
    const classThis = this;
    console.log(classThis);
    console.log(this.limiter);
    animationID.animationid.id = requestAnimationFrame(() => {
      classThis.draw(influenceObject);
    });
    console.log('here');
    if (this.limiter.fpsLimiter()) {
      this.limiter.updateCurrentTime();

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
  
      if (slimeMidBottom.health > 0) {
        slimeMidBottom.renderEnemy();
        slimeMidBottom.patrol(200)
      } else {
        slimeMidBottom = null;
      }
      if (slimeMidTop.health > 0) {
        slimeMidTop.renderEnemy();
        slimeMidTop.patrol(250);
      } else {
        slimeMidTop = null;
      }
      slimeBottom.renderEnemy();
      slimeRight.renderEnemy();
  
      if (slimeLeft.health > 0) {
        slimeLeft.renderEnemy();
        slimeLeft.patrol(300);
        slimeLeft.fightPlayer(influenceObject, this.draw);
      } else {
        slimeLeft = null;
      }
  
      slimeBottom.patrol(false, 380)
      slimeRight.patrol(450);
      
  
      animation.resetanimationcounter();
    }
  }


}
