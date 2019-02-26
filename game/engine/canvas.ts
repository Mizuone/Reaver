
export default class HTML {
  width: number;
  height: number;
  canvas: any;
  context: any;

  constructor(canvasId: string, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas = null;
    this.context = null;
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");

    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
    this.canvas.setAttribute('style', `width: ${this.width}px; height: ${this.height}px;`);
  }

}
