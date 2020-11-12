import { Block } from "../Entities/Tiles/Block";
export class LevelBuilder {
    constructor(canvas, startY, gapX, gapY, blockColor) {
        this.canvas = canvas;
        this.startY = startY;
        this.gapX = gapX;
        this.gapY = gapY;
        this.blockColor = blockColor;
        this.blockWidth = 0;
        this.blockHeight = 15;
    }
    buildLevel(lvl) {
        const result = [];
        const rows = lvl.length;
        if (rows > 10)
            throw new Error("The level contains to many rows!");
        lvl.forEach((row, i) => {
            this.blockWidth = (this.canvas.width - (this.gapX * (row.length + 2))) / row.length;
            row.forEach((block, j) => {
                if (block === 0)
                    return;
                result.push(new Block(this.blockWidth * j + this.gapX * (j + 1), this.blockHeight * i + this.gapY * i + this.startY, this.blockWidth, this.blockHeight, this.blockColor, block));
            });
        });
        return result;
    }
}
