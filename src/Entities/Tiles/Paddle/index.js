import { Tile } from "../";
export class Paddle extends Tile {
    constructor(canvas, x, y, width, height, color, speed) {
        super(x, y, width, height, color);
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.initialState = {
            x: this.x,
            y: this.y,
            left: false,
            right: false,
        };
        this.left = this.initialState.left;
        this.right = this.initialState.right;
    }
    update() {
        this.left && this.moveLeft();
        this.right && this.moveRight();
    }
    reset() {
        this.x = this.initialState.x;
        this.y = this.initialState.y;
        this.left = this.initialState.left;
        this.right = this.initialState.right;
    }
    toggleLeft(state) {
        this.left = state;
    }
    toggleRight(state) {
        this.right = state;
    }
    getHeight() {
        return this.height;
    }
    getWidth() {
        return this.width;
    }
    moveLeft() {
        this.x = this.x - this.speed >= 0 ?
            this.x - this.speed : 0;
    }
    moveRight() {
        this.x = this.x + this.width + this.speed <= this.canvas.width ?
            this.x + this.speed : this.canvas.width - this.width;
    }
    move(mouseX) {
        const newPosX = mouseX - this.width / 2;
        this.x = newPosX < 0 ? 0
            : newPosX > this.canvas.width - this.width ? this.canvas.width - this.width
                : newPosX;
    }
}
