"use strict";
if (typeof(Reaver === "undefined")) {
    var Reaver = {};
} else {
    console.log("Object Reaver is of invalid type!")
}

(function() {
    //All Sprite Terrain Objects are loaded first

    //Player constructor Object
    /*This is used to create a player object, the object will have stats and a healthpool
    /*The Object will have x_y coordinates for attack animations, and general positioning
    /*Booleans values are used to check for attacking and movement
    /* */

    Reaver = function() {

        //Slime Constructor Object
        /*Creates a slime enemy object, the object will have general stats(HP,MP,Defense,)
        /*Object has x,y axis coordinates and battle system states
        /*Slime Object will has boolean values that handle if its moving, direction, and animation
        /* */
        Reaver.Enemy = function(enemy) {
            //Loading of sprite object
            if(enemy === "slimeload") {
                this.slimeSprite = new Sprite("sprites/slime_spritesheet.png");
                this.slimeSprite.image.width = 32;
                this.slimeSprite.image.height = 32;
                console.log("Normal Slime Loaded");
            }
            this.enemy_Melee = 5;
            this.enemy_HP = 25;
            //If the slime is a elite enemy
            this.slimeSuper = function(makeSuper) {
                if(enemy === "super") {
                    this.slimeSprite = new Sprite("sprites/slimeSuper_spritesheet.png")
                    console.log("Super Created");
                }
            }
            //Positioning of slime for axis values
            this.enemy_startY = null;
            this.enemy_startX = null;

            //if the slime is currently alive
            this.enemy_Alive = true;

            //slime movement directions for pathing
            this.enemy_Left = false;
            this.enemy_Right = false;
            this.enemy_Up = false;
            this.enemy_Down = false;

            //Used for battle system, if the object is aggroed then display battle screen
            //is_slimeMove is if the slime is currently moving
            this.enemy_Engaged = false;
            this.is_enemyMove = false;
        }
        /*Battle System Frame
        *Constructor Object for Mouse click events, and methods for handling battle movements
        *Attack Animation function is used to control the click for attacking an enemy, it also triggers player and enemy movement.
        */
        Reaver.Battler = function() {
                 this.playerMoveChange = function(changeMove) {
                    is_playerMove = changeMove;
                    if (changeMove === 1) {
                        changeMove = true;
                    }else {
                        changeMove = false;
                    }
                    return changeMove;
                };
                 this.enemyMoveChange = function(enemyMovement) {
                    if (enemyMovement === 1) {
                        return true;
                    }else {
                        return false;
                    }
                };
                this.enemyRightChange = function(enemyDirection) {
                    if (enemyDirection === 1) {
                        return true;
                    }else {
                        return false;
                    }
                };
                this.enemyDamage = function(enemy_hp) {
                   return enemy_hp -= playerMelee;
                };
                this.enemyHit = function(enemy_Attack) {
                    return playerHealth -= enemy_Attack;
                }
                this.checkAttack = function(Alive, Engaged, enemyHP, enemyDirection, enemyAttack) {
                    var enemyHealth = enemyHP;
                    var enemyPlace = enemyDirection;
                    var enemyDoAttack = enemyAttack;
                    var enemyDeath = false;
                    if (attackSequence === 1 && Alive && Engaged) {
                        this.playerMoveChange(1);
                        if (is_playerMove) {
                            enemyHealth = this.enemyDamage(enemyHP);
                            stabilize();
                            if (enemyDeath) {
                                return enemyDoAttack, enemyPlace, Alive, Engaged, enemyHealth;
                            }
                            setTimeout(function() {
                                attackShow = false;
                                is_playerMove = false;
                                is_slimeMove = true;
                                enemyPlace = true;
                                //Resets all values to default when player attack and slime attack is fired
                                //stabilize();
                                    if (is_slimeMove && Alive) {
                                        enemyDoAttack = playerHealth -= enemyAttack;
                                        setTimeout(function() {
                                        attackShow = true;
                                        attackSequence = 0;
                                        enemyPlace = false;
                                    }, 1500 );
                                }
                            }, 2500);
                        }
                    }
                    //Resets all values to a normal cycle when slime hp is undefined or < 0
                        function stabilize() {
                        if (enemyHealth === undefined || enemyHealth <= 0) {
                            enemyHealth = 0;
                            enemyDeath = true;
                            is_slimeMove = false;
                            setTimeout(function() {
                            is_playerMove = true;
                            $(Context.canvas).on("touchstart", preventMotion);
                            if (is_playerMove) {
                                    attackShow = false;
                                    is_playerMove = false;
                                    is_slimeMove = true;
                                    enemyPlace = true;
                                        if (is_slimeMove && Alive) {
                                            setTimeout(function() {
                                            attackShow = true;
                                            attackSequence = 0;
                                            enemyPlace = false;
                                        }, 50 );
                                    }
                                }
                            }, 50)
                        }
                    }
                    return enemyDoAttack, enemyPlace, Alive, Engaged, enemyHealth;
                };
                 this.enemyBattleMovement = function(Engaged, drawType) {
                    drawBattleMap();
                    var enemyAnimation = drawType;
                    var enemyEngagement = Engaged;
                    var resetEnemyPositionX = 250;
                    var resetEnemyPositionY = 250;
                    var enemyMovementSpeed = 2;
                    function checkDrawType() {
                        if (enemyAnimation === "slime") {slimeSprite.draw(slime1_x, slime1_y, [6,7,8]);}
                        if (enemyAnimation === "slimesuper") {slimeSuper_Sprite.draw(slime1_x, slime1_y, [6,7,8]);}
                        if (enemyAnimation === "shadewalker") {shadeWalker_Sprite.draw(slime1_x, slime1_y, [6,7,8]);}
                        if (enemyAnimation === "shadekeeper") {shadeKeeper_Sprite.draw(slime1_x, slime1_y, [6,7,8]);}
                    }
                    if (enemyEngagement) {
                                if (is_slimeMove) {
                                    checkDrawType();
                                    if (slime1_x < 350 && slime1_right == true) {
                                        slime1_x += enemyMovementSpeed;
                                        if (slime1_x >= 325) {
                                            slime1_right = false;
                                            slime1_left = true;
                                        }
                                    }
                                    if (slime1_x <= 330 && slime1_left == true) {
                                        slime1_x -= enemyMovementSpeed;
                                        if (slime1_x <= 250) {
                                            slime1_left = false;
                                            slime1_right = true;
                                            is_slimeMove = false;
                                        }
                                    }
                                } else {
                                    slime1_x = resetEnemyPositionX;
                                    slime1_y = resetEnemyPositionY;
                                    checkDrawType();
                                }
                        }
                    playerBattleMovement();

                    return enemyEngagement;
                };
        }

    };
    Reaver();


})();
    var Player = new Reaver.Player();
    var battleEvent = new Reaver.Battler();
