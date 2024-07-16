import Enemy from "../engine/enemy/enemy";
import Player from "../engine/character/player";

export function playerBattleInterface(context: any, playerObject: any) {

  // Top Rectangle Shape
  context.beginPath();
  context.fillStyle = "rgba(77,150,255,0.7)";
  context.fill();
  context.fillRect(190, 50, 260, 75);
  context.closePath();

  // Right Rectangle Shape
  context.beginPath();
  context.fillStyle = "rgba(77,150,255,0.7)";
  context.fill();
  context.fillRect(475, 125, 125, 300);
  context.closePath();


  //Draws player Health
  context.font = "bold 1.2em Arial";
  screen.width <= 699 ? context.font = "bold 1.3em Arial" : false;

  // Player HP Black Layer
  context.shadowColor = "black";
  context.shadowBlur = 1;
  context.lineWidth = 1;
  context.strokeText("Player HP: ", 350, 85);
  context.strokeText(playerObject.health + "/" + playerObject.maxHealth, 360, 105);
  context.shadowBlur= 0;

  // Player Hp White Layer
  context.fillStyle = "white";
  if (playerObject.health < playerObject.maxHealth / 3) {
      context.fillStyle = "Crimson";
  }

  context.fillText("Player HP: ", 350, 85);
  context.fillText(playerObject.health  + "/" + playerObject.maxHealth, 360, 105);
  context.fill();
}

export function displayEnemyHealth(context: any, enemyObject: any) {
    context.font = "bold 1.2em Arial";
    screen.width <= 699 ? context.font = "bold 1.3em Arial" : false;
    context.shadowColor= "black";
    context.shadowBlur= 1;
    context.lineWidth= 1;
    context.strokeText( enemyObject.name + " HP: ", 200, 85);
    context.strokeText( enemyObject.health + "/" + enemyObject.totalHealth, 230, 105);

    context.shadowBlur= 0;
    context.fillStyle = "white";
    
    if (enemyObject.health < enemyObject.totalHealth / 3) {
        context.fillStyle = "Crimson";
    }
    context.fillText( enemyObject.name + " HP: ", 200, 85);
    context.fillText( enemyObject.health + "/" + enemyObject.totalHealth, 230, 105);
}

export function playerAttackMenu(context: any, playerObject: any) {
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

export function displayRewardMenu(context: any, enemyObject: Enemy, playerObject: Player) {
  // Bottom Rectangle Shape
  context.beginPath();
  context.fillStyle = "rgba(77,150,255,0.7)";
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
