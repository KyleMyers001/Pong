import Rectangle from './Rectangle';
import { start } from 'repl';

class Player extends Rectangle {
  active: boolean;
  direction: string;
  constructor(color: string, context: any, x: number, y: number, xVelocity: number, yVelocity: number, width: number, height: number, canvasWidth: number, canvasHeight: number) {
    super(color, context, x, y, xVelocity, yVelocity, width, height, canvasWidth, canvasHeight);
    this.active = true;

    window.addEventListener('keydown', (e) => {
      this.startAnimation(e);
    });

    window.addEventListener('keyup', (e) => {
      this.stopAnimation();
    });

  }

  startAnimation(e: KeyboardEvent): void {
    if (this.active) {
      const key = e.key.toLowerCase();
      if (key === 'w' && this.y > this.yVelocity) {
        this.direction = 'up';
      }
      else if (key === 's' && this.y < (this.canvasHeight - this.height - this.yVelocity)) {
        this.direction = 'down';
      }
    }
  }

  stopAnimation(): void {
    if (this.active) {
      this.direction = '';
    }
  }

  draw(): void {
    if(this.direction === 'up'  && this.y > this.yVelocity) {
      this.y -= this.yVelocity;
    } else if(this.direction === 'down' && this.y < (this.canvasHeight - this.height - this.yVelocity)) {
      this.y += this.yVelocity;
    }

    this.context.beginPath()
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.stroke();
  }

}

export default Player;