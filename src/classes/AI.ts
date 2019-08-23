import Ball from './Ball';
import Rectangle from './Rectangle';

class AI extends Rectangle {

  moveTowardsBall(ball: Ball): void {
    // if ball.y + ball.height is greater than canvasheight
    if(ball.y > this.y) {
      this.y += this.yVelocity;
    }
    else {
      this.y -= this.yVelocity;
    }

    this.draw();
    
    // Calculate balls trajectory
    // Then update the x and y to move towards it based on the velocity
    // += yvleocity
  }

}

export default AI;