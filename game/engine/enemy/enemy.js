import Sprite from '../sprite';
import computeDistance from '../computeDistanceBetweenObject';
import animationID from '../animationframeid/animationid';

import BattleScreen from '../../scenes/battlescreen';
import mapbattle from '../../scenes/maps/maps';

/** Class representing an enemy */

export default class Enemy {

  constructor(obj, x, y) {
    this.enemySprite = new Sprite(obj.sprite);
    this.health = obj.health;
    this.defense = obj.defense;
    this.damage = obj.damage;
    this.direction = [0,0,0];
    this.startX = x;
    this.startY = y;
    this.patrolled = false;
    this.xCoordinates = x;
    this.yCoordinates = y;
  }

  renderEnemy() {
    this.enemySprite.image.width = 32;
    this.enemySprite.image.height = 32;
    this.enemySprite.draw(this.xCoordinates, this.yCoordinates, this.direction)
  }

  fightPlayer(playerObject, battleEventOrigin) {

    if (computeDistance(this.xCoordinates, this.yCoordinates, playerObject.xCoordinates, playerObject.yCoordinates) <= 32) {
      const battleScreen = new BattleScreen();
      cancelAnimationFrame(animationID.animationid.id)

      playerObject.playerFighting = true;
      playerObject.xCoordinates = 350;
      playerObject.yCoordinates = 225;
      playerObject.direction = [3,4,5];

      this.xCoordinates = 250;
      this.yCoordinates = 225;
      this.direction = [6,7,8];


      battleScreen.draw(playerObject, this, battleEventOrigin);

    }

  }

}
