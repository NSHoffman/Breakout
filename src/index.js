import { BreakoutGame } from "./Game";
import { LevelBuilder } from "./LevelBuilder";
(function () {
    const canvas = document.getElementById("canvas-BreakOut");
    const game = new BreakoutGame(new LevelBuilder(canvas, 30, 5, 5, "#0095DD"), [
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
    ]);
    game.start(100, 10, "#0095DD", 7, 10, "#FF4646", 5, -5);
})();
