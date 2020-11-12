import { Tile } from "../";

interface InitialBlockState {
  lives: number;
  destroyed: boolean;
}

export class Block extends Tile {
  constructor(
      protected x: number, protected y: number,
      protected width: number, protected height: number,
      protected color: string, private lives: number,   
  ) {
      super(x, y, width, height, color);
  }
  private initialState: InitialBlockState = {
      destroyed: false,
      lives: this.lives,
  };
  private destroyed: boolean = this.initialState.destroyed;

  public reset(): void {
      this.destroyed = this.initialState.destroyed;
      this.lives = this.initialState.lives;
  }

  public isDestroyed(): boolean {
      return this.destroyed;
  }

  public hit(): void {
      this.lives > 1 ? this.lives-- 
      : this.lives--, this.destroyed = true;
  }
}