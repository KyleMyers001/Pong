import Rectangle from './Rectangle';
import Point from '../interfaces/Point';
import Size from '../interfaces/Size';
import Velocity from '../interfaces/Velocity';

class Player extends Rectangle {
  active: boolean;
  direction: string;
  canvasSize: Size;
  velocity: Velocity;
  constructor(color: string, context: any, point: Point, size: Size, canvaSize: Size, velocity: Velocity) {
    super(color, context, point, size);
    this.active = true;
    this.canvasSize = canvaSize;
    this.velocity = velocity;
  }

  startAnimation(key): void {
    if (this.active) {
      if (key === 'w') {
        this.direction = 'up';
      }
      else if (key === 's') {
        this.direction = 'down';
      }
    }
  }

  stopAnimation(): void {
    if (this.active) {
      this.direction = '';
    }
  }

  update() {
    if(this.direction === 'up'  && this.point.y > this.velocity.y) {
      this.point.y -= this.velocity.y;
    } else if(this.direction === 'down' && this.point.y < (this.canvasSize.height - this.size.height - this.velocity.y)) {
      this.point.y += this.velocity.y;
    }
    this.draw();
  }
}

export default Player;