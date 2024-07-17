import { displayEnemyHealth, displayFallenText, displayLevelUp, displayPlayerHealth, displayRewardMenu, playerAttackMenu } from '../ui/playerBattleInterface';

import Context from '../engine/context/context';
import Enemy from '../engine/enemy/enemy';
import Limiter from '../engine/fpslimiter';
import Player from '../engine/character/player';
import { RunGame } from '../rungame';
import Scene from '../engine/scene';
import { addGameOverEventListeners } from '../engine/eventlisteners/gameover-event-listeners';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';
import battleMap from './maps/maps';
import { displayGameOver } from '../ui/gameOverInterface';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';
import { removeBattleEventListeners } from '../engine/eventlisteners/battle-event-listeners';
import terrianEntities from '../entity/terrain_entities/sprites';

const spriteObj = {
  blackblock: miscellaneousEntities.blackblock,
  grass_terrain: terrianEntities.grass_terrain
}

export default class BattleScreen {
  private readonly limiter = new Limiter(60);
  private victoryScreen: boolean = false;
  private deathScreen: boolean = false;
  private currentPlayerLevel: number = 0;

  constructor(_currentPlayerLevel: number) {
    this.currentPlayerLevel = _currentPlayerLevel;
  }

  public draw(player: Player, enemy: Enemy, battleEventOrigin: any) {
    const classThis = this;

    animationID.animationid.id = requestAnimationFrame(() => {
        classThis.draw(player, enemy, battleEventOrigin);
    });

    if (this.limiter.fpsLimiter()) {
      this.limiter.updateCurrentTime();

      let battleScene = new Scene(battleMap.mapbattle, spriteObj, player);
      battleScene.renderMap(-1);
  
      playerAttackMenu(Context.context, player);
      displayPlayerHealth(Context.context, player);
      displayEnemyHealth(Context.context, enemy);
      
      player.render();
      enemy.render();
      
      player.basicAttackSequence(player, enemy);
      enemy.basicAttackSequence(enemy, player);
      
      if (player.victory) {
        displayRewardMenu(Context.context, enemy);

        if (this.currentPlayerLevel !== player.level) {
          displayLevelUp(Context.context, player);
        }

        if (!this.victoryScreen) {
          this.victoryScreen = true;
          player.rewardFromBattle(enemy);

          setTimeout(() => {
            player.resetToDefaultState(enemy);
            removeBattleEventListeners(player, enemy);
            cancelAnimationFrame(animationID.animationid.id);
            RunGame({ player: player, locationClass: battleEventOrigin });
          }, 2000);
        }
      }

      if (player.dead) {
        displayFallenText(Context.context);

        setTimeout(() => {
          player.resetToDefaultState(enemy);
          player.keyboard.removeKeyboardEvents();
          removeBattleEventListeners(player, enemy);
          addGameOverEventListeners();
          cancelAnimationFrame(animationID.animationid.id);
          displayGameOver(Context.context);
        }, 2000);
      }

      animation.resetanimationcounter();
    }
  }

}
