import Player from "./character/player";

export default class Keyboard {
  player: Player;
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  escapeToggle: number;
  keyBoardOff: boolean;
  KEY_W: string;
  KEY_A: string;
  KEY_S: string;
  KEY_D: string;
  KEY_ESCAPE: string;

  constructor(_player: Player) {
    this.player = _player;

    this.w = false;
    this.a = false;
    this.s = false;
    this.d = false;
    this.keyBoardOff = false;
    this.escapeToggle = 0;

    this.KEY_W = "w";
    this.KEY_A = "a";
    this.KEY_S = "s";
    this.KEY_D = "d";
    this.KEY_ESCAPE = "escape";
  }

  inputKeyDown(event: KeyboardEvent) {
    {
      if (this.player.dead) return;

      if (this.player.fighting) {
        this.player.moving = false;
        this.setKeysToFalse();
        return;
      }

      switch (event.key.toLowerCase()) {
        case this.KEY_W:
          this.w = true;
          this.player.moving = true;
          break;
        case this.KEY_A:
          this.a = true;
          this.player.moving = true;
          break;
        case this.KEY_S:
          this.s = true;
          this.player.moving = true;
          break;
        case this.KEY_D:
          this.d = true;
          this.player.moving = true;
          break;
        case this.KEY_ESCAPE:
          this.escapeToggle++;
          break;
        default:
          break;
      }

    }
  }

  inputKeyUp(event: KeyboardEvent) {
    if (this.player.dead) return;

    if (this.player.fighting) {
      this.player.moving = false;
      this.setKeysToFalse();
      return;
    }

    switch (event.key) {
      case this.KEY_W:
        this.w = false;
        this.player.direction = [9];
        break;
      case this.KEY_A:
        this.a = false;
        this.player.direction = [3];
        break;
      case this.KEY_S:
        this.s = false;
        this.player.direction = [0];
        break;
      case this.KEY_D:
        this.d = false;
        this.player.direction = [6];
        break;
      case this.KEY_ESCAPE:
        break;
      default:
        break;
    }

    if (!this.KEY_W && !this.KEY_A && !this.KEY_S && !this.KEY_D) {
      this.player.moving = false;
    }
  }

  removeKeyboardEvents() {
    window.removeEventListener('keydown', (event: KeyboardEvent) => this.inputKeyDown(event));
    window.removeEventListener('keyup', (event: KeyboardEvent) => this.inputKeyUp(event));
  }

  intializeKeyBoardEvents() {
    window.addEventListener('keydown', (event: KeyboardEvent) => this.inputKeyDown(event));
    window.addEventListener('keyup', (event: KeyboardEvent) => this.inputKeyUp(event));
  }

  keyboardPlayerMovement() {
    if (this.player.dead) return;

    if (this.player.fighting) {
      this.player.moving = false;
      this.setKeysToFalse();
      return;
    }

    if (this.w) {
      this.player.yCoordinates -= 2;
      this.player.direction = [9,10,11];
    }
    if (this.a) {
      this.player.xCoordinates -= 2;
      this.player.direction = [3,4,5];
    }
    if (this.s) {
      this.player.yCoordinates += 2;
      this.player.direction = [0,1,2];
    }
    if (this.d) {
      this.player.xCoordinates += 2;
      this.player.direction = [6,7,8];
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
