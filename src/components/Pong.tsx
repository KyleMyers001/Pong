import Game from '../classes/Game';
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
  canvas: HTMLCanvasElement;
  game: Game;
  gameHeader: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  constructor(props: any) {
    super(props);
    this.gameHeader = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = window.innerHeight - this.gameHeader.current.clientHeight;
    this.game = new Game(this.canvas);
  }

  render() {
    return (
      <section className="container">
        <div ref={this.gameHeader} >
          <h1 className="has-text-centered">Pong</h1>
          <button id="btnPauseGame" className="btn btn--primary" onClick={() => this.game.pause()}>Pause</button>
          <button id="btnStartGame" className="btn btn--primary" onClick={() => this.game.start()}>Start</button>
          <br />
          <br />
        </div>
        <canvas ref={this.canvasRef} id="canvas" className="canvas canvas--pong" width="1080" height="600"></canvas>
      </section>
    )
  }
}

export default Pong;