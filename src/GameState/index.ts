import { GameObject } from "../GameObject";
import { Block } from "../Entities/Tiles/Block";
import { Paddle } from "../Entities/Tiles/Paddle";
import { Ball } from "../Entities/Ball";
import { GameLost, GameWon, GameOver } from "../GameOver";
import { Stats } from "../Stats";


export class GameState implements GameObject {
  constructor(
      private canvas: HTMLCanvasElement,
      public ball: Ball,
      public paddle: Paddle,
      private readonly blocks: Array<Block>,
  ) {}
  private stats: Stats = new Stats(this.blocks, 10);
  private blocksRemaining: Array<Block> = this.stats.getRemainingBlocks();
  private gameOver: GameOver | null = null;

  public draw(ctx: CanvasRenderingContext2D): void {
      this.paddle.draw(ctx);
      this.ball.draw(ctx);
      this.blocksRemaining.forEach((b: Block) => b.draw(ctx));
      this.drawStats(ctx);
      this.gameOver?.draw(ctx, this.canvas, this.stats.getScore());
  }

  public drawStats(ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = "#000";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`Score: ${this.stats.getScore()}`, this.canvas.width - 5, parseInt(ctx.font));
      this.stats.getCombo() && ctx.fillText(`Combo: ${this.stats.getCombo()}`, this.canvas.width - 5, parseInt(ctx.font) * 2);
      ctx.textAlign = "left";
      ctx.fillText(`Lives: ${this.stats.getLives()}`, 5, parseInt(ctx.font));
  }

  public update(): void {
      this.paddle.update();
      this.blocksRemaining = this.stats.getRemainingBlocks();
      this.ball.update([this.paddle, ...this.blocksRemaining], this.stats);
      if (this.blocksRemaining.length === 0) {
          this.gameOver = new GameWon();
      }
      else if (this.stats.getLives() === 0) {
          this.gameOver = new GameLost();
      }
  }

  public reset(): void {
      this.paddle.reset();
      this.ball.reset();
      this.stats.reset();
      this.blocksRemaining = this.stats.getRemainingBlocks();
      this.gameOver = null;
  }

  public isOver(): boolean {
      return !!this.gameOver;
  }
}