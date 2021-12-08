import Size from "../interfaces/Size";
import Score from "./Score";
import Ball from './Ball';

class GameScore {
  aiScore: Score;
  context: any;
  playerScore: Score;
  constructor(context: any, canvasSize: Size, aiTotal: number, playerTotal: number) {
    this.context = context;
    this.aiScore = this.createAIScore(canvasSize, aiTotal);
    this.playerScore = this.createPlayerScore(canvasSize, playerTotal);
  }

  createAIScore(canvasSize: Size, total: number): Score {
    let point = { x: canvasSize.width / 2 - 100, y: 60 };
    return new Score(total, '#ffffff', this.context, '30px Arial', point);
  }

  createPlayerScore(canvasSize: Size, total: number): Score {
    let point = { x: canvasSize.width / 2 + 100, y: 60 };
    return new Score(total, '#ffffff', this.context, '30px Arial', point);
  }

  draw() {
    this.playerScore.draw();
    this.aiScore.draw();
  }

  hasScored(ball: Ball, canvasSize: Size): Boolean {
    return this.playerScored(ball) || this.aiScored(ball, canvasSize);
  }

  playerScored(ball: Ball): Boolean { 
    return ball.point.x <= 0 
  }

  aiScored(ball: Ball, canvasSize: Size): Boolean {
    return (ball.point.x + ball.size.width) >= canvasSize.width 
  }

  update(ball: Ball, canvasSize: Size): void {
    if (this.aiScored(ball, canvasSize)) {
      this.aiScore.amount += 1;
    } else if (this.playerScored(ball)) {
      this.playerScore.amount += 1;
    }
  }
}

export default GameScore;