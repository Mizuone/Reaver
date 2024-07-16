import Context from '../context/context';
import Enemy from '../enemy/enemy';
import Keyboard from '../keyboard';
import { PlayerPauseMenu } from '../../ui/playerPauseMenu';
import Sprite from '../sprite';
import playerEntities from '../../entity/character_entities/sprites';
import { playerLevelDictionary } from './playerleveldictionary';

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
  fighting: boolean;
  disableAttack: boolean;
  battleTurn: boolean;
  battleMoveForward: boolean;
  battleMoveBackward: boolean;
  victory: boolean;
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
    this.critchance = Math.ceil(12 + (this.agility / 10));
    this.direction = [0,0,0];
    this.xCoordinates = 30;
    this.yCoordinates = 90;
    this.damage = this.strength * 2;
    this.playerMoving = false;
    this.gold = 0;
    this.experience = 0;
    this.fighting = false;
    this.battleTurn = false;
    this.battleMoveForward = false;
    this.battleMoveBackward = false;
    this.disableAttack = false;
    this.victory = false;
    this.keyboard = new Keyboard(this);
  }

  render() {
    this.playerSprite.image.width = 32;
    this.playerSprite.image.height = 32;
    this.playerSprite.draw(this.xCoordinates, this.yCoordinates, this.direction);
  }

  rewardFromBattle(enemyObject: Enemy) {
    this.gold += enemyObject.goldReward;
    this.processNewExperience(enemyObject.experienceReward);
  }

  processNewExperience(xp: number) {
    this.experience += xp;

    if (this.canPlayerLevel()) {
      this.levelPlayer();
    }
  }
  
  canPlayerLevel(): boolean {
    if (Object.keys(playerLevelDictionary).length === this.level) return false;

    var nextLevelExperience: number = playerLevelDictionary[this.level + 1].xp;

    if (this.experience >= nextLevelExperience) {
      return true;
    }
    
    return false;
  }

  getNextPlayerLevelExperience(): string {
    if (Object.keys(playerLevelDictionary).length === this.level) return 'Reached Max Level';

    return (playerLevelDictionary[this.level + 1].xp - this.experience).toString();
  }

  levelPlayer() {
    this.level++;

    this.processNewLevel();
  }

  processNewLevel() {
    this.levelUpStats();
    
    this.health = this.maxHealth;
  }

  levelUpStats() {
    this.strength += Math.ceil(Math.random() * 2);;
    this.damage = this.strength * 2;

    this.stamina += Math.ceil(Math.random() * 2);
    this.maxHealth += 25 + Math.ceil(this.stamina * 0.3);
    
    this.agility += Math.ceil(Math.random() * 2);
    this.critchance = Math.ceil(12 + (this.agility / 10));
    
    this.intelligence += Math.ceil(Math.random() * 2);
    this.luck += Math.ceil(Math.random() * 2);
  }

  setPlayerCoordinates(xCoordinates: number, yCoordinates: number) {
    this.xCoordinates = xCoordinates;
    this.yCoordinates = yCoordinates;
  }
  
  displayPlayerMenu() {
    PlayerPauseMenu(Context.context, this);
  } 

  basicAttackSequence(player: Player, enemy: Enemy) {
    if (player.battleTurn) {
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

          let playerDamage = Math.random() * 100 < player.critchance ? this.damage * 2 : this.damage;

          enemy.health -= playerDamage < enemy.health ? playerDamage : enemy.health;

          if (enemy.health <= 0) {
            enemy.direction = [0,0,0];
            player.battleTurn = false;
            player.battleMoveForward = false;
            player.victory = true;
            return;
          }
        }
      }

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

  resetToDefaultState(enemyObject: Enemy) {
    this.victory = false;
    this.disableAttack = false;
    this.xCoordinates = enemyObject.aggroX;
    this.yCoordinates = enemyObject.aggroY;
    this.fighting = false;
    this.direction = [0, 0, 0];
    this.battleMoveBackward = false;
  }

}
