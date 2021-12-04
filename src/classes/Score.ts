import Point from '../interfaces/Point';

class Score {
  amount: number;
  color: string;
  context: any;
  font: string;
  point: Point;
  constructor(amount: number, color: string, context: any, font: string, point: Point) {
    this.amount = amount;
    this.color = color;
    this.context = context;
    this.font = font;
    this.point = point;
  }

  draw(): void {
    this.context.font = this.font;
    this.context.stroke;
    this.context.fillStyle = this.color;
    this.context.fillText(this.amount, this.point.x, this.point.y);
  }
}

export default Score;