import { Tile } from "../";

interface InitialPaddleState {
  x: number;
  y: number;
  left: boolean;
  right: boolean;
}

export class Paddle extends Tile {
  constructor(
      private canvas: HTMLCanvasElement,
      protected x: number, protected y: number,
      protected width: number, protected height: number,
      protected color: string, private speed: number,
  ) {
      super(x, y, width, height, color);
  }
  private initialState: InitialPaddleState = {
      x: this.x,
      y: this.y,
      left: false,
      right: false,
  };
  private left: boolean = this.initialState.left;
  private right: boolean = this.initialState.right;

  public update(): void {
      this.left && this.moveLeft();
      this.right && this.moveRight();
  }

  public reset(): void {
      this.x = this.initialState.x;
      this.y = this.initialState.y;
      this.left = this.initialState.left;
      this.right = this.initialState.right;
  }

  public toggleLeft(state: boolean) {
      this.left = state;
  }

  public toggleRight(state: boolean) {
      this.right = state;
  }

  public getHeight(): number {
      return this.height;
  }

  public getWidth(): number {
      return this.width;
  }

  private moveLeft(): void {
      this.x = this.x - this.speed >= 0 ?
          this.x - this.speed : 0;
  }

  private moveRight(): void {
      this.x = this.x + this.width + this.speed <= this.canvas.width ?
          this.x + this.speed : this.canvas.width - this.width;
  }

  public move(mouseX: number): void {
      const newPosX: number = mouseX - this.width/2;
      this.x = newPosX < 0 ? 0
             : newPosX > this.canvas.width - this.width ? this.canvas.width - this.width
             : newPosX;
  }
}