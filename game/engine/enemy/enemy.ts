import Sprite from '../sprite';
import computeDistance from '../computeDistanceBetweenObject';
import animationID from '../animationframeid/animationid';

import BattleScreen from '../../scenes/battlescreen';
import { NPCComposition } from '../interfaces/npc-composition';
import mapbattle from '../../scenes/maps/maps';
import { addCursorEventListener } from '../context/addcursoreventlistener';
import Player from '../character/player';
import playerEntities from '../../entity/character_entities/sprites';

/** Class representing an enemy */
export default class Enemy implements NPCComposition {
  enemySprite: Sprite;
  health: number;
  name: string;
  totalHealth: number;
  defense: number;
  damage: number;
  direction: number[];
  startX: number;
  startY: number;
  patrolled: boolean;
  xCoordinates: number;
  yCoordinates: number;
  
  // Reward Properties
  goldReward: number;
  experienceReward: number;
  // Composition Optional Properties
  patrol?: (patToX?: any, patToY?: any) => void;

  // Enemy Battle Properties
  fighting: boolean;
  battleTurn: boolean;
  battleMoveForward: boolean;
  battleMoveBackward: boolean;
  dead: boolean;

  constructor(obj: any, x: any, y: any) {
    this.enemySprite = new Sprite(obj.sprite);
    this.health = obj.health;
    this.name = obj.name;
    this.totalHealth = obj.health
    this.defense = obj.defense;
    this.damage = obj.damage;
    this.goldReward = obj.goldReward;
    this.experienceReward = obj.experienceReward
    this.direction = [0,0,0];
    this.startX = x;
    this.startY = y;
    this.patrolled = false;
    this.xCoordinates = x;
    this.yCoordinates = y;
    this.fighting = false;
    this.battleMoveForward = false;
    this.battleMoveBackward = false;
    this.battleTurn = false;
    this.dead = false;
  }

  renderEnemy() {
    this.enemySprite.image.width = 32;
    this.enemySprite.image.height = 32;
    this.enemySprite.draw(this.xCoordinates, this.yCoordinates, this.direction)
  }

  fightPlayer(playerObject: any, battleEventOrigin: any) {

    if (computeDistance(this.xCoordinates, this.yCoordinates, playerObject.xCoordinates, playerObject.yCoordinates) <= 32) {
      const battleScreen = new BattleScreen();
      cancelAnimationFrame(animationID.animationid.id);

      playerObject.fighting = true;
      playerObject.direction = [3,4,5];
      playerObject.xCoordinates = 350;
      playerObject.yCoordinates = 225;

      this.xCoordinates = 250;
      this.yCoordinates = 225;
      this.direction = [6,7,8];

      addCursorEventListener(playerObject, this);

      battleScreen.draw(playerObject, this, battleEventOrigin);

    }

  }

  basicAttackSequence(enemy: Enemy, player: Player) {
    if (enemy.battleTurn) {
      // Move Player forward on x axis
      // Once Player reaches certain point do damage to enemy
      if (!enemy.battleMoveBackward &&
        enemy.battleMoveForward &&
        enemy.xCoordinates <= 320) {

        enemy.xCoordinates += 2;

        if (enemy.xCoordinates === 320) {
          player.health -= enemy.damage * 2
        }

        // Once Player reaches enemy draw attack sprite and move backward after delay
        if (enemy.xCoordinates > 320) {
          playerEntities.playerbasicattack_sprite.draw(player.xCoordinates, player.yCoordinates, [0, 0, 0]);
          setTimeout(() => {
            enemy.battleMoveForward = false;
            enemy.battleMoveBackward = true;
          }, 150);
        }
      }

      // Move Player backward on x axis
      // Once Player reaches original point, give turn to enemy
      if (!enemy.battleMoveForward &&
        enemy.battleMoveBackward &&
        enemy.xCoordinates >= 252) {
        enemy.xCoordinates -= 2;

        if (enemy.xCoordinates === 250) {
          enemy.battleTurn = false;
          enemy.battleMoveBackward = false;
          player.disableAttack = false;
        }
      }

    }
  }

}
