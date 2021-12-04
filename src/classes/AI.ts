import Ball from './Ball';
import Point from '../interfaces/Point';
import Rectangle from './Rectangle';
import Size from '../interfaces/Size';
import Velocity from '../interfaces/Velocity';

class AI extends Rectangle {
  velocity: Velocity;
  constructor(color: string, context: any, point: Point, size: Size, velocity: Velocity) {
    super(color, context, point, size);
    this.velocity = velocity;
  }
  
  moveTowardsBall(ball: Ball): void {
    // if ball.y + ball.height is greater than canvasheight
    if(ball.point.y > this.point.y) {
      this.point.y += this.velocity.y;
    }
    else {
      this.point.y -= this.velocity.y;
    }

    this.draw();
    
    // Calculate balls trajectory
    // Then update the x and y to move towards it based on the velocity
    // += yvleocity
  }

}

export default AI;