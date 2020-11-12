export class GameLost {
    draw(ctx, canvas, score) {
        const text = {
            status: "You Lost!",
            score: `Score: ${score}`,
        };
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFF";
        ctx.font = "25px sans-serif";
        ctx.fillText(text.status, canvas.width / 2 - ctx.measureText(text.status).width / 2, canvas.height / 2 - parseInt(ctx.font));
        ctx.fillText(text.score, canvas.width / 2 - ctx.measureText(text.status).width / 2, canvas.height / 2);
    }
}
export class GameWon {
    draw(ctx, canvas, score) {
        const text = {
            status: "You Won!",
            score: `Score: ${score}`,
        };
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFF";
        ctx.font = "25px sans-serif";
        ctx.fillText(text.status, canvas.width / 2 - ctx.measureText(text.status).width / 2, canvas.height / 2 - parseInt(ctx.font));
        ctx.fillText(text.score, canvas.width / 2 - ctx.measureText(text.status).width / 2, canvas.height / 2);
    }
}
