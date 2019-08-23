class Circle {
  color: string;
  context: any;
  radius: number;
  x: number;
  xVelocity: number;
  y: number;
  yVelocity: number;
  constructor(color: string, context: any, radius: number, x: number, y: number, xVelocity: number, yVelocity: number) {
    this.color = color;
    this.context = context;
    this.radius = radius;
    this.x = x;
    this.xVelocity = xVelocity;
    this.y = y;
    this.yVelocity = yVelocity;
  }

  draw(): void {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.context.strokeStyle = 'white';
    this.context.stroke();
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }
}

export default Circle;