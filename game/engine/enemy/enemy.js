import Sprite from '../sprite';
import computeDistance from '../computeDistanceBetweenObject';

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

  fightPlayer(playerObject) {

    if (computeDistance(this.xCoordinates, this.yCoordinates, playerObject.xCoordinates, playerObject.yCoordinates) <= 32) {
      // TODO initlaize battle event
    }

  }

}
