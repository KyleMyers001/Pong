import AI from '../classes/AI';
import Ball from '../classes/Ball';
import Player from '../classes/Player';
import Score from '../classes//Score';
import * as React from 'react';

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
  predictiveBall: Ball; // Used by the AI for predicting the ball's inevitable location.
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

  generateAIScore(): Score {
    let x = this.canvas.width / 2 - 100;
    let y = 60;
    let xVelocity = 0;
    let yVelocity = 5;
    let color = '#ffffff';
    return new Score(color, this.context, '30px Arial', 0, x, y);
  }

  generateBall(): Ball {
    let size = 20;
    let x = this.canvas.width / 2;
    let y = this.canvas.height / 2;
    let xVelocity = 10;
    let yVelocity = 10;
    let color = '#ffffff';
    return new Ball(color, this.context, x, y, xVelocity, yVelocity, size, size, this.canvas.width, this.canvas.height);
  }

  generatePlayerScore(): Score {
    let x = this.canvas.width / 2 + 100;
    let y = 60;
    let xVelocity = 0;
    let yVelocity = 5;
    let color = '#ffffff';
    return new Score(color, this.context, '30px Arial', 0, x, y);
  }

  generateAI(): AI {
    let height = 80;
    let width = 20;
    let x = 20;
    let y = this.canvas.height / 2 - (height / 2);
    let xVelocity = 0;
    let yVelocity = 10;
    let color = '#ffffff';
    return new AI(color, this.context, x, y, xVelocity, yVelocity, width, height, this.canvas.width, this.canvas.height);
  }

  generatePlayer(): Player {
    let height = 80;
    let width = 20;
    let x = this.canvas.width - width - 20;
    let y = this.canvas.height / 2 - (height / 2);
    let xVelocity = 0;
    let yVelocity = 15;
    let color = '#ffffff';
    return new Player(color, this.context, x, y, xVelocity, yVelocity, width, height, this.canvas.width, this.canvas.height);
  }

  generatePredictiveBall(): Ball { 
    // This is what the AI follows.
    // It should spawn where the current ball is when the player and the ball connect.
    // The speed of this ball should be slightly faster, and going in the same direction.
    // let scale = this.canvas.width / 15;
    let size = 20;
    let x = this.ball.x;
    let y = this.ball.y;
    let xVelocity = 15;
    let yVelocity = 15;
    let color = '#FF0000';
    return new Ball(color, this.context, x, y, xVelocity, yVelocity, size, size, this.canvas.width, this.canvas.height);
  }

  animate() {
    if (this.active) {
      let collidedWithAi = this.detectCollision(this.ai.x, this.ai.y, this.ball.x, this.ball.y);
      let collidedWithPlayer = this.detectCollision(this.player.x, this.player.y, this.ball.x, this.ball.y);
      let aiScored = (this.ball.x + this.ball.width) >= this.canvas.width;
      let playerScored = this.ball.x <= 0;
      if (aiScored) {
        this.aiScore.amount += 1;
        this.ball = this.generateBall();
      } else if (playerScored) {
        this.playerScore.amount += 1;
        this.ball = this.generateBall();
      }

      if (collidedWithAi || collidedWithPlayer) {
        this.ball.xVelocity = -this.ball.xVelocity;
      }

      if(collidedWithPlayer) { // TODO: Figure out what I was doing with the predictive ball.  
        // This code is likely redundant (not working)
        // generate predictive ball
        this.predictiveBall = this.generatePredictiveBall();
      }

      if(typeof(this.predictiveBall) !== 'undefined') {
        this.predictiveBall.update();
        console.log(this.predictiveBall);
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

  detectCollision(x1: number, y1: number, x2: number, y2: number) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    let collision = false;

    const horizontalCheck = Math.abs(xDistance) < this.ai.width;
    const verticalCheck = yDistance < this.ai.height && yDistance > -this.ball.height;
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