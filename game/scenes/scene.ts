import Player from "../engine/character/player";
import Sprite from "../entity/sprite";
import { TileDetails } from "../engine/interfaces/tile-details";

export default class Scene {
  mapArr: any;
  tileObj: any;
  player: Player;
  BLOCK_W: number;
  BLOCK_H: number;

  constructor(mapArr: Array<any>, tileObj: any, player: Player) {
    this.mapArr = mapArr;
    this.tileObj = tileObj;
    this.player = player;
    this.BLOCK_W = 32;
    this.BLOCK_H = 32;
  }

  renderTile(obj: { [x: string]: { draw: (arg0: any, arg1: any) => void; }; }, propertyIndex: any, tilex: number, tiley: number) {
    let objectKeys = Object.keys(obj);

    obj[objectKeys[propertyIndex]].draw(tilex, tiley);
  }

  tileCollision(tileDetails: TileDetails) {

    if (tileDetails.tileIndex >= tileDetails.tileCollisionMin) {

      if (tileDetails.tileY + 20 < this.player.y) {
        this.player.y += 2;
        return;
      }

      if (tileDetails.tileY - 10 > this.player.y) {
        this.player.y -= 2;
        return;
      }

      if (tileDetails.tileX - 10 > this.player.x) {
        this.player.x -= 2;
        return;
      }

      if (tileDetails.tileX + 20 < this.player.x) {
        this.player.x += 2;
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


              if (this.player.moving &&
                this.player.x + 20 > tileX &&
                this.player.x - 30 < tileX &&
                this.player.y + 30 > tileY &&
                this.player.y - 25 < tileY) {

                  this.tileCollision(tileDetails);
              }

            this.renderTile(this.tileObj, tileIndex, tileX, tileY);
          }

      }

  };

}
