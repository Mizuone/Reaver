import { displayEnemyHealth, displayRewardMenu, playerAttackMenu, playerBattleInterface } from '../ui/playerBattleInterface';

import Context from '../engine/context/context';
import Enemy from '../engine/enemy/enemy';
import Limiter from '../engine/fpslimiter';
import Player from '../engine/character/player';
import Scene from '../engine/scene';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';
import battleMap from './maps/maps';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';
import { removeCursorEventListener } from '../engine/context/addcursoreventlistener';
import { runGame } from '../rungame';
import terrianEntities from '../entity/terrain_entities/sprites';

const spriteObj = {
  blackblock: miscellaneousEntities.blackblock,
  grass_terrain: terrianEntities.grass_terrain
}

export default class BattleScreen {
  private readonly limiter = new Limiter(60);
  private victoryScreen: boolean = false;

  public draw(playerObject: Player, enemyObject: Enemy, battleEventOrigin: any) {
    const classThis = this;

    animationID.animationid.id = requestAnimationFrame(() => {
        classThis.draw(playerObject, enemyObject, battleEventOrigin);
    });

    if (this.limiter.fpsLimiter()) {
      this.limiter.updateCurrentTime();

      let battleScene = new Scene(battleMap.mapbattle, spriteObj, playerObject);
      battleScene.renderMap(-1);
  
      playerBattleInterface(Context.context, playerObject);
      playerAttackMenu(Context.context, playerObject);
      displayEnemyHealth(Context.context, enemyObject);
      
      playerObject.renderPlayer();
      enemyObject.render();
      
      playerObject.basicAttackSequence(playerObject, enemyObject);
      enemyObject.basicAttackSequence(enemyObject, playerObject);
      
      if (playerObject.victory) {
        displayRewardMenu(Context.context, enemyObject, playerObject);
        if (!this.victoryScreen) {
          this.victoryScreen = true;

          setTimeout(() => {
            playerObject.resetPlayerBattleStatusToDefault(enemyObject);
            playerObject.playerVictoryRewardSequence(enemyObject);
            removeCursorEventListener(playerObject, enemyObject);
            cancelAnimationFrame(animationID.animationid.id);
            runGame({ playerObject: playerObject, locationClass: battleEventOrigin });
          }, 2500);
        }
      }

      animation.resetanimationcounter();
    }
  }

}
