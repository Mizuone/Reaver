import { BattleEventManager } from '../eventlisteners/battleEventManager';
import BattleScreen from '../../scenes/battlescreen';
import { BuiltGameScene } from '../interfaces/built-game-scene';
import { NPCComposition } from '../interfaces/npc-composition';
import Player from '../character/player';
import Sprite from '../../entity/sprite';
import animationID from '../animation/animationframeid/animationid';
import { computeDistanceBetweenEntities } from '../helpers/helpers';
import playerSprites from '../../entity/character_entities/character_sprites';

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
  aggroX: number;
  aggroY: number;
  patrolled: boolean;
  x: number;
  y: number;
  goldReward: number;
  experienceReward: number;
  
  // Composition Optional Properties
  patrol?: (patToX?: any, patToY?: any) => void;

  endGame?: boolean;

  fighting: boolean;
  battleTurn: boolean;
  battleMoveForward: boolean;
  battleMoveBackward: boolean;
  dead: boolean;

  constructor(obj: any, _x: number, _y: number) {
    this.enemySprite = new Sprite(obj.sprite);
    this.health = obj.health;
    this.name = obj.name;
    this.totalHealth = obj.health
    this.defense = obj.defense;
    this.damage = obj.damage;
    this.goldReward = obj.goldReward;
    this.experienceReward = obj.experienceReward
    this.direction = [1, 1, 2];
    this.startX = _x;
    this.startY = _y;
    this.patrolled = false;
    this.x = _x;
    this.y = _y;
    this.fighting = false;
    this.battleMoveForward = false;
    this.battleMoveBackward = false;
    this.battleTurn = false;
    this.dead = false;
  }

  process(player: Player, scene: any, composition?: CompositionParameters) {
    if (this.dead) return;
    
    this.render();

    if (this.patrol) this.patrol(composition.patrol.patToX, composition.patrol.patToY);
    
    this.fightPlayer(player, scene);
  }

  render() {
    this.enemySprite.image.width = 32;
    this.enemySprite.image.height = 32;
    this.enemySprite.draw(this.x, this.y, this.direction);
  }

  fightPlayer(player: Player, battleEventOrigin: BuiltGameScene) {

    if (computeDistanceBetweenEntities(this.x, this.y, player.x, player.y) <= 32) {
      const battleEventManager = new BattleEventManager(player, this);
      const battleScreen = new BattleScreen(player.level, battleEventManager);

      cancelAnimationFrame(animationID.animationid.id);

      player.fighting = true;
      player.direction = [3,4,5];
      player.x = 350;
      player.y = 225;

      this.aggroX = this.x;
      this.aggroY = this.y;
      this.x = 250;
      this.y = 225;
      this.direction = [6,7,8];

      battleScreen.draw(player, this, battleEventOrigin);

    }

  }

  basicAttackSequence(enemy: Enemy, player: Player) {
    if (enemy.battleTurn && !player.dead) {
      if (!enemy.battleMoveBackward &&
        enemy.battleMoveForward &&
        enemy.x <= 320) {

        enemy.x += 2;

        if (enemy.x > 312) {
          playerSprites.basicAttackSprite.draw(player.x, player.y, [0, 0, 0]);
        }

        if (enemy.x === 320) {
          player.health = Math.max(player.health - (enemy.damage * 2), 0);

          setTimeout(() => {
            enemy.battleMoveForward = false;
            enemy.battleMoveBackward = true;
          }, 150);

          if (player.health <= 0) {
            player.dead = true;
            player.direction = [0, 0, 0];
            return;
          }
        }
      }

      if (!enemy.battleMoveForward &&
        enemy.battleMoveBackward &&
        enemy.x >= 252) {
        enemy.x -= 2;

        if (enemy.x === 250) {
          enemy.battleTurn = false;
          enemy.battleMoveBackward = false;
          player.disableAttack = false;
        }
      }

    }
  }

}
