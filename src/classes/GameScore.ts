import Size from "../interfaces/Size";
import Score from "./Score";
import Ball from './Ball';

class GameScore {
  aiScore: Score;
  context: any;
  playerScore: Score;
  constructor(context: any, canvasSize: Size) {
    this.context = context;
    this.aiScore = this.createAIScore(canvasSize);
    this.playerScore = this.createPlayerScore(canvasSize);
  }

  createAIScore(canvasSize: Size): Score {
    let point = { x: canvasSize.width / 2 - 100, y: 60 };
    return new Score(0, '#ffffff', this.context, '30px Arial', point);
  }

  createPlayerScore(canvasSize: Size): Score {
    let point = { x: canvasSize.width / 2 + 100, y: 60 };
    return new Score(0, '#ffffff', this.context, '30px Arial', point);
  }

  draw() {
    this.playerScore.draw();
    this.aiScore.draw();
  }

  hasScored(ball: Ball, canvasSize: Size) {
    return this.playerScored(ball) || this.aiScored(ball, canvasSize);
  }

  playerScored(ball: Ball) { 
    return ball.point.x <= 0 
  }

  aiScored(ball: Ball, canvasSize: Size) {
    return (ball.point.x + ball.size.width) >= canvasSize.width 
  }

  update(ball: Ball, canvasSize: Size) {
    if (this.aiScored(ball, canvasSize)) {
      this.aiScore.amount += 1;
    } else if (this.playerScored(ball)) {
      this.playerScore.amount += 1;
    }
  }
}

export default GameScore;