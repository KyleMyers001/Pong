import AI from '../classes/AI';
import Ball from '../classes/Ball';
import GameScore from '../classes/GameScore';
import Player from '../classes/Player';

class Game {
  ai: AI;
  active: boolean;
  ball: Ball;
  canvas: HTMLCanvasElement;
  context: any;
  player: Player;
  gameScore: GameScore;
  constructor(canvas: HTMLCanvasElement) {
    this.active = false;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.ball = this.createBall();
    this.player = this.createPlayer();
    this.ai = this.createAI();
    this.gameScore = new GameScore(this.context, this.getCanvasSize());
  }

  getCanvasSize() { 
    return { width: this.canvas.width, height: this.canvas.height };
  }

  createBall(): Ball {
    let point = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    let velocity = { x: 10, y: 10 };
    let size = { width: 20, height: 20 };
    return new Ball('#ffffff', this.context, point, size, this.getCanvasSize(), velocity, );
  }  

  createPlayer(): Player {
    let size = { width: 20, height: 80 }
    let point = { x: this.canvas.width - size.width - 20, y: this.canvas.height / 2 - (size.height / 2) };
    let velocity = { x: 0, y: 15 };
    return new Player('#ffffff', this.context, point, size, this.getCanvasSize(), velocity);
  }

  createAI(): AI {
    let velocity = { x: 0, y: 10 };
    let size = { width: 20, height: 80 };
    let point = { x: 20, y: this.canvas.height / 2 - (size.height / 2)};
    return new AI('#ffffff', this.context, point, size, velocity);
  }

  animate() {
    if (this.active) {
      let collidedWithAi = this.ball.detectCollision(this.ai.point, this.ai.size);
      let collidedWithPlayer = this.ball.detectCollision(this.player.point, this.player.size);
 
      this.gameScore.update(this.ball, this.getCanvasSize());
      const hasScored = this.gameScore.hasScored(this.ball, this.getCanvasSize());
      if(hasScored) {
        this.ball = this.createBall();
      }

      if (collidedWithAi || collidedWithPlayer) {
        this.ball.velocity.x = -this.ball.velocity.x;
      }

      this.redraw();
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  redraw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.update();
    this.gameScore.draw();
    this.ai.moveTowardsBall(this.ball);
    this.ball.update();
  }

  start(): void {
    this.active = true;
    this.player.active = true;
    this.animate();
  }

  pause(): void {
    this.active = false;
    this.player.active = false;
  }
}

export default Game;