import Point from "../interfaces/Point";
import Velocity from "../interfaces/Velocity";

class Circle {
  color: string;
  context: any;
  radius: number;
  point: Point;
  velocity: Velocity;
  constructor(color: string, context: any, radius: number, point: Point, velocity: Velocity) {
    this.color = color;
    this.context = context;
    this.radius = radius;
    this.point = point;
    this.velocity = velocity;
  }

  draw(): void {
    this.context.beginPath();
    this.context.arc(this.point.x, this.point.y, this.radius, 0, Math.PI * 2, false);
    this.context.strokeStyle = 'white';
    this.context.stroke();
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }
}

export default Circle;