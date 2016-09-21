
var playerStrength = 4, playerAgility = 3, playerDefense = 5, playerAttack = 5, playerHealth = 100, playerMaxHealth = 100, playerLevel = 1, nextLevel =                                                                                                                                                                           [50,150,275,350,500,650,875,950,1050,1300,1500,
1675,1900,2125,2300,2525,2775,2925,3150,3500], currentXP = 0, currentGold = 0, hitChance = 80, critChance = 5, playerMelee = playerStrength * playerAttack - 7 + 10; 



//Mouse eventlisteners and mouse detection with in canvas

function handleMouseClick(evt, evty) {
    //triggers when player clicks attack
    //console.log("MouseClick X: " + evt.pageX);
    //console.log("MouseClick Y: " + evt.pageY);
    //Desktop Widescreen
    //2560x1080
    //console.log(screen.width);
    //Portrait Resolution
        
    if (screen.width > 800) {
        /*console.log(evt.pageX);
        console.log(evt.pageY);
        console.log(screen.width / 1.2);
        console.log(screen.width / 1.6);
        console.log(screen.height / 1.7);
        console.log(screen.height / 2.7);*/
        if (evt.pageX <= screen.width / 1.4 && evt.pageX >= screen.width / 1.7 &&
           evt.pageY <= screen.height / 2.5 && evt.pageY <= screen.height / 2.85) {
            attackEvents();
        }
    }
    if (screen.width <= 800) {
            //console.log(event.touches[0].pageX);
            //console.log(event.touches[0].pageY);
        if (event.touches[0].pageX <= screen.width / 1.2 && event.touches[0].pageX >= screen.width / 1.45 &&
           event.touches[0].pageY <= screen.height / 1.8 && event.touches[0].pageY <= screen.height / 1.9) {

            attackEvents();
        }
    }
    function attackEvents() {
        attackSequence++;
        slime1_right, slime1_HP = battleEvent.checkAttack(slime1_Alive, slime1_Engaged, slime1_HP, slime1_right, slime1_Melee); //Slime 1 Attack event
        slime1_right, slime2_HP = battleEvent.checkAttack(slime2_Alive, slime2_Engaged, slime2_HP, slime1_right, slime2_Melee); //Slime 2 Attack Event
        slime1_right, slime3_HP = battleEvent.checkAttack(slime3_Alive, slime3_Engaged, slime3_HP, slime1_right, slime3_Melee); //Slime 3 Attack Event
        slime1_right, slime4_HP = battleEvent.checkAttack(slime4_Alive, slime4_Engaged, slime4_HP, slime1_right, slime4_Melee); //Slime 4 Attack Event
        slime1_right, slimeEntrance1_HP = battleEvent.checkAttack(slimeEntrance1_Alive, slimeEntrance1_Engaged, slimeEntrance1_HP, slime1_right, slimeEntrance1_Melee); //Cave Entrance normal Slime
        slime1_right, slimeEntrance2_HP = battleEvent.checkAttack(slimeEntrance2_Alive, slimeEntrance2_Engaged, slimeEntrance2_HP, slime1_right, slimeEntrance2_Melee); //Super Slime
        shadewalker1_Right, shadewalker1_HP = battleEvent.checkAttack(shadewalker1_Alive, shadewalker1_Engaged, shadewalker1_HP, shadewalker1_Right, shadewalker1_Melee); //shadewalker 1
        shadewalker1_Right, shadewalker2_HP = battleEvent.checkAttack(shadewalker2_Alive, shadewalker2_Engaged, shadewalker2_HP, shadewalker1_Right, shadewalker2_Melee); //shadewalker 2
        shadekeeper1_Right, shadekeeper1_HP = battleEvent.checkAttack(shadekeeper1_Alive, shadekeeper1_Engaged, shadekeeper1_HP, shadekeeper1_Right, shadekeeper1_Melee); //shadewalker 2
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
        Context.context.beginPath(); 
        Context.context.fillStyle = "black"; 
        Context.context.fillRect(0,0,Context.width, Context.height); 
        Context.context.fill();
        Context.context.closePath();        
    };
    
    function drawPlayerinterface() {
        Context.context.beginPath();
        Context.context.fillStyle = "rgba(77,150,255,0.7)";
        Context.context.fill();
        Context.context.fillRect(475, 125, 125, 300);
        Context.context.closePath();
        Context.context.beginPath();
        Context.context.fillStyle = "rgba(77,150,255,0.7)";
        Context.context.fill();
        Context.context.fillRect(190, 100, 260, 75);
        Context.context.closePath();
        //Draws player Health
        Context.context.font = "bold 1.2em Arial"; 
        screen.width <= 699 ? Context.context.font = "bold 1.3em Arial" : false;
        Context.context.shadowColor= "black";
        Context.context.shadowBlur= 1;
        Context.context.lineWidth= 1;
        Context.context.strokeText("Player HP: ", 350, 140);
        Context.context.strokeText(playerHealth + "/" + playerMaxHealth, 360, 160);
        Context.context.shadowBlur= 0;
        Context.context.fillStyle = "white";
        if (playerHealth < playerMaxHealth / 3) {
            Context.context.fillStyle = "Crimson";
        }
        Context.context.fillText("Player HP: ", 350, 140);
        Context.context.fillText(playerHealth + "/" + playerMaxHealth, 360, 160);
        Context.context.fill();
        
    };
    var drawAttackinterface = function() {
        Context.context.font = "bold 1.2em Arial";
        
        screen.width <= 699 ? Context.context.font = "bold 1.3em Arial" : false;
        Context.context.shadowColor= "black";
        Context.context.shadowBlur= 1;
        Context.context.lineWidth= 1;
        Context.context.strokeText("Potions", 507, 350);
        Context.context.strokeText("Special", 507, 275);
        Context.context.strokeText("Attack", 507, 200);
                
        Context.context.shadowBlur= 0;
        Context.context.fillStyle = "white";
        Context.context.fillText("Potions", 507, 350);
        Context.context.fillText("Special", 507, 275);
        Context.context.fillText("Attack", 507, 200);
    };
    var drawEnemyHP = function() {
        
            //forest enemies
            slime1_Alive && slime1_Engaged ? displayEnemyHealth("Slime", slime1_HP, 25) : false;
            slime2_Alive && slime2_Engaged ? displayEnemyHealth("Slime", slime2_HP, 30) : false;
            slime3_Alive && slime3_Engaged ? displayEnemyHealth("Slime", slime3_HP, 35) : false;
            slime4_Alive && slime4_Engaged ? displayEnemyHealth("Slime", slime4_HP, 30) : false;
            //cave entrance enemies
            slimeEntrance1_Alive && slimeEntrance1_Engaged ? displayEnemyHealth("Slime", slimeEntrance1_HP, 35) : false;
            slimeEntrance2_Alive && slimeEntrance2_Engaged ? displayEnemyHealth("Slime Super", slimeEntrance2_HP, 75) : false;
            
            //cave enemies
            shadewalker1_Alive && shadewalker1_Engaged ? displayEnemyHealth("Shade Walker", shadewalker1_HP, 60) : false;
            shadewalker2_Alive && shadewalker2_Engaged ? displayEnemyHealth("Shade Walker", shadewalker2_HP, 60) : false;
            shadekeeper1_Alive && shadekeeper1_Engaged ? displayEnemyHealth("Shade Keeper", shadekeeper1_HP, 90) : false;
        
            function displayEnemyHealth(enemyName, enemyHP, totalHealth) {
                Context.context.font = "bold 1.2em Arial";
                screen.width <= 699 ? Context.context.font = "bold 1.3em Arial" : false;
                Context.context.shadowColor= "black";
                Context.context.shadowBlur= 1;
                Context.context.lineWidth= 1;
                Context.context.strokeText( enemyName + " HP: ", 200, 140);
                Context.context.strokeText( enemyHP + "/" + totalHealth, 230, 160);
               /* Context.context.strokeText("Player HP: ", 350, 140);
                Context.context.strokeText(playerHealth + "/" + playerMaxHealth, 360, 160); */
                
                Context.context.shadowBlur= 0;
                Context.context.fillStyle = "white";
                if (enemyHP < totalHealth / 3) {
                    Context.context.fillStyle = "Crimson";
                }
                Context.context.fillText( enemyName + " HP: ", 200, 140);
                Context.context.fillText( enemyHP + "/" + totalHealth, 230, 160);
            }
        };
    drawBattleBackground();
    drawPlayerinterface();
    drawEnemyHP();
    if (attackShow) {
        drawAttackinterface();
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
