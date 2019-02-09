import battleMap from './maps/maps';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';
import terrianEntities from '../entity/terrain_entities/sprites';

import Context from '../engine/context/context';

import animationID from '../engine/animationframeid/animationid';
import animation from '../engine/animationcounter';

import Scene from '../engine/scene';
import Enemy from '../engine/enemy/enemy';

import { playerBattleInterface, playerAttackMenu, displayEnemyHealth } from '../ui/playerBattleInterface';

const spriteObj = {
  blackblock: miscellaneousEntities.blackblock,
  grass_terrain: terrianEntities.grass_terrain
}

export default class BattleScreen {
  /**
    * Draws the battle area to the canvas
  */
  draw(playerObject, enemyObject, battleEventOrigin) {
    let tileCollisionMin = 2;
    let battleScreenThis = this;

    animationID.animationid.id = requestAnimationFrame(() => {
      battleScreenThis.draw(playerObject, enemyObject, battleEventOrigin);
    });

    // Render BattleScreen Map
    let battleScene = new Scene(battleMap.mapbattle, spriteObj, playerObject);
    battleScene.renderMap(-1);

    console.log(playerBattleInterface, 'player');
    // Draw BattleScreen Interface
    playerBattleInterface(Context.context, playerObject);
    playerAttackMenu(Context.context, playerObject);
    displayEnemyHealth(Context.context, enemyObject);

    // Renders Enemy and Player Sprites
    playerObject.renderPlayer();
    enemyObject.renderEnemy();

    animation.resetanimationcounter();
  }

}
