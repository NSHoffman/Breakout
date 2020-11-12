import { GameObject } from "../../GameObject";
import { Tile } from "../Tiles";
import { Paddle } from "../Tiles/Paddle";
import { Stats } from "../../Stats";

interface InitialBallState {
    x: number;
    y: number;
    isMoving: boolean;
    stepX: number;
    stepY: number;
}

interface Collision {
	x: boolean;
	y: boolean;
	tile?: Tile;
}

export class Ball implements GameObject {
  constructor(
      private canvas: HTMLCanvasElement,
      private paddle: Paddle,
      private stepX: number, private stepY: number,
      private radius: number, private color: string,
  ) {}

  private initialState: InitialBallState = {
      isMoving: false,
      x: this.paddle.getLeft() + this.paddle.getWidth()/2,
      y: this.canvas.height - this.paddle.getHeight() - (this.radius + 5),
      stepX: this.stepX,
      stepY: this.stepY,
  };

  private x: number = this.initialState.x;
  private y: number = this.initialState.y;
  private isMoving: boolean = this.initialState.isMoving;

  public draw(ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
      ctx.fill();
      ctx.closePath();
  }

  public update(tiles: Array<Tile>, stats: Stats): void {
      if (this.isMoving)
      {
          const isWallHit: Collision = this.detectWallCollision();
          const isTileHit: Collision = tiles
              .map((t: Tile) => this.detectTileCollision(t))
              .find((c: Collision) => c.x || c.y) || {x: false, y: false};

          if (isWallHit.x || isTileHit.x) {
              isTileHit.tile && isTileHit.x && this.moveToBorderX(this.stepX > 0 ? isTileHit.tile.getLeft() - this.radius : isTileHit.tile.getRight() + this.radius);
              stats.updateScore(isTileHit.tile);
              this.revertXdirection();
          }
          if (isWallHit.y || isTileHit.y) {
              isTileHit.tile && isTileHit.y && this.moveToBorderY(this.stepY > 0 ? isTileHit.tile.getTop() - this.radius : isTileHit.tile.getBottom() + this.radius);
              stats.updateScore(isTileHit.tile);
              this.revertYdirection();
          }
          this.move();
          if (this.y - this.radius >= this.canvas.height) {
              stats.decrementLives();
              this.reset();
          }
      }
      else {
          this.x = this.paddle.getLeft() + this.paddle.getWidth()/2;
      }
  }

  public reset(): void {
      this.isMoving = this.initialState.isMoving;
      this.x = this.paddle.getLeft() + this.paddle.getWidth()/2;
      this.y = this.initialState.y;
      this.stepX = this.initialState.stepX;
      this.stepY = this.initialState.stepY;
  }

  public setMoving(): void {
      this.isMoving = true;
  }

  private move(): void {
      this.x += this.stepX;
      this.y += this.stepY;
  }

  private moveToBorderX(x: number): void {
      this.x = x;
  }

  private moveToBorderY(y: number): void {
      this.y = y;
  }

  private detectTileCollision(tile: Tile): Collision {
      const isAngleHit: boolean = this.detectTileAngleCollision(tile);
      const isHit: Collision = {
          x:  this.x + this.radius >= tile.getLeft()
              && this.x - this.radius <= tile.getRight()
              && this.y - this.radius >= tile.getTop()
              && this.y + this.radius <= tile.getBottom(),
          y:  this.y + this.radius >= tile.getTop()
              && this.y - this.radius <= tile.getBottom()
              && this.x - this.radius >= tile.getLeft()
              && this.x + this.radius <= tile.getRight()
              || isAngleHit,
      };
      if (isHit.x || isHit.y) isHit.tile = tile;

      return isHit;
  }

  private detectTileAngleCollision(tile: Tile): boolean {
      const dx: Array<number> = [
          Math.abs(this.x - tile.getLeft()),
          Math.abs(this.x - tile.getLeft()),
          Math.abs(this.x - tile.getRight()),
          Math.abs(this.x - tile.getRight()),
      ];
      const dy: Array<number> = [
          Math.abs(this.y - tile.getTop()),
          Math.abs(this.y - tile.getBottom()),
          Math.abs(this.y - tile.getTop()),
          Math.abs(this.y - tile.getBottom()),
      ];
      const distance: Array<number> = dx.map((x: number, i: number) => {
          return Math.sqrt(x**2 + dy[i]**2) - this.radius;
      });
      return !!distance.find((dist: number) => dist <= 0);
  }

  private detectWallCollision(): Collision {
      return {
          x: this.x - this.radius <= 0 || this.x + this.radius >= this.canvas.width,
          y: this.y - this.radius <= 0,
      };
  }

  private revertXdirection(): void {
      this.stepX = -this.stepX;
  }

  private revertYdirection(): void {
      this.stepY = -this.stepY;
  }
}