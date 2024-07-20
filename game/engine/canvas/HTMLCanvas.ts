
export default class HTMLCanvas {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(canvasId: string, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");

    this.canvas.setAttribute('width', this.width.toString());
    this.canvas.setAttribute('height', this.height.toString());
    this.canvas.setAttribute('style', `width: ${this.width}px; height: ${this.height}px;`);
  }

}
