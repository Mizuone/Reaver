
export default class Animate {
  delay: number;
  indexCounter: number;
  currentFrame: number;

  constructor(_delay: number, _indexCounter: number, _currentFrame: number) {
    this.delay = _delay;
    this.indexCounter = _indexCounter;
    this.currentFrame = _currentFrame;
  }

}
