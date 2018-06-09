import Context from './context/context';

/** Class representing a scene */
export default class Scene {

  /**

  * Create a map
  * @param {Array} mapArr - An array of tiles.
  * @param {Object} Player - A player object that is used to apply collision with each tile object.
  */
  constructor(mapArr, tileObj, influenceObject) {
    this.mapArr = mapArr;
    this.tileObj = tileObj;
    this.influenceObject = influenceObject;
    this.BLOCK_W = 32;
    this.BLOCK_H = 32;
  }

  /**

  * Renders a tile on the canvas element
  * @param {Object} obj - An object of sprite properies.
  * @param {Number} propertyIndex - Index of property in obj.
  * @param {Number} tilex - Coordinate of x position for tile on canvas.
  * @param {Number} tiley - Coordinate of y position for tile on canvas.

  */

  renderTile(obj, propertyIndex, tilex, tiley) {
    let objectKeys = Object.keys(obj);
    obj[objectKeys[propertyIndex]].draw(tilex, tiley);
  }

  /**
    * If a tile is a collidable tile then player movement will cancel itself out based on the side of the tile
    @param {Object} influenceObject - Object that collides with tile
    @param {Object} tileDetails - Object of tile details such as x, y, tileIndex, and tileCollisionMin

  */

  tileCollision(influenceObject, tileDetails) {

    if (tileDetails.tileIndex >= tileDetails.tileCollisionMin) {

      if (tileDetails.tiley + 20 < this.influenceObject.yCoordinates) {
        this.influenceObject.yCoordinates += 2;
        return;
      }

      if (tileDetails.tiley - 10 > this.influenceObject.yCoordinates) {
        this.influenceObject.yCoordinates -= 2;
        return;
      }

      if (tileDetails.tilex - 10 > this.influenceObject.xCoordinates) {
        this.influenceObject.xCoordinates -= 2;
        return;
      }

      if (tileDetails.tilex + 20 < this.influenceObject.xCoordinates) {
        this.influenceObject.xCoordinates += 2;
        return;
      }

    }

  }

  /**

    *Renders a scene using a map array.
    @param tileArr { Array } - An array of indexes to represent tile positions in an object

  */

  renderMap(tileCollisionMin) {
      let arrIndex = 0;

      for (let y = 0; y < 15; y++) {

          for (let x = 0; x < 20; x++, arrIndex++) {
              let tile_x = x * this.BLOCK_W;
              let tile_y = y * this.BLOCK_H;
              let tileIndex = this.mapArr[arrIndex];

              let tileDetails = {
                tilex: tile_x,
                tiley: tile_y,
                tileIndex: tileIndex,
                tileCollisionMin: tileCollisionMin
              }


              if (this.influenceObject.playerMoving &&
                this.influenceObject.xCoordinates + 20 > tile_x &&
                this.influenceObject.xCoordinates - 30 < tile_x &&
                this.influenceObject.yCoordinates + 30 > tile_y &&
                this.influenceObject.yCoordinates - 25 < tile_y) {

                  this.tileCollision(this.influenceObject, tileDetails);
              }

              this.renderTile(this.tileObj, tileIndex, tile_x, tile_y);
          }

      }

  };

  /**

    * Render a miscellaneous sprite that isn't a tile.
    @param {Object} obj - Sprite object that will be rendered using it's built in draw method.
    @param {Array} coordArr - An array of coordinates to draw mutiple sprite objects.

  */
  renderMiscellaneousSprites(obj, coordArr) {

    for (var i = 0; i < coordArr.length; i++) {
      obj.draw(coordArr[i].x, coordArr[i].y);
    }

  }



}





function drawForest() {
    /*//console.log(player_coordinates_x + "X");
    //console.log(player_coordinates_y + "Y");
        collisionDection();
        is_slimeMove = false;
        requestID = requestAnimationFrame(drawForest);
        resetAnimationCounter();
        drawMap();
        playerMovement();
        is_playerMove = false;
        playerDirection = 0;
        if (key.escape) {return;} //Access Player Menu
        checkBattle();
    //collision for battle against slime1, width and height are based off total W & H of spritesheet
        slime1_Engaged = enemyAggro(slime1_x, slime1_y, slime1_Alive, slime1_Engaged);
        slime2_Engaged = enemyAggro(slime2_x, slime2_y, slime2_Alive, slime2_Engaged);
        slime3_Engaged = enemyAggro(slime3_x, slime3_y, slime3_Alive, slime3_Engaged);
        slime4_Engaged = enemyAggro(slime4_x, slime4_y, slime4_Alive, slime4_Engaged);

        //Animated Enemies
        if (slime1_Alive) {
            slime1_x = enemyPatrol(slime1_Alive, slime1_x, slime1_y, slime1_left, slime1_right, "slime", 360, 150, false);
            if (slime1_x >= 350 && slime1_right) { slime1_right = false; slime1_left = true; }
            if (slime1_x === 160 && slime1_left) { slime1_left = false; slime1_right = true; }
        }
        if (slime2_Alive) {
            slime2_x = enemyPatrol(slime2_Alive, slime2_x, slime2_y, slime2_Left, slime2_Right, "slime", 560, 430, false);
            if (slime2_x >= 545 && slime2_Right) { slime2_Right = false; slime2_Left = true; }
            if (slime2_x === 450 && slime2_Left) { slime2_Left = false; slime2_Right = true; }
        }
        if (slime3_Alive) {
            slime3_y = enemyPatrol(slime3_Alive, slime3_x, slime3_y, slime3_Up, slime3_Down, "slime", 400, 250, true);
            if (slime3_y >= 390 && slime3_Down) { slime3_Down = false; slime3_Up = true; }
            if (slime3_y === 255 && slime3_Up) { slime3_Up = false; slime3_Down = true; }
        }
         if (slime4_Alive) {
            slime4_x = enemyPatrol(slime4_Alive, slime4_x, slime4_y, slime4_Left, slime4_Right, "slime", 460, 150, false);
            if (slime4_x >= 320 && slime4_Right) { slime4_Right = false; slime4_Left = true; }
            if (slime4_x === 155 && slime4_Left) { slime4_Left = false; slime4_Right = true; }
        }

        if (player_coordinates_x == 610 && player_coordinates_y >= 75) {
            cancelAnimationFrame(requestID);
            caveEntrance(); player_coordinates_x = 40; player_coordinates_y = 96; return;
        }*/
    };
