import { Block } from "../Entities/Tiles/Block";
export class Stats {
    constructor(blocks, ptsForHit) {
        this.blocks = blocks;
        this.ptsForHit = ptsForHit;
        this.combo = 0;
        this.score = 0;
        this.lives = 3;
    }
    reset() {
        this.lives = 3;
        this.score = 0;
        this.dropCombo();
        this.blocks.forEach((b) => b.reset());
    }
    getRemainingBlocks() {
        return this.blocks.filter((b) => !b.isDestroyed());
    }
    getLives() {
        return this.lives;
    }
    incrementLives() {
        ++this.lives;
    }
    decrementLives() {
        this.lives && --this.lives;
    }
    getScore() {
        return this.score;
    }
    getCombo() {
        return this.combo;
    }
    dropCombo() {
        this.combo = 0;
    }
    incrementCombo() {
        this.combo++;
    }
    updateScore(tile) {
        if (tile && tile instanceof Block) {
            tile.hit();
            if (tile.isDestroyed()) {
                this.score += this.ptsForHit + (this.combo / 10) * this.ptsForHit;
            }
            this.incrementCombo();
        }
        else
            this.dropCombo();
    }
}
