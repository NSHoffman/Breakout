export class Tile {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    getTop() {
        return this.y;
    }
    getBottom() {
        return this.y + this.height;
    }
    getLeft() {
        return this.x;
    }
    getRight() {
        return this.x + this.width;
    }
}
