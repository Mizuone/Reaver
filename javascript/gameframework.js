
var playerStrength = 4, playerAgility = 3, playerDefense = 5, playerAttack = 5, playerHealth = 100, playerMaxHealth = 100, playerLevel = 1, nextLevel =                                                                                                                                                                           [50,150,275,350,500,650,875,950,1050,1300,1500,
1675,1900,2125,2300,2525,2775,2925,3150,3500], currentXP = 0, currentGold = 0, hitChance = 80, critChance = 5, playerMelee = playerStrength * playerAttack - 8 + 10; 



//Mouse eventlisteners and mouse detection with in canvas

function handleMouseClick(evt) {
    //triggers when player clicks attack
    if (evt.pageX >= 550 && evt.pageX <= 700 && battleScreen || evt.pageX >= 766 && evt.pageX <= 830 &&
       evt.pageY >= 590 && evt.pageY <= 607 && battleScreen) {
        //Click attack Event
        attackSequence++;
        slime1_right, slime1_HP = checkAttack(slime1_Alive, slime1_Engaged, slime1_HP, slime1_right, slime1_Melee); //Slime 1 Attack event
        slime1_right, slime2_HP = checkAttack(slime2_Alive, slime2_Engaged, slime2_HP, slime1_right, slime2_Melee); //Slime 2 Attack Event
        slime1_right, slime3_HP = checkAttack(slime3_Alive, slime3_Engaged, slime3_HP, slime1_right, slime3_Melee); //Slime 3 Attack Event
        slime1_right, slime4_HP = checkAttack(slime4_Alive, slime4_Engaged, slime4_HP, slime1_right, slime4_Melee); //Slime 4 Attack Event
        slime1_right, slimeEntrance1_HP = checkAttack(slimeEntrance1_Alive, slimeEntrance1_Engaged, slimeEntrance1_HP, slime1_right, slimeEntrance1_Melee); //Cave Entrance normal Slime
        slime1_right, slimeEntrance2_HP = checkAttack(slimeEntrance2_Alive, slimeEntrance2_Engaged, slimeEntrance2_HP, slime1_right, slimeEntrance2_Melee); //Super Slime
        shadewalker1_Right, shadewalker1_HP = checkAttack(shadewalker1_Alive, shadewalker1_Engaged, shadewalker1_HP, shadewalker1_Right, shadewalker1_Melee); //shadewalker 1
        shadewalker1_Right, shadewalker2_HP = checkAttack(shadewalker2_Alive, shadewalker2_Engaged, shadewalker2_HP, shadewalker1_Right, shadewalker2_Melee); //shadewalker 2
        shadekeeper1_Right, shadekeeper1_HP = checkAttack(shadekeeper1_Alive, shadekeeper1_Engaged, shadekeeper1_HP, shadekeeper1_Right, shadekeeper1_Melee); //shadewalker 2
    }
    
};
//monitors player currentXP if its greater than or = to the values in Nextlevel, player level will increase
function playerMonitor() {
    for (var i = 0; i <= nextLevel.length; i++) {
        if (currentXP == nextLevel[i]) {
            playerLevel++, playerStrength += 2, playerAgility += 2, playerAttack += 2, playerDefense++,
            playerMaxHealth += 10, playerHealth += 10;
            for (v = 1; v <= playerMaxHealth; v++) {
                if (playerHealth < playerMaxHealth) {
                    playerHealth++;
                }
            }
        }
    }
};

function drawBattleUI() {
    function drawBattleBackground() {
        Context.context.beginPath(); Context.context.fillStyle = "black"; Context.context.fillRect(0,0,Context.width, Context.height); Context.context.fill();Context.context.closePath();        
    };
    
    function drawPlayerinterface() {
        Context.context.beginPath();
        Context.context.fillStyle = "rgba(77,255,198,0.9)";
        Context.context.fill();
        Context.context.fillRect(140,360, 350, 110);
        Context.context.closePath();
        //Draws player Health
        Context.context.beginPath(); Context.context.font = "bold 1em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Player HP: " + playerHealth + "/" + playerMaxHealth, 300, 450); Context.context.fill(); Context.context.closePath();
    };
    var drawAttackinterface = function() {
        Context.context.beginPath();
        Context.context.font = "bold 1em Arial";
        Context.context.fillStyle = "black";
        Context.context.fillText("Attack", 170, 400);
        Context.context.fill();
        Context.context.closePath();
    };
    var drawAttackDisabled = function() {
        Context.context.beginPath();
        Context.context.font = "bold 1em Arial";
        Context.context.fillStyle = "#99968C";
        Context.context.fillText("Attack", 170, 400);
        Context.context.fill();
        Context.context.closePath();
    };
    var drawEnemyHP = function() {
        
        //draws slime1 Hp bar
        if(slime1_Alive && slime1_Engaged) { Context.context.beginPath();  Context.context.font = "bold 1em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Slime HP: " + slime1_HP + "/" + " 25", 300, 400); Context.context.fill();  Context.context.closePath(); }
        if(slime2_Alive && slime2_Engaged) { Context.context.beginPath();  Context.context.font = "bold 1em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Slime HP: " + slime2_HP + "/" + " 30", 300, 400); Context.context.fill();  Context.context.closePath(); }
        if(slime3_Alive && slime3_Engaged) { Context.context.beginPath();  Context.context.font = "bold 1em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Slime HP: " + slime3_HP + "/" + " 35", 300, 400); Context.context.fill();  Context.context.closePath(); }
        if(slime4_Alive && slime4_Engaged) { Context.context.beginPath();  Context.context.font = "bold 1em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Slime HP: " + slime4_HP + "/" + " 30", 300, 400); Context.context.fill();  Context.context.closePath(); }
        if(slimeEntrance1_Alive && slimeEntrance1_Engaged) { Context.context.beginPath();  Context.context.font = "bold 1em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Slime HP: " + slimeEntrance1_HP + "/" + " 35", 300, 400); Context.context.fill();  Context.context.closePath(); }
        if(slimeEntrance2_Alive && slimeEntrance2_Engaged) { Context.context.beginPath();  Context.context.font = "bold 1em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Slime Super HP: " + slimeEntrance2_HP + "/" + " 75", 300, 400); Context.context.fill();  Context.context.closePath(); }
        if(shadewalker1_Alive && shadewalker1_Engaged) { Context.context.beginPath();  Context.context.font = "bold 1em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Shade Walker HP: " + shadewalker1_HP + "/" + " 60", 300, 400); Context.context.fill();  Context.context.closePath(); }
        if(shadewalker2_Alive && shadewalker2_Engaged) { Context.context.beginPath();  Context.context.font = "bold 1em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Shade Walker HP: " + shadewalker2_HP + "/" + " 60", 300, 400); Context.context.fill();  Context.context.closePath(); }
        if(shadekeeper1_Alive && shadekeeper1_Engaged) { Context.context.beginPath();  Context.context.font = "bold 1em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Shade Keeper HP: " + shadekeeper1_HP + "/" + " 90", 300, 400); Context.context.fill();  Context.context.closePath(); }
        };
    drawBattleBackground();
    drawPlayerinterface();
     drawEnemyHP();
    if (attackShow) {
        drawAttackinterface();
    }
    if (attackDisabled) {
        drawAttackDisabled();
    }
}

