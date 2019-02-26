import Sprite from '../sprite';
import Enemy from '../enemy/enemy';
import playerEntities from '../../entity/character_entities/sprites';
import Keyboard from '../keyboard';
import { PlayerMenu } from '../../ui/playerMenu';
import Context from '../context/context';
import { playerLevelArray } from './playerlevelarray';


export default class Player {
  playerSprite: Sprite;
  damage: number;
  level: number;
  strength: number;
  stamina: number;
  agility: number;
  luck: number;
  intelligence: number;
  health: number;
  maxHealth: number;
  defense: number;
  hitchance: number;
  critchance: number;
  direction: number[];
  playerhit: boolean;
  xCoordinates: number;
  yCoordinates: number;
  playerMoving: boolean;
  gold: number;
  experience: number;
  // Player Battle Screen Properties
  fighting: boolean;
  disableAttack: boolean;
  battleTurn: boolean;
  battleMoveForward: boolean;
  battleMoveBackward: boolean;
  victory: boolean;

  // Player Keyboard Properties
  keyboard: Keyboard;

  constructor(playerSpriteImage: string) {
    this.playerSprite = new Sprite(playerSpriteImage);
    this.strength = 5;
    this.stamina = 10;
    this.agility = 6;
    this.luck = 3;
    this.intelligence = 4;
    this.health = 100;
    this.maxHealth = 100;
    this.defense = 0;
    this.level = 1;
    this.hitchance = 76;
    this.critchance = 5.0;
    this.direction = [0,0,0];
    this.playerhit = Math.floor(Math.random() * Math.floor(100)) <= this.hitchance ? true : false;
    this.xCoordinates = 30;
    this.yCoordinates = 90;
    this.damage = this.strength * 4;
    this.playerMoving = false;
    this.gold = 0;
    this.experience = 0;
    // Player Battle Screen Properties
    this.fighting = false;
    this.battleTurn = false;
    this.battleMoveForward = false;
    this.battleMoveBackward = false;
    this.disableAttack = false;
    this.victory = false;
    // Player Keyboard Properties
    this.keyboard = new Keyboard(this);
  }
  playerVictoryRewardSequence(enemyObject: Enemy) {
    this.gold += enemyObject.goldReward;
    this.experience += enemyObject.experienceReward;

    this.levelPlayer();
  }
  levelPlayer() {
    let playerNewLevel: number = 1;

    for (let i = 0; i < playerLevelArray.length; i++) {
      if (this.experience >= playerLevelArray[i]) {
        playerNewLevel++;
      } else {
        break;
      }
    }

    if (playerNewLevel > this.level) {
      this.level = playerNewLevel;
      this.levelUpPlayerStats();
      this.levelUpHealPlayer();
    }
  }
  levelUpHealPlayer() {
    this.health = this.maxHealth;
  }
  levelUpPlayerStats() {
    this.maxHealth += 50 + Math.ceil(this.stamina * 0.3);
    this.strength += Math.ceil(Math.random() * (4 * 1));
    this.stamina += Math.ceil(Math.random() * (4 * 1));
    this.agility += Math.ceil(Math.random() * (4 * 1));
    this.intelligence += Math.ceil(Math.random() * (4 * 1));
    this.luck += Math.ceil(Math.random() * (2 * 1));
    this.damage += Math.ceil(Math.random() * (4 * 1));
  }

  setPlayerCoordinates(xCoordinates: number, yCoordinates: number) {
    this.xCoordinates = xCoordinates;
    this.yCoordinates = yCoordinates;
  }

  renderPlayer() {
    this.playerSprite.image.width = 32;
    this.playerSprite.image.height = 32;
    this.playerSprite.draw(this.xCoordinates, this.yCoordinates, this.direction);
  }
  displayPlayerMenu() {
    PlayerMenu(Context.context, this);
  } 

  basicAttackSequence(player: Player, enemy: Enemy) {
    if (player.battleTurn) {
      // Move Player forward on x axis
      // Once Player reaches certain point do damage to enemy
      if (!player.battleMoveBackward &&
        player.battleMoveForward &&
        player.xCoordinates >= 280) {

        player.xCoordinates -= 2;

        if (player.xCoordinates < 288) {
          playerEntities.playerbasicattack_sprite.draw(enemy.xCoordinates, enemy.yCoordinates, [0, 0, 0]);
        }

        if (player.xCoordinates === 280) {
          setTimeout(() => {
            player.battleMoveForward = false;
            player.battleMoveBackward = true;
          }, 150);

          enemy.health -= player.damage < enemy.health ? player.damage : enemy.health;

          if (enemy.health <= 0) {
            enemy.direction = [0,0,0];
            player.battleTurn = false;
            player.battleMoveForward = false;
            player.victory = true;
            return;
          }
        }
      }

      // Move Player backward on x axis
      // Once Player reaches original point, give turn to enemy
      if (!player.battleMoveForward &&
        player.battleMoveBackward &&
        player.xCoordinates <= 348) {
        player.xCoordinates += 2;

        if (player.xCoordinates === 350) {
          player.battleTurn = false;
          player.battleMoveBackward = false;
          enemy.battleTurn = true;
          enemy.battleMoveForward = true;
        }
      }

    }
  }

  resetPlayerBattleStatusToDefault(enemyObject: Enemy) {
    this.victory = false;
    this.disableAttack = false;
    this.xCoordinates = enemyObject.startX;
    this.yCoordinates = enemyObject.startY;
    this.fighting = false;
    this.direction = [0, 0, 0];
    this.battleMoveBackward = false;
  }

}

/*Reaver.Player = function() {


//Player x_y coordinates for positioning
this.player_startX = null;
this.player_startY = null;
this.playerAttack_x = null;
this.playerAttack_y = null;

//Player Boolean Values for movement checks, and if player is in combat
this.is_playermove = false;
this.playerHit = false;
this.player_moveRight = false;
this.player_moveLeft = false;
this.attackShow = true;


};*/
