import { Block } from "../Entities/Tiles/Block";


export type Level = Array<number>[];

export class LevelBuilder {
  constructor(
      private canvas: HTMLCanvasElement,
      private startY: number, 
      private gapX: number, private gapY: number,
      private blockColor: string,
  ) {}
  private blockWidth: number = 0;
  private blockHeight: number = 15;

  public buildLevel(lvl: Level): Array<Block> | never {
      const result: Array<Block> = [];
      const rows: number = lvl.length;

      if (rows > 10) throw new Error("The level contains to many rows!");

      lvl.forEach((row: Array<number>, i: number) => {
          this.blockWidth = (this.canvas.width - (this.gapX * (row.length + 2))) / row.length;
          
          row.forEach((block: number, j: number) => {
              if (block === 0) return;
              result.push(new Block(
                  this.blockWidth * j + this.gapX * (j + 1),
                  this.blockHeight * i + this.gapY * i + this.startY,
                  this.blockWidth, this.blockHeight, this.blockColor, block
              ));
          });
      });

      return result;
  }
}