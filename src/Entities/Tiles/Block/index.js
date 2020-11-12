import { Tile } from "../";
export class Block extends Tile {
    constructor(x, y, width, height, color, lives) {
        super(x, y, width, height, color);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lives = lives;
        this.initialState = {
            destroyed: false,
            lives: this.lives,
        };
        this.destroyed = this.initialState.destroyed;
    }
    reset() {
        this.destroyed = this.initialState.destroyed;
        this.lives = this.initialState.lives;
    }
    isDestroyed() {
        return this.destroyed;
    }
    hit() {
        this.lives > 1 ? this.lives--
            : this.lives--, this.destroyed = true;
    }
}
