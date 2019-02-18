import battleMap from './maps/maps';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';
import terrianEntities from '../entity/terrain_entities/sprites';
import playerEntities from '../entity/character_entities/sprites';
import Context from '../engine/context/context';

import animationID from '../engine/animationframeid/animationid';
import animation from '../engine/animationcounter';

import Scene from '../engine/scene';
import Enemy from '../engine/enemy/enemy';

import { playerBattleInterface, playerAttackMenu, displayEnemyHealth } from '../ui/playerBattleInterface';
import Player from '../engine/character/player';
import Sprite from '../engine/sprite';

const spriteObj = {
  blackblock: miscellaneousEntities.blackblock,
  grass_terrain: terrianEntities.grass_terrain
}

export default class BattleScreen {

  private basicAttackSequence(influenceObject: Player | Enemy, enemyObject: Player | Enemy, options: any) {

      if (!influenceObject.battleMoveBackward &&
        influenceObject.battleMoveForward &&
        influenceObject.xCoordinates >= 280) {

        influenceObject.xCoordinates -= 2;

        if (influenceObject.xCoordinates === 280) {
          enemyObject.health -= influenceObject.damage * 2
        }
      }

      if (!influenceObject.battleMoveForward &&
        influenceObject.battleMoveBackward &&
        influenceObject.xCoordinates <= 348) {
        influenceObject.xCoordinates += 2;

        if (influenceObject.xCoordinates === 350) {
          influenceObject.battleMoveBackward = false;
          influenceObject.battleMoveForward = true;
        }
      }

      if (influenceObject.xCoordinates < 280) {
        playerEntities.playerbasicattack_sprite.draw(influenceObject.xCoordinates, influenceObject.yCoordinates, [0, 0, 0]);
        setTimeout(() => {
          influenceObject.battleMoveForward = false;
          influenceObject.battleMoveBackward = true;
        }, 150);
        console.log('this should not be happening');
      }
  }
  /**
    * Draws the battle area to the canvas
  */
  public draw(playerObject: Player, enemyObject: Enemy, battleEventOrigin: any) {
    let tileCollisionMin = 2;
    let battleScreenThis = this;

    animationID.animationid.id = requestAnimationFrame(() => {
      battleScreenThis.draw(playerObject, enemyObject, battleEventOrigin);
    });

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

    // TODO complete generic method that runs logic for player and enemy attack sequence
    if (playerObject.disableAttack) {
      const playerAttackOptions = {
        moveForwardXCoord: 350,
        moveForwardRate: 280,
        moveBackwardXCoord: 348,
        resetXCoord: 350,

      }
      this.basicAttackSequence(playerObject);
      this.basicAttackSequence(enemyObject);
    }


    animation.resetanimationcounter();
  }

}
