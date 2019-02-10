/** Class representing a scene */
export default class Scene {
  mapArr: any;
  tileObj: any;
  influenceObject: any;
  BLOCK_W: number;
  BLOCK_H: number;

  /**

  * Create a map
  * @param {Array} mapArr - An array of tiles.
  * @param {Object} Player - A player object that is used to apply collision with each tile object.
  */
  constructor(mapArr: Array<any>, tileObj: any, influenceObject: any) {
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

  renderTile(obj: { [x: string]: { draw: (arg0: any, arg1: any) => void; }; }, propertyIndex: any, tilex: number, tiley: number) {
    let objectKeys = Object.keys(obj);
    obj[objectKeys[propertyIndex]].draw(tilex, tiley);
  }

  /**
    * If a tile is a collidable tile then player movement will cancel itself out based on the side of the tile
    @param {Object} influenceObject - Object that collides with tile
    @param {Object} tileDetails - Object of tile details such as x, y, tileIndex, and tileCollisionMin

  */

  tileCollision(influenceObject: any, tileDetails: { tilex: any; tiley: any; tileIndex: any; tileCollisionMin: any; }) {

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

  renderMap(tileCollisionMin: number) {
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
  renderMiscellaneousSprites(obj: import("../../../../../../../Users/kyle/desktop/Projects/Reaver/game/engine/sprite").default, coordArr: any) {

    for (var i = 0; i < coordArr.length; i++) {
      obj.draw(coordArr[i].x, coordArr[i].y);
    }

  }



}
