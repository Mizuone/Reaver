import Enemy from "../engine/enemy/enemy";
import Player from "../engine/character/player";

export function displayPlayerHealth(context: CanvasRenderingContext2D, playerObject: Player) {
	context.beginPath();
	context.fillStyle = "rgba(77, 150, 255, 0.9)";
	context.fill();
	context.fillRect(315, 40, 165, 75);
	context.closePath();

	context.font = "bold 1.2em Arial";
	screen.width <= 699 ? context.font = "bold 1.3em Arial" : false;

	context.shadowColor = "black";
	context.shadowBlur = 1;
	context.lineWidth = 1;
	context.strokeText("Player", 365, 75);
	context.strokeText(`HP: ${playerObject.health}/${playerObject.maxHealth}`, 345, 95);
	context.shadowBlur = 0;

	context.fillStyle = "white";
	if (playerObject.health < playerObject.maxHealth / 3) {
		context.fillStyle = "Crimson";
	}

	context.fillText("Player", 365, 75);
	context.fillText(`HP: ${playerObject.health}/${playerObject.maxHealth}`, 345, 95);
	context.fill();
}

export function displayEnemyHealth(context: CanvasRenderingContext2D, enemyObject: Enemy) {
	context.beginPath();
	context.fillStyle = "rgba(125, 50, 75, 1)";
	context.fill();
	context.fillRect(142, 40, 165, 75);
	context.closePath();

	context.font = "bold 1.2em Arial";
	screen.width <= 699 ? context.font = "bold 1.3em Arial" : false;
	context.shadowColor= "black";
	context.shadowBlur= 1;
	context.lineWidth= 1;
	context.strokeText( enemyObject.name, 170, 75);
	context.strokeText(`HP: ${enemyObject.health}/${enemyObject.totalHealth}`, 185, 95);

	context.shadowBlur= 0;
	context.fillStyle = "white";
	context.fillText(enemyObject.name, 170, 75);
	
	if (enemyObject.health < enemyObject.totalHealth / 3) {
		context.fillStyle = "Crimson";
	}

	context.fillText(`HP: ${enemyObject.health}/${enemyObject.totalHealth}`, 185, 95);
}

export function playerAttackMenu(context: CanvasRenderingContext2D, playerObject: Player) {
	context.beginPath();
	context.fillStyle = "rgba(77,150,255,0.9)";
	context.fill();
	context.fillRect(475, 125, 125, 300);
	context.closePath();

	context.font = "bold 1.2em Arial";

	screen.width <= 699 ? context.font = "bold 1.3em Arial" : false;
	context.shadowColor= "black";
	context.shadowBlur= 1;
	context.lineWidth= 1;
	context.strokeText("Potions", 507, 350);
	context.strokeText("Special", 507, 275);
	context.strokeText("Attack", 507, 200);

	context.shadowBlur= 0;
	context.fillStyle = "grey";
	context.fillText("Potions", 507, 350);
	context.fillText("Special", 507, 275);
	
	context.fillStyle = "white";
	if (playerObject.disableAttack) {
	context.fillStyle = "grey";
	}
	context.fillText("Attack", 507, 200);
}

export function displayRewardMenu(context: CanvasRenderingContext2D, enemyObject: Enemy) {
	context.beginPath();
	context.fillStyle = "rgba(77,150,255,0.9)";
	context.fill();
	context.fillRect(190, 350, 260, 75);
	context.closePath();

	context.font = "bold 1.2em Arial";
	screen.width <= 699 ? context.font = "bold 1.3em Arial" : false;
	context.shadowColor = "black";
	context.shadowBlur = 1;
	context.lineWidth = 1;
	context.strokeText(`${enemyObject.name} Slain!`, 200, 370);
	context.strokeText(`+${enemyObject.goldReward} gold coins`, 200, 395);
	context.strokeText(`+${enemyObject.experienceReward} Experience`, 200, 420);

	context.shadowBlur = 0;
	context.fillStyle = "white";
	context.fillText(`${enemyObject.name} Slain!`, 200, 370);
	context.fillText(`+${enemyObject.goldReward} gold coins`, 200, 395);
	context.fillText(`+${enemyObject.experienceReward} Experience`, 200, 420);
}

export function displayLevelUp(context: CanvasRenderingContext2D, playerObject: Player) {
	context.beginPath();
	context.fillStyle = "rgba(77, 150, 255, 0.9)";
	context.fill();
	context.fillRect(190, 435, 260, 35);
	context.closePath();

	context.font = "bold 1.2em Arial";
	screen.width <= 699 ? context.font = "bold 1.3em Arial" : false;
	context.shadowColor = "black";
	context.shadowBlur = 1;
	context.lineWidth = 1;
	context.strokeText(`Reached level ${playerObject.level}!`, 240, 458);

	context.shadowBlur = 0;
	context.fillStyle = "white";
	context.fillText(`Reached level ${playerObject.level}!`, 240, 458);
}

export function displayFallenText(context: CanvasRenderingContext2D) {
	context.beginPath();
	context.fillStyle = "rgba(77, 150, 255, 0.9)";
	context.fill();
	context.fillRect(190, 350, 260, 35);
	context.closePath();

	context.font = "bold 1.2em Arial";
	screen.width <= 699 ? context.font = "bold 1.3em Arial" : false;
	context.shadowColor = "black";
	context.shadowBlur = 1;
	context.lineWidth = 1;
	context.strokeText(`You have fallen in battle!`, 207, 375);

	context.shadowBlur = 0;
	context.fillStyle = "white";
	context.fillText(`You have fallen in battle!`, 207, 375);
}