function drawUI() {
            function drawBackground() {
                Context.context.beginPath();
                Context.context.fillStyle = "rgba(32,216,219,0.75)";
                Context.context.fillRect(0,0,Context.width, Context.height);
                Context.context.closePath();
                Context.context.fill();
            }
            var equipmentClick = function() {
                Context.context.beginPath(); Context.context.font = "bold 1.5em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Equipment", 35, 40); Context.context.fill(); Context.context.closePath();
            }
            var saveClick = function() {
                Context.context.beginPath(); Context.context.font = "bold 1.5em Arial"; Context.context.fillStyle = "black"; Context.context.fillText("Save", 35, 85);Context.context.fill(); Context.context.closePath();
            }
            var exitClick = function() {
                Context.context.beginPath();
                Context.context.font = "bold 1.5em Arial";
                Context.context.fillStyle = "black";
                Context.context.fillText("Exit Game", 35, 130); //Title of stats
                Context.context.fill();
                Context.context.closePath();
            }
            function drawPlayerStats() {
                Context.context.beginPath();
                Context.context.fillStyle = "white";
                Context.context.moveTo(200, 0);
                Context.context.lineTo( 200, 480);
                Context.context.stroke();
                Context.context.fillStyle = "white";
                Context.context.moveTo(650, 200);
                Context.context.lineTo( 200, 200);
                Context.context.stroke();
                Context.context.closePath();
                Context.context.beginPath();
                Context.context.font = "bold 1.5em Arial";
                Context.context.fillStyle = "black";
                Context.context.fillText("Status", 210, 40); //Title of stats
                Context.context.font = "bold 1em Arial";
                Context.context.fillText("ATK: " + playerAttack, 225, 80); //Strength
                Context.context.font = "bold 1em Arial";
                Context.context.fillText("STR: " + playerStrength, 225, 110); //Strength
                Context.context.font = "bold 1em Arial";
                Context.context.fillText("AGI: " + playerAgility, 225, 140); //Agility
                Context.context.font = "bold 1em Arial";
                Context.context.fillStyle = "black";
                Context.context.fillText("DEF: " + playerDefense, 225, 170); //Defense
                Context.context.font = "bold 1em Arial";
                Context.context.fillStyle = "black";
                Context.context.fillText("HP: " + playerHealth + "/" + playerMaxHealth, 400, 80); //Health
                Context.context.font = "bold 1em Arial";
                Context.context.fillStyle = "black";
                Context.context.fillText("Hit Chance: " + hitChance + "%", 400, 110); //Hit Chance
                Context.context.font = "bold 1em Arial";
                Context.context.fillStyle = "black";
                Context.context.fillText("Crit Chance: " + critChance + "%", 400, 140); //Crit Chance
                Context.context.font = "bold 1.5em Arial";
                Context.context.fillStyle = "black";
                Context.context.fillText("Current", 210, 225); //Title Current
                Context.context.font = "bold 1em Arial";
                Context.context.fillStyle = "black";
                Context.context.fillText("Level: " + playerLevel, 225, 250); //Level Current
                Context.context.font = "bold 1em Arial";
                Context.context.fillStyle = "black";
                Context.context.fillText("Gold: " + currentGold, 225, 290); //Gold Current
                Context.context.fillStyle = "black";
                Context.context.fillText("XP: " + currentXP, 225, 320); //Gold Current
                Context.context.fill();
                Context.context.closePath();
            }
            drawBackground();
            drawPlayerStats();
            saveClick();
            exitClick();
            equipmentClick();
};

 function collisionDection() {
     //Player x-axis canvas collision
    if (player_coordinates_x > Context.width - 30) {
        player_coordinates_x = 610;
    }
    if(player_coordinates_x <= 0) {
        player_coordinates_x = 0;
    }
    //Player y-axis canvas collision
    if(player_coordinates_y > Context.height - 35) {
        player_coordinates_y = 445;
    }
    if(player_coordinates_y < 0){
        player_coordinates_y = 0;
    }
    

 };
