import Player from "../engine/character/player";

export function PlayerMenu(context: any, playerObject: Player) {
    function drawBackground() {
        context.beginPath();
        context.fillStyle = "rgba(161, 255, 173, .8)";
        context.fillRect(0, 0, context.canvas.offsetWidth, context.canvas.offsetHeight);
        context.closePath();
        context.fill();
    }

    function drawPlayerStats() {
        context.beginPath();
        context.fillStyle = "white";
        context.moveTo(650, 200);
        context.lineTo(0, 200);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.font = "bold 1.5em Arial";
        context.fillStyle = "black";
        context.fillText("Stats", 30, 40);
        context.font = "bold 1em Arial";
        context.fillText("DMG: " + playerObject.damage, 30, 80);
        context.font = "bold 1em Arial";
        context.fillText("STR: " + playerObject.strength, 30, 110);
        context.font = "bold 1em Arial";
        context.fillText("AGI: " + playerObject.agility, 30, 140);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("DEF: " + playerObject.defense, 30, 170);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("HP: " + playerObject.health + "/" + playerObject.maxHealth, 210, 80);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("Crit Chance: " + playerObject.critchance + "%", 210, 110);
        context.font = "bold 1.5em Arial";
        context.fillStyle = "black";
        context.fillText("Information", 30, 240);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("Level: " + playerObject.level, 30, 280);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("XP: " + playerObject.experience, 30, 310);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("Gold: " + playerObject.gold, 30, 340);
        context.fill();
        context.closePath();
    }

    drawBackground();
    drawPlayerStats();
}