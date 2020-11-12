import { Block } from "../Entities/Tiles/Block";
import { Tile } from "../Entities/Tiles";

export class Stats {
  constructor(
      private blocks: Array<Block>,
      private ptsForHit: number,
  ) {}
  private combo: number = 0;
  private score: number = 0;
  private lives: number = 3;

  public reset(): void {
      this.lives = 3;
      this.score = 0;
      this.dropCombo();
      this.blocks.forEach((b: Block) => b.reset());
  }

  public getRemainingBlocks(): Array<Block> {
      return this.blocks.filter((b: Block) => !b.isDestroyed());
  }

  public getLives(): number {
      return this.lives;
  }

  public incrementLives(): void {
      ++this.lives;
  }

  public decrementLives(): void {
      this.lives && --this.lives
  }

  public getScore(): number {
      return this.score;
  }

  public getCombo(): number {
      return this.combo;
  }

  public dropCombo(): void {
      this.combo = 0;
  }
  
  private incrementCombo(): void {
      this.combo++;
  }

  public updateScore(tile: Tile | undefined): void {
      if (tile && tile instanceof Block) {
          tile.hit();
          if (tile.isDestroyed()) {
              this.score += this.ptsForHit + (this.combo/10) * this.ptsForHit;                    
          }
          this.incrementCombo();
      }
      else this.dropCombo();
  }
}