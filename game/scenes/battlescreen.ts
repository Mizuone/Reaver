import { displayEnemyHealth, displayFallenText, displayLevelUp, displayPlayerHealth, displayRewardMenu, playerAttackMenu } from '../ui/playerBattleInterface';

import { BuiltGameScene } from '../engine/interfaces/built-game-scene';
import Context from '../engine/canvas/game-canvas';
import Enemy from '../engine/enemy/enemy';
import Limiter from '../engine/fpslimiter';
import Player from '../engine/character/player';
import { RunGame } from '../rungame';
import Scene from './scene';
import { addGameOverEventListeners } from '../engine/eventlisteners/gameover-event-listeners';
import animationID from '../engine/animation/animationframeid/animationid';
import { displayBeatGame } from '../ui/beatGameInterface';
import { displayGameOver } from '../ui/gameOverInterface';
import { mapBattle } from './maps/misc_maps';
import { removeBattleEventListeners } from '../engine/eventlisteners/battle-event-listeners';
import { resetAnimationCounter } from '../engine/animation/animationcounter';

export default class BattleScreen {
  private readonly limiter = new Limiter(60);
  private victoryScreen: boolean = false;
  private deathScreen: boolean = false;
  private currentPlayerLevel: number = 0;

  constructor(_currentPlayerLevel: number) {
    this.currentPlayerLevel = _currentPlayerLevel;
  }

  public draw(player: Player, enemy: Enemy, gameSceneOrigin: BuiltGameScene) {
    const classThis = this;

    animationID.animationid.id = requestAnimationFrame(() => {
        classThis.draw(player, enemy, gameSceneOrigin);
    });

    if (this.limiter.fpsLimiter()) {
      this.limiter.updateCurrentTime();

      let battleScene = new Scene(mapBattle, gameSceneOrigin.battleMapSprites, player);
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
            this.stopBattleEvent(player, enemy);

            if (enemy.endGame) {
              player.keyboard.removeKeyboardEvents();
              addGameOverEventListeners();
              displayBeatGame(Context.context);
            } else {
              player.resetToDefaultState(enemy);
              RunGame({ player: player, gameScene: gameSceneOrigin });
            }

          }, 2000);
        }
      }

      if (player.dead) {
        displayFallenText(Context.context);

        if (!this.deathScreen) {
          this.deathScreen = true;
        
          setTimeout(() => {
            player.keyboard.removeKeyboardEvents();
            this.stopBattleEvent(player, enemy);
            addGameOverEventListeners();
            displayGameOver(Context.context);
          }, 2000);
        }
      }

      resetAnimationCounter();
    }
  }

  private stopBattleEvent(player: Player, enemy: Enemy) {
    removeBattleEventListeners(player, enemy);
    cancelAnimationFrame(animationID.animationid.id);
  }

}
