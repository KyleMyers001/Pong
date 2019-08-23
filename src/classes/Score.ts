class Score {
  color: string;
  context: any;
  font: string;
  amount: number;
  x: number;
  y: number;
  constructor(color: string, context: any, font: string, amount: number, x: number, y: number) {
    this.color = color;
    this.context = context;
    this.font = font;
    this.amount = amount;
    this.x = x;
    this.y = y;
  }

  draw(): void {
    this.context.font = this.font;
    this.context.stroke;
    this.context.fillStyle = this.color;
    this.context.fillText(this.amount, this.x, this.y);
  }
}

export default Score;