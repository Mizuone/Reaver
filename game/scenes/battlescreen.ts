import battleMap from './maps/maps';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';
import terrianEntities from '../entity/terrain_entities/sprites';
import playerEntities from '../entity/character_entities/sprites';
import Context from '../engine/context/context';

import animationID from '../engine/animationframeid/animationid';
import animation from '../engine/animationcounter';

import Scene from '../engine/scene';
import Enemy from '../engine/enemy/enemy';

import { playerBattleInterface, playerAttackMenu, displayEnemyHealth, displayRewardMenu } from '../ui/playerBattleInterface';
import Player from '../engine/character/player';
import Sprite from '../engine/sprite';
import Limiter from '../engine/fpslimiter';
import { removeCursorEventListener } from '../engine/context/addcursoreventlistener';
import RidgeArea from './ridgearea';

const spriteObj = {
  blackblock: miscellaneousEntities.blackblock,
  grass_terrain: terrianEntities.grass_terrain
}

export default class BattleScreen {
  private readonly limiter = new Limiter(60);
  /**
    * Draws the battle area to the canvas
  */
  public draw(playerObject: Player, enemyObject: Enemy, battleEventOrigin: any) {
    let tileCollisionMin = 2;
    let battleScreenThis = this;
    console.log(battleEventOrigin);
    // Recursivily draws this scenes draw method based on monitor refresh rate
    animationID.animationid.id = requestAnimationFrame(() => {
        battleScreenThis.draw(playerObject, enemyObject, battleEventOrigin);
    });

    // @Note FPS Limiter limits the refresh rate, Calls logic at this refresh rate.
    if (this.limiter.fpsLimiter()) {
      this.limiter.updateCurrentTime();

      // Render BattleScreen Map
      let battleScene = new Scene(battleMap.mapbattle, spriteObj, playerObject);
      battleScene.renderMap(-1);
  
      // console.log(playerBattleInterface, 'player');
      // Draw BattleScreen Interface
      playerBattleInterface(Context.context, playerObject);
      playerAttackMenu(Context.context, playerObject);
      displayEnemyHealth(Context.context, enemyObject);
      
      // Renders Enemy and Player Sprites
      playerObject.renderPlayer();
      enemyObject.renderEnemy();
      
      playerObject.basicAttackSequence(playerObject, enemyObject);
      enemyObject.basicAttackSequence(enemyObject, playerObject);
      
      if (playerObject.victory) {
        displayRewardMenu(Context.context, enemyObject, playerObject);

        if (playerObject.disableAttack) {
          playerObject.disableAttack = false;
          setTimeout(() => {
            playerObject.victory = false;
            removeCursorEventListener(playerObject, enemyObject);
            enemyObject = undefined;
            cancelAnimationFrame(animationID.animationid.id);
            battleEventOrigin(playerObject);
          }, 2500);
        }
      }

      animation.resetanimationcounter();
    }
  }

}
