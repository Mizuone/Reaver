
export default class Animate {
  animationDelay: number;
  animationIndexCounter: number;
  animationCurrentFrame: number;

  constructor(animationDelay: number, animationIndexCounter: number, animationCurrentFrame: number) {
    this.animationDelay = animationDelay;
    this.animationIndexCounter = animationIndexCounter;
    this.animationCurrentFrame = animationCurrentFrame;
  }

}
