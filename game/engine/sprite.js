import animation from './animationcounter';

export default class Sprite {

  constructor(filepath) {
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

  draw(x, y, various) {
    const animationImageObj = {
      x,
      y,
      various,
      sprite: this.image
    }

    animation.drawanimation(animationImageObj);

  }


}
