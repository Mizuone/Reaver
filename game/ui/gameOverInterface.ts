export function displayGameOver(context: CanvasRenderingContext2D) {    
    context.beginPath();
    context.fillStyle = "rgba(34, 34, 34, 1)";
    context.fill();
    context.fillRect(0, 0, context.canvas.offsetWidth, context.canvas.offsetHeight);
    context.closePath();


    context.shadowColor = "black";
    context.shadowBlur = 1;
    context.lineWidth = 1;
    context.font = "bold 3em Arial";
    context.strokeText("You have died!", 145, 90);

    context.font = "bold 2em Arial";
    context.strokeText('Play Again?', 220, 140);
    context.shadowBlur = 0;


    context.font = "bold 3em Arial";
    context.fillStyle = "Crimson";
    context.fillText("You have died!", 145, 90);

    context.fillStyle = "white";
    context.font = "bold 2em Arial";
    context.fillText('Play Again?', 220, 140);
    context.fill();
}