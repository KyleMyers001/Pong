import AI from '../classes/AI';
import Ball from '../classes/Ball';
import Player from '../classes/Player';
import Score from '../classes/Score';
import * as React from 'react';
import Point from '../interfaces/Point';
import Size from '../interfaces/Size';
import Velocity from '../interfaces/Velocity';

// TODO: Refactor code, remove functionality out of class component. 
// Use React hooks, and modularize the code.

// TODO: Need to add winning conditions

// TODO: Should add feature to display control scheme
class Pong extends React.Component {
  // 1 ball
  // 1 AI rectangle
  // 1 Player rectangle
  // lets just draw the ball for now and have it bounce off the canvas
  // actually, lets draw the canvas first
  // TODO: Add scoreboard
  ai: AI;
  aiScore: Score;
  active: boolean;
  ball: Ball;
  canvas: HTMLCanvasElement;
  context: any;
  player: Player;
  playerScore: Score;
  gameHeader: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.gameHeader = React.createRef();
  }

  componentDidMount() {
    this.active = false;
    this.canvas = document.querySelector('#canvas');
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = window.innerHeight - this.gameHeader.current.clientHeight;
    this.context = this.canvas.getContext('2d');
    this.ball = this.generateBall();
    this.player = this.generatePlayer();
    this.ai = this.generateAI();
    this.playerScore = this.generatePlayerScore();
    this.aiScore = this.generateAIScore();
  }

  render() {
    return (
      <section className="container">
        <div ref={this.gameHeader} >
          <h1 className="has-text-centered">Pong</h1>
          <button id="btnPauseGame" className="btn btn--primary" onClick={this.pauseGame.bind(this)}>Pause</button>
          <button id="btnStartGame" className="btn btn--primary" onClick={this.startGame.bind(this)}>Start</button>
          <br />
          <br />
        </div>
        <canvas id="canvas" className="canvas canvas--pong" width="1080" height="600"></canvas>
      </section>
    )
  }

  getCanvasSize() { 
    return { width: this.canvas.width, height: this.canvas.height };
  }

  generateAIScore(): Score {
    let point = { x: this.canvas.width / 2 - 100, y: 60 };
    return new Score(0, '#ffffff', this.context, '30px Arial', point);
  }

  generateBall(): Ball {
    let point = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    let velocity = { x: 10, y: 10 };
    let size = { width: 20, height: 20 };
    return new Ball('#ffffff', this.context, point, size, this.getCanvasSize(), velocity, );
  }

  generatePlayerScore(): Score {
    let point = { x: this.canvas.width / 2 + 100, y: 60 };
    return new Score(0, '#ffffff', this.context, '30px Arial', point);
  }

  generateAI(): AI {
    let velocity = { x: 0, y: 10 };
    let size = { width: 20, height: 80 };
    let point = { x: 20, y: this.canvas.height / 2 - (size.height / 2)};
    return new AI('#ffffff', this.context, point, size, velocity);
  }

  generatePlayer(): Player {
    let size = { width: 20, height: 80 }
    let point = { x: this.canvas.width - size.width - 20, y: this.canvas.height / 2 - (size.height / 2) };
    let velocity = { x: 0, y: 15 };
    return new Player('#ffffff', this.context, point, size, this.getCanvasSize(), velocity);
  }

  animate() {
    if (this.active) {
      let collidedWithAi = this.detectCollision(this.ai.point, this.ball.point);
      let collidedWithPlayer = this.detectCollision(this.player.point, this.ball.point);
      let aiScored = (this.ball.point.x + this.ball.size.width) >= this.canvas.width;
      let playerScored = this.ball.point.x <= 0;
      if (aiScored) {
        this.aiScore.amount += 1;
        this.ball = this.generateBall();
      } else if (playerScored) {
        this.playerScore.amount += 1;
        this.ball = this.generateBall();
      }

      if (collidedWithAi || collidedWithPlayer) {
        this.ball.velocity.x = -this.ball.velocity.x;
      }

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.player.draw();
      this.aiScore.draw();
      this.ai.moveTowardsBall(this.ball);
      this.ball.update();
      this.playerScore.draw();
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  detectCollision(point1: Point, point2: Point) {
    let xDistance = point2.x - point1.x;
    let yDistance = point2.y - point1.y;
    let collision = false;

    const horizontalCheck = Math.abs(xDistance) < this.ai.size.width;
    const verticalCheck = yDistance < this.ai.size.height && yDistance > -this.ball.size.height;
    if (horizontalCheck && verticalCheck) {
      collision = true;
    }
    return collision;
  }

  startGame(): void {
    this.active = true;
    this.player.active = true;
    this.animate();
  }

  pauseGame(): void {
    this.active = false;
    this.player.active = false;
  }
}

export default Pong;