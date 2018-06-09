import ridgeAreaMap from './maps/maps';
import ridgeEntities from '../entity/ridgearea_entities/sprites';
import terrain from '../entity/terrain_entities/sprites';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';

import animationID from '../engine/animationframeid/animationid';
import animation from '../engine/animationcounter';

import Scene from '../engine/scene';

import Player from '../engine/character/player';

import Enemy from '../engine/enemy/enemy';
import slimeDetails from '../engine/enemyentities/slime';

import canPatrol from '../engine/composition/entitypatrol';
import canAggro from '../engine/composition/entityaggro';

console.log(canPatrol);

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

/** Class representing a ridge area that will be drawn on the canvas */
export default class RidgeArea {

  /**
    * Draws the ridge area to the canvas
  */
  draw(influenceObject) {
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
    slimeMidBottom.renderEnemy();
    slimeMidBottom.patrol(200);

    slimeMidTop.renderEnemy();
    slimeMidTop.patrol(250);

    slimeBottom.renderEnemy();
    slimeBottom.patrol(false, 380)

    slimeRight.renderEnemy();
    slimeRight.patrol(450);

    slimeLeft.renderEnemy();
    slimeLeft.patrol(300);
    slimeLeft.fightPlayer(influenceObject);

    animation.resetanimationcounter();
  }


}
