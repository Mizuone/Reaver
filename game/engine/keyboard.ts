import Player from "./character/player";
import { PlayerMenu } from "../ui/playerMenu";

export default class Keyboard {
  influenceObject: import("c:/Users/kyle/desktop/Projects/Reaver/game/engine/character/player").default;
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  escapeToggle: number;
  keyBoardOff: boolean;
  KEY_W: number;
  KEY_A: number;
  KEY_S: number;
  KEY_D: number;
  KEY_ESCAPE: number;

  constructor(influenceObject: Player) {
    this.influenceObject = influenceObject;

    this.w = false;
    this.a = false;
    this.s = false;
    this.d = false;
    this.keyBoardOff = false;
    this.escapeToggle = 0;

    this.KEY_W = 87;
    this.KEY_A = 65;
    this.KEY_S = 83;
    this.KEY_D = 68;
    this.KEY_ESCAPE = 27;
  }

  intializeKeyBoardEvents() {

    window.addEventListener('keydown', (event) => {

      if (this.influenceObject.fighting) {
        this.influenceObject.playerMoving = false;
        this.setKeysToFalse();
        return;
      }

      switch (event.keyCode) {
        case this.KEY_W:
            this.w = true;
            this.influenceObject.playerMoving = true;
            break;
        case this.KEY_A:
            this.a = true;
            this.influenceObject.playerMoving = true;
            break;
        case this.KEY_S:
            this.s = true;
            this.influenceObject.playerMoving = true;
            break;
        case this.KEY_D:
            this.d = true;
            this.influenceObject.playerMoving = true;
            break;
        case this.KEY_ESCAPE:
            this.escapeToggle++;
            break;
        default:
          break;
      }

    });

    window.addEventListener('keyup', (event) => {

      if (this.influenceObject.fighting) {
        this.influenceObject.playerMoving = false;
        this.setKeysToFalse();
        return;
      }

      switch (event.keyCode) {
        case this.KEY_W:
            this.w = false;
            this.influenceObject.direction = [9];
            break;
        case this.KEY_A:
            this.a = false;
            this.influenceObject.direction = [3];
            break;
        case this.KEY_S:
            this.s = false;
            this.influenceObject.direction = [0];
            break;
        case this.KEY_D:
            this.d = false;
            this.influenceObject.direction = [6];
            break;
        case this.KEY_ESCAPE:
            break;
        default:
          break;
      }

      /**
        Aids collision detection, checks to see if movement keys are activated.
        Collision detection is only enabled if this.influenceObject.playerMoving equals true.
      */
      if (!this.KEY_W && !this.KEY_A && !this.KEY_S && !this.KEY_D) {
        this.influenceObject.playerMoving = false;
      }

    });

  }

  keyboardPlayerMovement() {
    if (this.influenceObject.fighting) {
      this.influenceObject.playerMoving = false;
      this.setKeysToFalse();
      return;
    }

    if (this.w) {
      this.influenceObject.yCoordinates -= 2;
      this.influenceObject.direction = [9,10,11];
    }
    if (this.a) {
      this.influenceObject.xCoordinates -= 2;
      this.influenceObject.direction = [3,4,5];
    }
    if (this.s) {
      this.influenceObject.yCoordinates += 2;
      this.influenceObject.direction = [0,1,2];
    }
    if (this.d) {
      this.influenceObject.xCoordinates += 2;
      this.influenceObject.direction = [6,7,8];
    }

  }

  checkToDisplayUserMenu(playerObject: Player) {
    playerObject.displayPlayerMenu();
    
    if (this.escapeToggle === 2) {
      this.escapeToggle = 0;
    }
  }

  setKeysToFalse() {
    this.w = false;
    this.a = false;
    this.s = false;
    this.d = false;
  }

}
