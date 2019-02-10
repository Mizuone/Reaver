import animation from './animationcounter';
import Context from './context/context';

export default class Sprite {
  image: any;
  filepath: string;
  TO_RADIANS: number;
  is_pattern: boolean;
  pattern: any;
  pattern_x_times: number;
  load: (filename: any) => any;
  to_pattern: (x_times: any) => void;
  spritesheet: any;

  constructor(filepath: string) {
    this.filepath = filepath;

    this.TO_RADIANS = Math.PI/180;
    this.image = null;

    this.is_pattern = false;
    this.pattern = null;
    this.pattern_x_times = 0;
    this.load = function(filename) { this.image = new Image(); this.image.src = filename; return this; };
    this.to_pattern = function(x_times) { this.pattern_x_times = x_times; this.pattern = Context.context.createPattern(this.image, 'repeat'); this.is_pattern = true; };


    this.spritesheet = null;

    if (this.filepath) {
      this.load(this.filepath);
    } else {
      console.log(`Unable to load sprite. Filename ${filepath} is not defined`);
    }

  }

  draw(x: any, y: any, various?: any) {
    const animationImageObj = {
      x,
      y,
      various,
      sprite: this.image
    }

    animation.drawanimation(animationImageObj);

  }


}
