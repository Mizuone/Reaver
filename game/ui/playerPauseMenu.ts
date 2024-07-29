import Player from "../engine/character/player";

export function PlayerPauseMenu(context: CanvasRenderingContext2D, player: Player) {
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
        context.fillText("DMG: " + player.damage, 30, 80);
        context.font = "bold 1em Arial";
        context.fillText("STR: " + player.strength, 30, 110);
        context.font = "bold 1em Arial";
        context.fillText("AGI: " + player.agility, 30, 140);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("DEF: " + player.defense, 30, 170);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("HP: " + player.health + "/" + player.maxHealth, 210, 80);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("Crit Chance: " + player.critchance + "%", 210, 110);
        context.font = "bold 1.5em Arial";
        context.fillStyle = "black";
        context.fillText("Information", 30, 240);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("Level: " + player.level, 30, 280);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("XP: " + player.experience, 30, 310);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("XP till level: " + player.getNextPlayerLevelExperience(), 30, 340);
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("Gold: " + player.gold, 30, 370);
        context.fill();
        context.closePath();
    }

    drawBackground();
    drawPlayerStats();
}