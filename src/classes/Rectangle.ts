class Rectangle {
  canvasHeight: number;
  canvasWidth: number;
  color: string;
  context: any;
  height: number;
  x: number;
  y: number;
  xVelocity: number;
  yVelocity: number;
  width: number;
  constructor(color: string, context: any, x: number, y: number, xVelocity: number, yVelocity: number, width: number, height: number, canvasWidth: number, canvasHeight: number) {
    this.x = x;
    this.y = y;
    this.xVelocity = xVelocity
    this.yVelocity = yVelocity;
    this.width = width;
    this.height = height;
    this.color = color;
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  draw() {
    this.context.beginPath()
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.stroke();
  }
}

export default Rectangle;