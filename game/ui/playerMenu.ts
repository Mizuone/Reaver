import Player from "../engine/character/player";

export function PlayerMenu(context: any, playerObject: Player) {
    function drawBackground() {
        context.beginPath();
        context.fillStyle = "rgba(32,216,219,0.75)";
        context.fillRect(0, 0, context.canvas.offsetWidth, context.canvas.offsetHeight);
        context.closePath();
        context.fill();
    }
    function equipmentClick() {
        context.beginPath(); context.font = "bold 1.5em Arial"; context.fillStyle = "black"; context.fillText("Equipment", 35, 40); context.fill(); context.closePath();
    }
    function saveClick() {
        context.beginPath(); context.font = "bold 1.5em Arial"; context.fillStyle = "black"; context.fillText("Save", 35, 85); context.fill(); context.closePath();
    }
    function exitClick() {
        context.beginPath();
        context.font = "bold 1.5em Arial";
        context.fillStyle = "black";
        context.fillText("Exit Game", 35, 130); //Title of stats
        context.fill();
        context.closePath();
    }
    function drawPlayerStats() {
        context.beginPath();
        context.fillStyle = "white";
        context.moveTo(200, 0);
        context.lineTo(200, 480);
        context.stroke();
        context.fillStyle = "white";
        context.moveTo(650, 200);
        context.lineTo(200, 200);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.font = "bold 1.5em Arial";
        context.fillStyle = "black";
        context.fillText("Status", 210, 40); //Title of stats
        context.font = "bold 1em Arial";
        context.fillText("ATK: " + playerObject.damage, 225, 80); //Strength
        context.font = "bold 1em Arial";
        context.fillText("STR: " + playerObject.strength, 225, 110); //Strength
        context.font = "bold 1em Arial";
        context.fillText("AGI: " + playerObject.agility, 225, 140); //Agility
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("DEF: " + playerObject.defense, 225, 170); //Defense
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("HP: " + playerObject.health + "/" + playerObject.maxHealth, 400, 80); //Health
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("Hit Chance: " + playerObject.hitchance + "%", 400, 110); //Hit Chance
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("Crit Chance: " + playerObject.critchance + "%", 400, 140); //Crit Chance
        context.font = "bold 1.5em Arial";
        context.fillStyle = "black";
        context.fillText("Current", 210, 225); //Title Current
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("Level: " + playerObject.level, 225, 250); //Level Current
        context.font = "bold 1em Arial";
        context.fillStyle = "black";
        context.fillText("Gold: " + playerObject.gold, 225, 290); //Gold Current
        context.fillStyle = "black";
        context.fillText("XP: " + playerObject.experience, 225, 320); //Gold Current
        context.fill();
        context.closePath();
    }
    drawBackground();
    drawPlayerStats();
    saveClick();
    exitClick();
    equipmentClick();
}