import Velocity from '../interfaces/Velocity';
import Point from '../interfaces/Point';
import Size from '../interfaces/Size';

class Rectangle {
  color: string;
  context: any;
  size: Size;
  point: Point;
  constructor(color: string, context: any, point: Point, size: Size) {
    this.point = point;
    this.size = size;
    this.color = color;
    this.context = context;
  }

  draw() {
    this.context.beginPath()
    this.context.rect(this.point.x, this.point.y, this.size.width, this.size.height);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.stroke();
  }
}

export default Rectangle;