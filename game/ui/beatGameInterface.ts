export function displayBeatGame(context: CanvasRenderingContext2D) {    
    context.beginPath();
    context.fillStyle = "rgba(97, 176, 250, 1)";
    context.fill();
    context.fillRect(0, 0, context.canvas.offsetWidth, context.canvas.offsetHeight);
    context.closePath();

    context.shadowColor = "black";
    context.shadowBlur = 1;
    context.lineWidth = 1;

    context.font = "bold 2rem Arial";
    context.strokeText('Play Again?', 230, 140);
    context.shadowBlur = 0;

    context.font = "bold 2.5rem Arial";
    context.fillStyle = "rgba(15, 15, 15, 1)";
    context.fillText("You beat the game!", 135, 90);

    context.fillStyle = "white";
    context.font = "bold 2rem Arial";
    context.fillText('Play Again?', 230, 140);
    context.fill();
}