import Sprite from '../sprite';
import computeDistance from '../computeDistanceBetweenObject';
import animationID from '../animationframeid/animationid';

import BattleScreen from '../../scenes/battlescreen';
import { NPCComposition } from '../interfaces/npc-composition';
import mapbattle from '../../scenes/maps/maps';
import { addCursorEventListener } from '../context/addcursoreventlistener';

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
  patrol?: (patToX?: any, patToY?: any) => void;

  // Enemy Battle Properties
  fighting: boolean;
  battleMoveForward: boolean;
  battleMoveBackward: boolean;
  disableAttack: boolean;

  constructor(obj: any, x: any, y: any) {
    this.enemySprite = new Sprite(obj.sprite);
    this.health = obj.health;
    this.name = obj.name;
    this.totalHealth = obj.health
    this.defense = obj.defense;
    this.damage = obj.damage;
    this.direction = [0,0,0];
    this.startX = x;
    this.startY = y;
    this.patrolled = false;
    this.xCoordinates = x;
    this.yCoordinates = y;
    this.fighting = false;
    this.battleMoveForward = false;
    this.battleMoveBackward = false;
    this.disableAttack = false;
  }

  renderEnemy() {
    this.enemySprite.image.width = 32;
    this.enemySprite.image.height = 32;
    this.enemySprite.draw(this.xCoordinates, this.yCoordinates, this.direction)
  }

  fightPlayer(playerObject: any, battleEventOrigin: any) {

    if (computeDistance(this.xCoordinates, this.yCoordinates, playerObject.xCoordinates, playerObject.yCoordinates) <= 32) {
      const battleScreen = new BattleScreen();
      cancelAnimationFrame(animationID.animationid.id)

      playerObject.playerFighting = true;
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

}