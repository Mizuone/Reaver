
var playerStrength = 4, playerAgility = 3, playerDefense = 5, playerAttack = 5, playerHealth = 100, playerMaxHealth = 100, playerLevel = 1, nextLevel =                                                                                                                                                                           [50,150,275,350,500,650,875,950,1050,1300,1500,
1675,1900,2125,2300,2525,2775,2925,3150,3500], currentXP = 0, currentGold, hitChance = 80, critChance = 5, playerMelee = playerStrength * playerAttack - 8; 



//Mouse eventlisteners and mouse detection with in canvas

function handleMouseClick(evt) {
    //triggers when player clicks attack
    if (evt.pageX >= 550 && evt.pageX <= 700 || evt.pageX >= 766 && evt.pageX <= 830 &&
       evt.pageY >= 590 && evt.pageY <= 607 && battleScreen) {
        //Click attack Event
        attackSequence++;
        console.log(slime1_Alive);
        console.log(slime1_Engaged);
        console.log(attackSequence);
        console.log(battleScreen);
        
        attackAnimation(slime1_Alive, slime1_Engaged, playerHealth, is_playerMove, playerMelee, attackDisabled, attackShow, slime1_HP, is_slimeMove, slime1_right, slime1_Melee);
        console.log(is_playerMove);
        if( attackSequence == 1 && slime2_Engaged || attackSequence == 1 && slime3_Engaged || attackSequence == 1 && slime4_Engaged ||
          attackSequence == 1 && slimeEntrance1_Engaged || attackSequence == 1 && slimeEntrance2_Engaged) { //Each enemy has their own seperate condition
            is_playerMove = true;
            if (is_playerMove) {
                setTimeout(function() {
                if (slime1_Engaged){slime1_HP -= playerMelee;} if (slime2_Engaged){slime2_HP -= playerMelee;} if (slime3_Engaged){slime3_HP -= playerMelee;} if (slime4_Engaged){slime4_HP -= playerMelee;}if (slimeEntrance1_Engaged){slimeEntrance1_HP -= playerMelee;} //Triggers damage event against enemy
                }, 800);
                setTimeout(function() {
                    attackShow = false;
                    is_playerMove = false;
                    is_slimeMove = true;
                    attackDisabled = true;
                    slime1_right = true;
                    if (is_slimeMove && slime1_Engaged || slime2_Engaged || slime3_Engaged || slime4_Engaged ) {
                        if (slime1_Engaged){playerHealth -= slime1_Melee;} if (slime2_Engaged){playerHealth -= slime2_Melee;} if (slime3_Engaged){playerHealth -= slime3_Melee;} if (slime4_Engaged){playerHealth -= slime4_Melee;}if (slimeEntrance1_Engaged){playerHealth -= slimeEntrance1_Melee;} //Triggers damage event against player
                        setTimeout(function() {
                            attackDisabled = false;
                            attackShow = true;
                            attackSequence = 0;
                        }, 1300 );}
                }, 1800);
            }
        }
        
        if(attackSequence == 1 && slimeEntrance2_Alive == true && slimeEntrance2_Engaged == true) {
            is_playerMove = true;
            if (is_playerMove) {
                slimeEntrance2_HP -= playerMelee;
                setTimeout(function() {
                    attackShow = false;
                    is_playerMove = false;
                    is_slimeMove = true;
                    attackDisabled = true;
                    slime1_right = true;
                    if (is_slimeMove && slimeEntrance2_Alive) {
                        playerHealth -= slimeEntrance2_Melee;
                        setTimeout(function() {
                            attackDisabled = false;
                            attackShow = true;
                            attackSequence = 0;
                        }, 1500 );
                    }
                }, 2500);
            }
        }
        if(attackSequence == 1 && shadewalker1_Alive == true && shadewalker1_Engaged == true) {
            is_playerMove = true;
            if (is_playerMove) {
                shadewalker1_HP -= playerMelee;
                setTimeout(function() {
                    attackShow = false;
                    is_playerMove = false;
                    is_slimeMove = true;
                    attackDisabled = true;
                    shadewalker1_right = true;
                    if (is_slimeMove && shadewalker1_Alive) {
                        playerHealth -= shadewalker1_Melee;
                        setTimeout(function() {
                            attackDisabled = false;
                            attackShow = true;
                            attackSequence = 0;
                        }, 1500 );
                    }
                }, 2500);
            }
        }
        if(attackSequence == 1 && shadewalker2_Alive == true && shadewalker2_Engaged == true) {
            is_playerMove = true;
            if (is_playerMove) {
                shadewalker2_HP -= playerMelee;
                setTimeout(function() {
                    attackShow = false;
                    is_playerMove = false;
                    is_slimeMove = true;
                    attackDisabled = true;
                    shadewalker2_right = true;
                    if (is_slimeMove && shadewalker2_Alive) {
                        playerHealth -= shadewalker2_Melee;
                        setTimeout(function() {
                            attackDisabled = false;
                            attackShow = true;
                            attackSequence = 0;
                        }, 1500 );
                    }
                }, 2500);
            }
        }
        if(attackSequence == 1 && shadekeeper1_Alive == true && shadekeeper1_Engaged == true) {
            is_playerMove = true;
            if (is_playerMove) {
                shadekeeper1_HP -= playerMelee;
                setTimeout(function() {
                    attackShow = false;
                    is_playerMove = false;
                    is_slimeMove = true;
                    attackDisabled = true;
                    shadekeeper1_right = true;
                    if (is_slimeMove && shadekeeper1_Alive) {
                        playerHealth -= shadekeeper1_Melee;
                        setTimeout(function() {
                            attackDisabled = false;
                            attackShow = true;
                            attackSequence = 0;
                        }, 1500 );
                    }
                }, 2500);
            }
        }
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
                Context.context.fillText("Level: " + playerLevel, 225, 250); //Title Current
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
