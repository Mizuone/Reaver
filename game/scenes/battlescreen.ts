import { displayEnemyHealth, displayFallenText, displayLevelUp, displayPlayerHealth, displayRewardMenu, playerAttackMenu } from '../ui/playerBattleInterface';

import { BattleEventManager } from '../engine/eventlisteners/battleEventManager';
import { BuiltGameScene } from '../engine/interfaces/built-game-scene';
import Enemy from '../engine/enemy/enemy';
import GameCanvas from '../engine/canvas/game-canvas';
import Limiter from '../engine/fpslimiter';
import Player from '../engine/character/player';
import { RunGame } from '../rungame';
import Scene from './scene';
import { addGameOverEventListeners } from '../engine/eventlisteners/gameover-event-listeners';
import animationID from '../engine/animation/animationframeid/animationid';
import { displayBeatGame } from '../ui/beatGameInterface';
import { displayGameOver } from '../ui/gameOverInterface';
import { mapBattle } from './maps/misc_maps';
import { resetAnimationCounter } from '../engine/animation/animationcounter';

export default class BattleScreen {
  private readonly limiter = new Limiter(60);
  private victoryScreen: boolean = false;
  private deathScreen: boolean = false;
  private currentPlayerLevel: number = 0;
  private battleEventManager: BattleEventManager;

  constructor(_currentPlayerLevel: number, _battleEventManager: BattleEventManager) {
    this.currentPlayerLevel = _currentPlayerLevel;
    this.battleEventManager = _battleEventManager;

    this.battleEventManager.addBattleEventListeners();
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
  
      playerAttackMenu(GameCanvas.context, player);
      displayPlayerHealth(GameCanvas.context, player);
      displayEnemyHealth(GameCanvas.context, enemy);
      
      player.render();
      enemy.render();
      
      player.basicAttackSequence(player, enemy);
      enemy.basicAttackSequence(enemy, player);
      
      if (player.victory) {
        this.playerDefeatedEnemy(player, enemy, gameSceneOrigin);
      }

      if (player.dead) {
        this.playerDiedInBattle(player);
      }

      resetAnimationCounter();
    }
  }

  private playerDefeatedEnemy(player: Player, enemy: Enemy, sceneOrigin: BuiltGameScene): void {
    displayRewardMenu(GameCanvas.context, enemy);

    if (this.currentPlayerLevel !== player.level) {
      displayLevelUp(GameCanvas.context, player);
    }

    if (!this.victoryScreen) {
      this.victoryScreen = true;
      player.rewardFromBattle(enemy);

      setTimeout(() => {
        this.stopBattleEvent();

        if (enemy.endGame) {
          player.keyboard.removeKeyboardEvents();
          addGameOverEventListeners();
          displayBeatGame(GameCanvas.context);
        } else {
          player.resetToDefaultState(enemy);
          RunGame({ player: player, gameScene: sceneOrigin });
        }
      }, 2000);
    }
  }

  private playerDiedInBattle(player: Player): void {
    displayFallenText(GameCanvas.context);

    if (!this.deathScreen) {
      this.deathScreen = true;

      setTimeout(() => {
        player.keyboard.removeKeyboardEvents();
        this.stopBattleEvent();
        addGameOverEventListeners();
        displayGameOver(GameCanvas.context);
      }, 2000);
    }
  }

  private stopBattleEvent() {
    this.battleEventManager.removeBattleEventListeners();
    cancelAnimationFrame(animationID.animationid.id);
  }

}
