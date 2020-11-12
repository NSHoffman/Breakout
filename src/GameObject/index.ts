import { Tile } from "../Entities/Tiles";
import { Stats } from "../Stats";

export interface GameObject {
  draw(ctx: CanvasRenderingContext2D): void;
  update?(tiles?: Array<Tile>, stats?: Stats): void;
  reset?(): void;
}