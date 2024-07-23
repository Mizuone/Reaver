import GameCanvas from '../engine/canvas/game-canvas';
import { SpriteDetails } from '../engine/interfaces/sprite-details';
import { drawAnimation } from '../engine/animation/animationcounter';

export default class Sprite {
  image: HTMLImageElement;
  filepath: string;
  TO_RADIANS: number;
  is_pattern: boolean;
  pattern: CanvasPattern | null;
  pattern_x_times: number;
  load: (filename: any) => any;
  to_pattern: (x_times: any) => void;
  spritesheet: any;

  constructor(filepath: string) {
    this.filepath = filepath;

    this.TO_RADIANS = Math.PI / 180;
    this.image = null;

    this.is_pattern = false;
    this.pattern = null;
    this.pattern_x_times = 0;
    this.load = function(filename) { 
      this.image = new Image();
      this.image.src = filename; return this; 
    };

    this.to_pattern = function(x_times) { 
      this.pattern_x_times = x_times;
      this.pattern = GameCanvas.context.createPattern(this.image, 'repeat');
      this.is_pattern = true; 
    };

    this.spritesheet = null;

    if (this.filepath) {
      this.load(this.filepath);
    } else {
      console.log(`Unable to load sprite. Filename ${filepath} is not defined`);
    }

  }

  draw(x: number, y: number, various?: number[]) {
    const animationImageObj: SpriteDetails = {
      x,
      y,
      spriteSheet: various,
      sprite: this.image
    }

    drawAnimation(animationImageObj);

  }


}
