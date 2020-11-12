import { GameObject } from "../../GameObject";


export abstract class Tile implements GameObject {
  constructor(
      protected x: number, protected y: number,
      protected width: number, protected height: number,
      protected color: string,
  ) {}

  public draw(ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  public getTop(): number {
      return this.y;
  }

  public getBottom(): number {
      return this.y + this.height;
  }

  public getLeft(): number {
      return this.x;
  }

  public getRight(): number {
      return this.x + this.width;
  }

  public abstract reset(): void;
}
