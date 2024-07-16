import Player from "./character/player";
import Sprite from "./sprite";
import { TileDetails } from "./dtos/tile-details";

export default class Scene {
  mapArr: any;
  tileObj: any;
  influenceObject: Player;
  BLOCK_W: number;
  BLOCK_H: number;

  constructor(mapArr: Array<any>, tileObj: any, influenceObject: Player) {
    this.mapArr = mapArr;
    this.tileObj = tileObj;
    this.influenceObject = influenceObject;
    this.BLOCK_W = 32;
    this.BLOCK_H = 32;
  }

  renderTile(obj: { [x: string]: { draw: (arg0: any, arg1: any) => void; }; }, propertyIndex: any, tilex: number, tiley: number) {
    let objectKeys = Object.keys(obj);

    obj[objectKeys[propertyIndex]].draw(tilex, tiley);
  }

  tileCollision(tileDetails: TileDetails) {

    if (tileDetails.tileIndex >= tileDetails.tileCollisionMin) {

      if (tileDetails.tileY + 20 < this.influenceObject.yCoordinates) {
        this.influenceObject.yCoordinates += 2;
        return;
      }

      if (tileDetails.tileY - 10 > this.influenceObject.yCoordinates) {
        this.influenceObject.yCoordinates -= 2;
        return;
      }

      if (tileDetails.tileX - 10 > this.influenceObject.xCoordinates) {
        this.influenceObject.xCoordinates -= 2;
        return;
      }

      if (tileDetails.tileX + 20 < this.influenceObject.xCoordinates) {
        this.influenceObject.xCoordinates += 2;
        return;
      }

    }

  }

  renderMap(tileCollisionMin: number) {
      let arrIndex = 0;

      for (let y = 0; y < 15; y++) {

          for (let x = 0; x < 20; x++, arrIndex++) {
              let tileX = x * this.BLOCK_W;
              let tileY = y * this.BLOCK_H;
              let tileIndex = this.mapArr[arrIndex];


              let tileDetails: TileDetails = {
                tileX,
                tileY,
                tileIndex: tileIndex,
                tileCollisionMin: tileCollisionMin
              }


              if (this.influenceObject.playerMoving &&
                this.influenceObject.xCoordinates + 20 > tileX &&
                this.influenceObject.xCoordinates - 30 < tileX &&
                this.influenceObject.yCoordinates + 30 > tileY &&
                this.influenceObject.yCoordinates - 25 < tileY) {

                  this.tileCollision(tileDetails);
              }

            this.renderTile(this.tileObj, tileIndex, tileX, tileY);
          }

      }

  };

  renderMiscellaneousSprites(obj: Sprite, coordArr: any) {

    for (var i = 0; i < coordArr.length; i++) {
      obj.draw(coordArr[i].x, coordArr[i].y);
    }

  }



}