/*Battle System Attack Click Event Structure
/*PlayerMoveChange will change status of if player is moving
/*enemyMoveChange will change status of if enemy is moving
/*enemyRightChange will change the direction of enemy inside of the battle map
/*enemyDamage will accept a numeric value and minus that value from playerMelee
/*enemyHit will accept a numeric value and minus it from PlayerHealth
/*checkAttack is the main function that calls upon the above functions for processing
/*To use the function: variable_direction, variable_enemyHP = checkAttack(enemy_Alive, enemy_Engaged, enemy_HP, enemy_Direction, enemy_Attack);
/*/

function preventMotion(event) {
                window.scrollTo(0, 1);
                event.preventDefault();
                event.stopPropagation();
            }

function checkBattle() {
    if (battleScreen) {
        $(Context.canvas).off("touchstart", preventMotion);
    }
    if (!battleScreen) {
        $(Context.canvas).on("touchstart", preventMotion);
    }
}
function playerBattleMovement() {
            if (is_playerMove) {
                    player_sprite.draw(player_coordinates_x, player_coordinates_y, [3,4,5]); //Redraws based off player x, and player y /

                    if (player_coordinates_x < 355 && player_moveLeft) {
                        player_coordinates_x -= 2;

                            if(player_coordinates_x >= 260 && player_coordinates_x <= 270) {
                                    player_Attackhit = true;
                                if(player_Attackhit) {
                                    playerAttackhit_Sprite.draw(250, 250, [0,1,2]);
                                    setTimeout(function(){
                                        player_Attackhit = false;
                                    }, 200);
                                }
                            }

                        if (player_coordinates_x <= 260) {
                            player_moveLeft = false;
                            player_moveRight = true;
                        }
                    }
                    if (player_coordinates_x > 250 && player_moveRight) {
                        player_coordinates_x += 1.5;
                        if (player_coordinates_x == 350) {
                            player_moveRight = false;
                            player_moveLeft = true;
                            is_playerMove = false;

                        }
                    }
                } else {
                   player_sprite.draw(player_coordinates_x, player_coordinates_y, [3,4,5]);
                   player_coordinates_x = 350;
                   player_coordinates_y = 250;

                }
};
        function cancelAnimation() {
            cancelAnimationFrame(requestID);
        };
        function playerDeathReset() {
            if (playerHealth <= 0 || playerHealth === "undefined") {playerHealth = 0; window.location.reload();}
        };
        var freezeMovement = false,
        is_playerMove = false, player_moveRight = false, player_moveLeft = true, attackShow = true,
        Context = null,
        delayAmount = -2,
        player_coordinates_x = 355,  //10 starter //590 end ======= Slimes 150 X Slimes 130 Y
        player_coordinates_y = 75, //352 starter //94 end
        player_Attackhit = false,
        playerAttack_x = 0,
        playerAttack_y = 0,

        //object properties being set
        playerAttackhit_Sprite,image,width = 32;
        playerAttackhit_Sprite.image.height = 32;

        player_sprite.image.width = 32;
        player_sprite.image.height = 32;


          var  slime1_x = 150, slime1_y = 150, slime1_Alive = true, slime1_left = false, slime1_right = true, slime1_Engaged = false,
            is_slimeMove = false;
            slimeSprite.image.width = 32;
            slimeSprite.image.height = 32;
            slimeSuper_Sprite.image.width = 32;
            slimeSuper_Sprite.image.height = 32;

        var slime2_Alive = true, slime2_x = 450, slime2_y = 150, slime2_Left = false, slime2_Right = true, slime2_Engaged = false,
            slime3_Alive = true, slime3_x = 285, slime3_y = 250, slime3_Up = false, slime3_Down = true, slime3_Engaged = false,
            slime4_Alive = true, slime4_x = 275, slime4_y = 210, slime4_Left = false, slime4_Right = true, slime4_Engaged = false;

         var slimeEntrance1_Alive = true, slimeEntrance1_x = 275, slimeEntrance1_y = 210, slimeEntrance1_Left = false, slimeEntrance1_Right = true,                        slimeEntrance1_Engaged = false,
             slimeEntrance2_Alive = true, slimeEntrance2_x = 375, slimeEntrance2_y = 100, slimeEntrance2_Left = false, slimeEntrance2_Right = true,                        slimeEntrance2_Engaged = false,
             shadewalker1_Alive = true, shadewalker1_x = 150, shadewalker1_y = 130, shadewalker1_Left = false, shadewalker1_Right = true, shadewalker1_Engaged = false,
             shadewalker2_Alive = true, shadewalker2_x = 440, shadewalker2_y = 130, shadewalker2_Left = false, shadewalker2_Right = true, shadewalker2_Engaged = false,shadekeeper1_Alive = true, shadekeeper1_x = 250, shadekeeper1_y = 200, shadekeeper1_Left = false, shadekeeper1_Right = true, shadekeeper1_Engaged = false;
        shadeWalker_Sprite.image.width = 32; shadeWalker_Sprite.image.height = 32; shadeKeeper_Sprite.image.width = 32; shadeKeeper_Sprite.image.height = 32;
        var battleScreen = false,
            playerDirection = 0,
            requestID,
            playerMenu = 0,
            attackSequence = 0,
            playerSequence = 0;

    if (slime1_Alive) { var slime1_Melee = 5, slime1_HP = 25;}
    if (slime2_Alive) { var slime2_Melee = 5, slime2_HP = 30;}
    if (slime3_Alive) { var slime3_Melee = 5, slime3_HP = 35;}
    if (slime4_Alive) { var slime4_Melee = 5, slime4_HP = 30;}
    if (slimeEntrance1_Alive) { var slimeEntrance1_Melee = 7, slimeEntrance1_HP = 35;}
    if (slimeEntrance2_Alive) { var slimeEntrance2_Melee = 15, slimeEntrance2_HP = 75;}

    if (shadewalker1_Alive) { var shadewalker1_Melee = 10, shadewalker1_HP = 60;}
    if (shadewalker2_Alive) { var shadewalker2_Melee = 10, shadewalker2_HP = 60;}
    if (shadekeeper1_Alive) { var shadekeeper1_Melee = 20, shadekeeper1_HP = 90;}





        var mapBattleIndex = 0;


        function resetPlayerPositionX(playerx) {
            return playerx;
        };
        function resetPlayerPositionY(playery) {
            return playery;
        };
        //Resets enemyObject in drawBattle map
        function resetSlime(pos) {
            return pos;
        };
        function rewardPlayer(enemyType) {
            if (enemyType === "slime" || enemyType === "shadewalker") { currentXP += 25; currentGold += 25;}
            if (enemyType === "slimesuper" || enemyType === "shadekeeper") {currentXP += 25; currentGold += 25;}
        };

        function registerDeath(enemyAlive, callbackFun, enemyType, resetPlayerX, resetPlayerY) {
            var enemyisAlive = enemyAlive;
            rewardPlayer(enemyType);
                enemyisAlive = false;
                is_slimeMove = false;
                battleScreen = false;
                attackSequence = 0;
                slime1_x, slime1_y = resetSlime(150);
                player_coordinates_x = resetPlayerPositionX(resetPlayerX);
                player_coordinates_y = resetPlayerPositionY(resetPlayerY);
                playerMonitor();
                callbackFun;
                return enemyisAlive;
        };

    function drawBattle() {
        requestID = requestAnimationFrame(drawBattle);
        if (battleScreen) {
            playerDeathReset(); //checks if player health is below 0 if so reset game
                addEventListener(document, "touchstart", function(e) {
                    e.preventDefault();
                }, Modernizr.passiveeventlisteners ? {passive: true} : false);
            mobileControls();
                resetAnimationCounter();
                drawBattleUI();
                drawBattleMap();
                checkBattle();
                var playerSequence = 0;
                playerDirection = 0;

            //Triggers when attack is clicked
            if(slime1_Engaged && slime1_Alive) {battleEvent.enemyBattleMovement(slime1_Engaged, "slime");}
            if(slime2_Engaged && slime2_Alive) {battleEvent.enemyBattleMovement(slime2_Engaged, "slime");}
            if(slime3_Engaged && slime3_Alive) {battleEvent.enemyBattleMovement(slime3_Engaged, "slime");}
            if(slime4_Engaged && slime4_Alive) {battleEvent.enemyBattleMovement(slime4_Engaged, "slime");}
            if(slimeEntrance1_Engaged && slimeEntrance1_Alive) {battleEvent.enemyBattleMovement(slimeEntrance1_Engaged, "slime");}
            if(slimeEntrance2_Engaged && slimeEntrance2_Alive) {battleEvent.enemyBattleMovement(slimeEntrance2_Engaged, "slimesuper");}
            if(shadewalker1_Engaged && shadewalker1_Alive) {battleEvent.enemyBattleMovement(shadewalker1_Engaged, "shadewalker");}
            if(shadewalker2_Engaged && shadewalker2_Alive) {battleEvent.enemyBattleMovement(shadewalker2_Engaged, "shadewalker");}
            if(shadekeeper1_Engaged && shadekeeper1_Alive) {battleEvent.enemyBattleMovement(shadekeeper1_Engaged, "shadekeeper");}

            //Draw Forest Mobs (Slimes)
            if(slime1_HP <= 0 && slime1_Alive && player_coordinates_x === 350) {cancelAnimation(); slime1_Engaged, slime1_Alive = registerDeath(slime1_Alive, drawForest(), "slime", 312, 156);}
            if(slime2_HP <= 0 && slime2_Alive && player_coordinates_x === 350) {cancelAnimation(); slime2_Engaged, slime2_Alive = registerDeath(slime2_Alive, drawForest(), "slime", 542, 154);}
            if(slime3_HP <= 0 && slime3_Alive && player_coordinates_x === 350) {cancelAnimation(); slime3_Engaged, slime3_Alive = registerDeath(slime3_Alive, drawForest(), "slime", 290, 290);}
            if(slime4_HP <= 0 && slime4_Alive && player_coordinates_x === 350) {cancelAnimation(); slime4_Engaged, slime4_Alive = registerDeath(slime4_Alive, drawForest(), "slime", 312, 200);}

            //Cave Entrance Mobs (Slime & SlimeSuper)
            if(slimeEntrance1_HP <= 0 && slimeEntrance1_Alive && player_coordinates_x === 350) {cancelAnimation(); slimeEntrance1_Engaged, slimeEntrance1_Alive = registerDeath(slimeEntrance1_Alive, caveEntrance(), "slime", 350, 175);}
            if(slimeEntrance2_HP <= 0 && slimeEntrance2_Alive && player_coordinates_x === 350) {cancelAnimation(); slimeEntrance2_Engaged, slimeEntrance2_Alive = registerDeath(slimeEntrance2_Alive, caveEntrance(), "slimesuper", 264, 220);}

            //Cave Instance (Shadewalkers & shadekeeper(Boss))
            if(shadewalker1_HP <= 0 && shadewalker1_Alive && player_coordinates_x === 350) {cancelAnimation(); shadewalker1_Engaged, shadewalker1_Alive = registerDeath(shadewalker1_Alive, cave_level1(), "shadewalker", 196, 176);}
            if(shadewalker2_HP <= 0 && shadewalker2_Alive && player_coordinates_x === 350) {cancelAnimation(); shadewalker2_Engaged, shadewalker2_Alive = registerDeath(shadewalker2_Alive, cave_level1(), "shadewalker", 472, 130);}
            if(shadekeeper1_HP <= 0 && shadekeeper1_Alive && player_coordinates_x === 350) {cancelAnimation(); shadekeeper1_Engaged, shadekeeper1_Alive = registerDeath(shadekeeper1_Alive, cave_level2(), "shadekeeper", 250, 200);}
        }
    };
    //Creates Aggro Collision for when the player collides with an enemy, this will
    function enemyAggro(slimex, slimey, slimeAlive, engaged) {
        if (player_coordinates_x + 20 > slimex &&
            player_coordinates_x < slimex + slimeSprite.image.width &&
            player_coordinates_y + 10 > slimey &&
            player_coordinates_y < slimey + slimeSprite.image.height && slimeAlive) {

            cancelAnimation();
            is_playerMove = false;
            attackShow = true;
            is_slimeMove = false;
            attackSequence = 0;
            engaged = true;
            battleScreen = true;
            drawBattle();
            return engaged;
        }
    }
    function enemyPatrol(enemyAlive, enemy_x, enemy_y, enemyFirstDirection, enemySecondDirection, drawType, distance_one, distance_two, direction) {
        function enemyDrawType(arrValue) {
            if (drawType === "slime") {slimeSprite.draw(enemy_x, enemy_y, arrValue);}
            if (drawType === "slimesuper") {slimeSuper_Sprite.draw(enemy_x, enemy_y, arrValue);}
            if (drawType === "shadewalker") {shadeWalker_Sprite.draw(enemy_x, enemy_y, arrValue);}
            if (drawType === "shadekeeper") {shadeKeeper_Sprite.draw(enemy_x, enemy_y, arrValue);}

            return arrValue;
        }
        //Changes Direction of Enemy Animation
        function checkDrawTypeRight() {
            enemyDrawType([6, 7, 8]);
        }
        function checkDrawTypeLeft() {
            enemyDrawType([3, 4, 5]);
        }
        function checkDrawTypeUp() {
            enemyDrawType([0, 1, 2]);
        }
        function checkDrawTypeDown() {
            enemyDrawType([9, 10, 11]);
        }

        function enemyChangeDirection() {
            if (direction && enemyAlive) {
                if (enemy_y < distance_one && enemySecondDirection) {
                    enemy_y += 1;
                    checkDrawTypeDown();
                }
                if (enemy_y > distance_two && enemyFirstDirection) {
                    enemy_y -= 1;
                    checkDrawTypeUp();
                }
                return enemy_y;
            } else if (!direction && enemyAlive) {
                if (enemy_x < distance_one && enemySecondDirection) {
                    enemy_x += 1;
                    checkDrawTypeRight();
                }
                if (enemy_x > distance_two && enemyFirstDirection) {
                    enemy_x -= 1;
                    checkDrawTypeLeft();
                }

            }
        }
        if (direction) {
            enemyChangeDirection();
            return enemy_y;
        }
        enemyChangeDirection();
        return enemy_x;
    }
