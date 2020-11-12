import { GameState } from "../GameState";
import { Paddle } from "../Entities/Tiles/Paddle";
import { Ball } from "../Entities/Ball";
export class BreakoutGame {
    constructor(levelbuilder, lvl) {
        this.levelbuilder = levelbuilder;
        this.lvl = lvl;
        this.canvas = document.getElementById("canvas-BreakOut");
        this.ctx = this.canvas.getContext("2d");
        this.state = null;
    }
    start(paddleWidth, paddleHeight, paddleColor, paddleSpeed, ballRadius, ballColor, ballStepX, ballStepY) {
        // Game State initialization
        const paddle = new Paddle(this.canvas, (this.canvas.width - paddleWidth) / 2, this.canvas.height - paddleHeight, paddleWidth, paddleHeight, paddleColor, paddleSpeed);
        const ball = new Ball(this.canvas, paddle, ballStepX, ballStepY, ballRadius, ballColor);
        const blocks = this.levelbuilder.buildLevel(this.lvl);
        this.state = new GameState(this.canvas, ball, paddle, blocks);
        // Event Handlers initialization
        {
            const keyDownHandler = (e) => {
                var _a, _b, _c, _d;
                switch (e.keyCode) {
                    case 37: // LEFT
                        (_a = this.state) === null || _a === void 0 ? void 0 : _a.paddle.toggleLeft(true);
                        break;
                    case 39: // RIGHT
                        (_b = this.state) === null || _b === void 0 ? void 0 : _b.paddle.toggleRight(true);
                        break;
                    case 38: // UP
                        (_c = this.state) === null || _c === void 0 ? void 0 : _c.ball.setMoving();
                        break;
                    case 32: // SPACEBAR
                        (_d = this.state) === null || _d === void 0 ? void 0 : _d.reset();
                        break;
                }
            };
            const keyUpHandler = (e) => {
                var _a, _b;
                switch (e.keyCode) {
                    case 37:
                        (_a = this.state) === null || _a === void 0 ? void 0 : _a.paddle.toggleLeft(false);
                        break;
                    case 39:
                        (_b = this.state) === null || _b === void 0 ? void 0 : _b.paddle.toggleRight(false);
                        break;
                }
            };
            const mouseClickHandler = (e) => {
                var _a;
                (_a = this.state) === null || _a === void 0 ? void 0 : _a.ball.setMoving();
            };
            const mouseMoveHandler = (e) => {
                var _a;
                const pageOffset = this.canvas.getBoundingClientRect();
                (_a = this.state) === null || _a === void 0 ? void 0 : _a.paddle.move(e.clientX - pageOffset.left);
            };
            document.addEventListener("keydown", keyDownHandler);
            document.addEventListener("keyup", keyUpHandler);
            this.canvas.addEventListener("click", mouseClickHandler);
            this.canvas.addEventListener("mousemove", mouseMoveHandler);
        }
        // Game Loop
        const mainLoop = () => {
            var _a, _b, _c;
            if (!((_a = this.state) === null || _a === void 0 ? void 0 : _a.isOver())) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                (_b = this.state) === null || _b === void 0 ? void 0 : _b.update();
                (_c = this.state) === null || _c === void 0 ? void 0 : _c.draw(this.ctx);
            }
            window.requestAnimationFrame(mainLoop);
        };
        window.requestAnimationFrame(mainLoop);
    }
}
