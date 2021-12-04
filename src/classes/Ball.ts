import Rectangle from './Rectangle';
import Point from '../interfaces/Point';
import Size from '../interfaces/Size';
import Velocity from '../interfaces/Velocity';

class Ball extends Rectangle {
  canvasSize: Size;
  velocity: Velocity;
  constructor(color: string, context: any, point: Point, size: Size, canvaSize: Size, velocity: Velocity) {
    super(color, context, point, size);
    this.canvasSize = canvaSize;
    this.velocity = velocity;
  }

  update() {
    if ((this.point.y + this.size.height) >= this.canvasSize.height || this.point.y <= 0) {
      this.velocity.y = -this.velocity.y;
    }

    this.point.x += this.velocity.x;
    this.point.y += this.velocity.y;
    this.draw();
  }
}

export default Ball;