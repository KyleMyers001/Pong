import Ball from '../classes/Ball';
import Game from '../classes/Game';

const createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 600;
  return canvas;
}

const game = new Game(createCanvas());
const canvasSize = game.getCanvasSize();
const noOneScoredX = game.canvas.width / 2;
const playerScoredX = -100;
const aiScoredX = game.canvas.width + game.ball.size.width;

describe('Has Scored', () => {
  it('Should be true if AI Scored', () => {
    game.ball.point.x = aiScoredX;
    expect(game.gameScore.hasScored(game.ball, canvasSize)).toBeTruthy();
  });

  it('Should be true if player scored', () => {
    game.ball.point.x = playerScoredX;
    expect(game.gameScore.hasScored(game.ball, canvasSize)).toBeTruthy();
  });

  it('Should be false if no one scored', () => {
    game.ball.point.x = noOneScoredX;
    expect(game.gameScore.hasScored(game.ball, canvasSize)).toBeFalsy();
  });
});

describe('Player Scored', () => {
  it('Should be true', () => {
    game.ball.point.x = playerScoredX;
    expect(game.gameScore.playerScored(game.ball)).toBeTruthy();
  });

  it('Should be false', () => {
    game.ball.point.x = noOneScoredX;
    expect(game.gameScore.playerScored(game.ball)).toBeFalsy();
  });
});

describe('AI Scored', () => {
  it('Should be true', () => {
    game.ball.point.x = aiScoredX;
    expect(game.gameScore.aiScored(game.ball, canvasSize)).toBeTruthy();
  });

  it('Should be false', () => {
    game.ball.point.x = noOneScoredX;
    expect(game.gameScore.aiScored(game.ball, canvasSize)).toBeFalsy();
  });
});

describe('Update', () => {
  it('Should increment player score', () => {
    const originalScore = game.gameScore.playerScore.amount;
    game.ball.point.x = playerScoredX;
    game.gameScore.update(game.ball, canvasSize);
    expect(game.gameScore.playerScore.amount).toEqual(originalScore + 1);
  });

  it('Should increment AI score', () => {
    const originalScore = game.gameScore.aiScore.amount;
    game.ball.point.x = aiScoredX;
    game.gameScore.update(game.ball, canvasSize);
    expect(game.gameScore.aiScore.amount).toEqual(originalScore + 1);
  });

  it('Should not modify the Player score', () => {
    const originalScore = game.gameScore.playerScore.amount;
    game.ball.point.x = noOneScoredX;
    game.gameScore.update(game.ball, canvasSize);
    expect(game.gameScore.playerScore.amount).toEqual(originalScore);
  });

  it('Should not modify the AI score', () => {
    const originalScore = game.gameScore.aiScore.amount;
    game.ball.point.x = noOneScoredX;
    game.gameScore.update(game.ball, canvasSize);
    expect(game.gameScore.aiScore.amount).toEqual(originalScore);
  });
});


