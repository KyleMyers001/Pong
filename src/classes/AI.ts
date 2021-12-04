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
  
  moveTowardsBall(ball: Ball): void { // TODO: Improve solution for making AI beatable.
    // if ball.y + ball.height is greater than canvasheight
    const randomVelocity = this.velocity.y - Math.floor((this.velocity.y / 3) * Math.random());
    if(ball.point.y > this.point.y) {
      this.point.y += randomVelocity;
    }
    else {
      this.point.y -= randomVelocity;
    }

    this.draw();
    
    // Calculate balls trajectory
    // Then update the x and y to move towards it based on the velocity
    // += yvleocity
  }

}

export default AI;