export default class Limiter {

  constructor(fps) {
      this.fps = fps;
      this.now;
      this.currentTime = Date.now();
      this.interval = 1000 / this.fps;
      this.delta;
  }

  fpsLimiter() {
    this.now = Date.now();
    this.delta = this.now - this.currentTime;

    return this.delta > this.interval;
  }

  updateCurrentTime() {
    this.currentTime = this.now - (this.delta % this.interval);
  }

}
