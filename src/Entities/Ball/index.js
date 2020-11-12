export class Ball {
    constructor(canvas, paddle, stepX, stepY, radius, color) {
        this.canvas = canvas;
        this.paddle = paddle;
        this.stepX = stepX;
        this.stepY = stepY;
        this.radius = radius;
        this.color = color;
        this.initialState = {
            isMoving: false,
            x: this.paddle.getLeft() + this.paddle.getWidth() / 2,
            y: this.canvas.height - this.paddle.getHeight() - (this.radius + 5),
            stepX: this.stepX,
            stepY: this.stepY,
        };
        this.x = this.initialState.x;
        this.y = this.initialState.y;
        this.isMoving = this.initialState.isMoving;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
    }
    update(tiles, stats) {
        if (this.isMoving) {
            const isWallHit = this.detectWallCollision();
            const isTileHit = tiles
                .map((t) => this.detectTileCollision(t))
                .find((c) => c.x || c.y) || { x: false, y: false };
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
            this.x = this.paddle.getLeft() + this.paddle.getWidth() / 2;
        }
    }
    reset() {
        this.isMoving = this.initialState.isMoving;
        this.x = this.paddle.getLeft() + this.paddle.getWidth() / 2;
        this.y = this.initialState.y;
        this.stepX = this.initialState.stepX;
        this.stepY = this.initialState.stepY;
    }
    setMoving() {
        this.isMoving = true;
    }
    move() {
        this.x += this.stepX;
        this.y += this.stepY;
    }
    moveToBorderX(x) {
        this.x = x;
    }
    moveToBorderY(y) {
        this.y = y;
    }
    detectTileCollision(tile) {
        const isAngleHit = this.detectTileAngleCollision(tile);
        const isHit = {
            x: this.x + this.radius >= tile.getLeft()
                && this.x - this.radius <= tile.getRight()
                && this.y - this.radius >= tile.getTop()
                && this.y + this.radius <= tile.getBottom(),
            y: this.y + this.radius >= tile.getTop()
                && this.y - this.radius <= tile.getBottom()
                && this.x - this.radius >= tile.getLeft()
                && this.x + this.radius <= tile.getRight()
                || isAngleHit,
        };
        if (isHit.x || isHit.y)
            isHit.tile = tile;
        return isHit;
    }
    detectTileAngleCollision(tile) {
        const dx = [
            Math.abs(this.x - tile.getLeft()),
            Math.abs(this.x - tile.getLeft()),
            Math.abs(this.x - tile.getRight()),
            Math.abs(this.x - tile.getRight()),
        ];
        const dy = [
            Math.abs(this.y - tile.getTop()),
            Math.abs(this.y - tile.getBottom()),
            Math.abs(this.y - tile.getTop()),
            Math.abs(this.y - tile.getBottom()),
        ];
        const distance = dx.map((x, i) => {
            return Math.sqrt(Math.pow(x, 2) + Math.pow(dy[i], 2)) - this.radius;
        });
        return !!distance.find((dist) => dist <= 0);
    }
    detectWallCollision() {
        return {
            x: this.x - this.radius <= 0 || this.x + this.radius >= this.canvas.width,
            y: this.y - this.radius <= 0,
        };
    }
    revertXdirection() {
        this.stepX = -this.stepX;
    }
    revertYdirection() {
        this.stepY = -this.stepY;
    }
}
