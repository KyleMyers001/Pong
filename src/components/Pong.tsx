import Game from '../classes/Game';
import React, { useEffect, useRef, useState } from 'react';

const Pong = () => {
  const canvasRef = useRef(null);
  const gameHeaderRef = useRef(null);
  let game: Game, canvas: HTMLCanvasElement;

  useEffect(() => {
    if(!game) {
      canvas = canvasRef.current;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = window.innerHeight - gameHeaderRef.current.clientHeight;
      game = new Game(canvas);
    }
  });

  return (
    <section className="container">
      <div ref={gameHeaderRef} >
        <h1 className="has-text-centered">Pong</h1>
        <button id="btnPauseGame" className="btn btn--primary" onClick={() => game.pause()}>Pause</button>
        <button id="btnStartGame" className="btn btn--primary" onClick={() => game.start()}>Start</button>
        <br />
        <br />
      </div>
      <canvas ref={canvasRef} id="canvas" className="canvas" width="1080" height="600"></canvas>
    </section>
  )
}
export default Pong;