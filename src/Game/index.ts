import { GameState } from "../GameState";
import { Level, LevelBuilder } from "../LevelBuilder";
import { Paddle } from "../Entities/Tiles/Paddle";
import { Block } from "../Entities/Tiles/Block";
import { Ball } from "../Entities/Ball";


export class BreakoutGame {
  constructor(
      private levelbuilder: LevelBuilder,
      private lvl: Level,
  ) {}
  private canvas = document.getElementById("canvas-BreakOut") as HTMLCanvasElement;
  private ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  private state: GameState | null = null;

  public start(
      paddleWidth: number, paddleHeight: number,
      paddleColor: string, paddleSpeed: number,
      ballRadius: number, ballColor: string,
      ballStepX: number, ballStepY: number,
  ): void
  {
      // Game State initialization

    const paddle: Paddle = new Paddle(
        this.canvas,
        (this.canvas.width - paddleWidth)/2,
        this.canvas.height - paddleHeight,
        paddleWidth, paddleHeight, paddleColor, paddleSpeed
    );
    const ball: Ball = new Ball(
        this.canvas, paddle,
        ballStepX, ballStepY,
        ballRadius, ballColor,
    );
    const blocks: Array<Block> = this.levelbuilder.buildLevel(this.lvl);
    this.state = new GameState(this.canvas, ball, paddle, blocks);

    // Event Handlers initialization
    {
      const keyDownHandler = (e: KeyboardEvent) => {
          switch (e.keyCode) {
              case 37: // LEFT
                  this.state?.paddle.toggleLeft(true);
                  break;
              case 39: // RIGHT
                  this.state?.paddle.toggleRight(true);
                  break;
              case 38: // UP
                  this.state?.ball.setMoving();
                  break;
              case 32: // SPACEBAR
                  this.state?.reset();
                  break;
          }
      }

      const keyUpHandler = (e: KeyboardEvent) => {
          switch (e.keyCode) {
              case 37:
                  this.state?.paddle.toggleLeft(false);
                  break;
              case 39:
                  this.state?.paddle.toggleRight(false);
                  break;
          }
      }

      const mouseClickHandler = (e: MouseEvent) => {
          this.state?.ball.setMoving();
      }

      const mouseMoveHandler = (e: MouseEvent) => {
          const pageOffset: ClientRect = this.canvas.getBoundingClientRect();
          this.state?.paddle.move(e.clientX - pageOffset.left);
      }

      document.addEventListener("keydown", keyDownHandler);
      document.addEventListener("keyup", keyUpHandler);
      this.canvas.addEventListener("click", mouseClickHandler);
      this.canvas.addEventListener("mousemove", mouseMoveHandler);
    }

    // Game Loop

    const mainLoop = () => {
        if (!this.state?.isOver()) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.state?.update();
            this.state?.draw(this.ctx);
        }

        window.requestAnimationFrame(mainLoop);
    }
    window.requestAnimationFrame(mainLoop);
  }
}