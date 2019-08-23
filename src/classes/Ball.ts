import Rectangle from './Rectangle';

class Ball extends Rectangle {
  update() {
    if ((this.y + this.height) >= this.canvasHeight || this.y <= 0) {
      this.yVelocity = -this.yVelocity;
    }

    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.draw();
  }
}

export default Ball;