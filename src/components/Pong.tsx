import Game from '../classes/Game';
import React, { useEffect, useRef, useState } from 'react';
import './Pong.css';

const Pong = () => {
  const canvasRef = useRef(null);
  const gameHeaderRef = useRef(null);
  let game: Game, canvas: HTMLCanvasElement;

  useEffect(() => {
    canvas = canvasRef.current;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = window.innerHeight - gameHeaderRef.current.clientHeight;
    game = new Game(canvas);
  }, []);

  return (
    <section className="pong">
      <div ref={gameHeaderRef} >
        <h1 className="pong__header">Pong</h1>
        <button className="pong__btn" onClick={() => game.pause()}>Pause</button>
        <button className="pong__btn" onClick={() => game.start()}>Start</button>
        <br />
        <br />
      </div>
      <canvas ref={canvasRef} className="pong__canvas" width="1080" height="600"></canvas>
    </section>
  )
}
export default Pong;