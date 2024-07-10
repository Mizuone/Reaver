import BattleScreen from '../../scenes/battlescreen';
import { NPCComposition } from '../interfaces/npc-composition';
import Player from '../character/player';
import Sprite from '../sprite';
import { addCursorEventListener } from '../context/addcursoreventlistener';
import animationID from '../animation/animationframeid/animationid';
import computeDistance from '../computeDistanceBetweenObject';
import playerEntities from '../../entity/character_entities/sprites';

export interface CompositionParameters {
  patrol: {
    patToX: any,
    patToY: any
  }
}

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
  goldReward: number;
  experienceReward: number;
  
  // Composition Optional Properties
  patrol?: (patToX?: any, patToY?: any) => void;

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

  process(influenceObject: Player, composition: CompositionParameters) {
    if (this.health <= 0) return;
    
    this.render();
    if (this.patrol) this.patrol(composition.patrol.patToX, composition.patrol.patToY);
    
    this.fightPlayer(influenceObject, this);
  }

  render() {
    this.enemySprite.image.width = 32;
    this.enemySprite.image.height = 32;
    this.enemySprite.draw(this.xCoordinates, this.yCoordinates, this.direction);
  }

  fightPlayer(playerObject: Player, battleEventOrigin: any) {

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
      if (!enemy.battleMoveBackward &&
        enemy.battleMoveForward &&
        enemy.xCoordinates <= 320) {

        enemy.xCoordinates += 2;

        if (enemy.xCoordinates > 312) {
          playerEntities.playerbasicattack_sprite.draw(player.xCoordinates, player.yCoordinates, [0, 0, 0]);
        }

        if (enemy.xCoordinates === 320) {
          player.health -= enemy.damage * 2

          setTimeout(() => {
            enemy.battleMoveForward = false;
            enemy.battleMoveBackward = true;
          }, 150);
        }
      }

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
