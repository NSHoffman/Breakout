import { GameLost, GameWon } from "../GameOver";
import { Stats } from "../Stats";
export class GameState {
    constructor(canvas, ball, paddle, blocks) {
        this.canvas = canvas;
        this.ball = ball;
        this.paddle = paddle;
        this.blocks = blocks;
        this.stats = new Stats(this.blocks, 10);
        this.blocksRemaining = this.stats.getRemainingBlocks();
        this.gameOver = null;
    }
    draw(ctx) {
        var _a;
        this.paddle.draw(ctx);
        this.ball.draw(ctx);
        this.blocksRemaining.forEach((b) => b.draw(ctx));
        this.drawStats(ctx);
        (_a = this.gameOver) === null || _a === void 0 ? void 0 : _a.draw(ctx, this.canvas, this.stats.getScore());
    }
    drawStats(ctx) {
        ctx.fillStyle = "#000";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(`Score: ${this.stats.getScore()}`, this.canvas.width - 5, parseInt(ctx.font));
        this.stats.getCombo() && ctx.fillText(`Combo: ${this.stats.getCombo()}`, this.canvas.width - 5, parseInt(ctx.font) * 2);
        ctx.textAlign = "left";
        ctx.fillText(`Lives: ${this.stats.getLives()}`, 5, parseInt(ctx.font));
    }
    update() {
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
    reset() {
        this.paddle.reset();
        this.ball.reset();
        this.stats.reset();
        this.blocksRemaining = this.stats.getRemainingBlocks();
        this.gameOver = null;
    }
    isOver() {
        return !!this.gameOver;
    }
}
