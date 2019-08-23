import Circle from '../classes/Circle';
import Mouse from '../interfaces/Mouse';
import * as React from 'react';

class Bubbles extends React.Component {
  bubbles: Circle[];
  canvas: HTMLCanvasElement;
  context: any;
  colors: string[];
  limit: number;
  maxRadius: number;
  mouse: Mouse;
  radius: number;
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1 className="has-text-centered">Bubbles</h1>
        <br />
        <canvas id="canvas" className="canvas" width="1080" height="600"></canvas>
      </div>
    )
  }

  componentDidMount() {
    console.log('mounted');
    this.canvas = document.querySelector('#canvas');
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.context = this.canvas.getContext('2d');
    this.colors = [
      '#02547D',
      '#0284A8',
      '#02BEC4',
      '#A9E8DC',
      '#E1F7E7'
    ];
    this.limit = this.canvas.width / 2;
    this.radius = 2;
    this.maxRadius = 30;
    this.changeCanvasColor();
    this.bindEvents();
    this.mouse = {
      x: null,
      y: null
    };
    this.bubbles = this.generateBubbles();
    this.animate();
  }

  bindEvents(): void {
    const viewportOffSet = this.canvas.getBoundingClientRect();
    var offsetY = viewportOffSet.top;
    var offsetX = viewportOffSet.left;
  
    window.addEventListener('mousemove', (e) => {

      this.mouse.x = e.x - offsetX;
      this.mouse.y = e.y - offsetY;
    }); 
    
    window.addEventListener('touchmove', (e) => {
      //  this.mouse.x = e.targetTouches[0].screenX;
      //  this.mouse.y = e.targetTouches[0].screenY - offsetY;
    });  
  }

  changeCanvasColor(): void {
    this.context.fillStyle='white';
    this.context.fillRect(0,0, this.canvas.width, this.canvas.height);
  }

  generateBubbles(): Circle[] {
    let bubbles = new Array();
    for(let i = 0; i < this.limit; i++) {
      let x = Math.random() * (this.canvas.width - this.radius * 2) + this.radius;
      let y = Math.random() * (this.canvas.height - this.radius * 2) + this.radius;
      let xVelocity = (Math.random() - 0.5) * 5;
      let yVelocity = (Math.random() - 0.5) * 5;
      let colorIndex = Math.floor(Math.random() * this.colors.length);
      let color = this.colors[colorIndex];
      bubbles.push(new Circle(color, this.context, this.radius, x, y, xVelocity, yVelocity));
    }
    return bubbles;
  }

  animate(): void {
    this.context.clearRect(0, 0, innerWidth, innerHeight);
    this.bubbles.forEach((bubble) => {
      this.updateBubble(bubble);
    });
    requestAnimationFrame(this.animate.bind(this));
  }

  updateBubble(bubble: Circle) {
    // Interactivity
    const closeToX = this.mouse.x - bubble.x < 50 && this.mouse.x - bubble.x > -50;
    const closeToY = this.mouse.y - bubble.y < 50 && this.mouse.y - bubble.y > -50;

    if (closeToX && closeToY && bubble.radius < this.maxRadius) {
      bubble.radius += 10;
    } else if (bubble.radius > this.radius) {
      bubble.radius -= 1;
    }
    // End Interactivity

    if ((bubble.x + bubble.radius) >= this.canvas.width || (bubble.x - bubble.radius) <= 0) {
      bubble.xVelocity = -bubble.xVelocity;
    }

    if ((bubble.y + bubble.radius) >= this.canvas.height || (bubble.y - bubble.radius) <= 0) {
      bubble.yVelocity = -bubble.yVelocity;
    }

    bubble.x += bubble.xVelocity;
    bubble.y += bubble.yVelocity;


    bubble.draw();
  }
}

export default Bubbles;