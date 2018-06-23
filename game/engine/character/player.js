import Sprite from '../sprite';

export default class Player {

  constructor(playerSpriteImage) {
    this.playerSprite = new Sprite(playerSpriteImage);
    this.strength = 5;
    this.stamina = 10;
    this.agility = 6;
    this.luck = 3;
    this.intelligence = 4;
    this.health = 100;
    this.maxHealth = 100;
    this.defense = 0;
    this.hitchance = 76;
    this.critchance = 5.0;
    this.direction = [0,0,0];
    this.playerhit = Math.floor(Math.random() * Math.floor(100)) <= this.hitchance ? true : false;
    this.xCoordinates = 0;
    this.yCoordinates = 340;
    this.playerMoving = false;
    this.playerFighting = false;
  }

  renderPlayer() {
    this.playerSprite.image.width = 32;
    this.playerSprite.image.height = 32;
    this.playerSprite.draw(this.xCoordinates, this.yCoordinates, this.direction);
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
