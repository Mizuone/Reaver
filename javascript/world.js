
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
    Reaver.Player = function() {
        //Loading of player object
        this.playerSprite = new Sprite("sprites/character_spritesheet.png");
        
        //Player Stats
        this.strength = 5;
        this.stamina = 10;
        this.agility = 6;
        this.luck = 3;
        this.intelligence = 4;
        this.Health = 100;
        this.defense = 5;
        //percentage values chances 
        this.hitChance = .80;
        this.critChance = .05;
        
        //Player x_y coordinates for positioning
        this.player_startX = null;
        this.player_startY = null;
        this.playerAttack_x = null;
        this.playerAttack_y = null;
        
        //Player Boolean Values for movement checks, and if player is in combat
        this.is_playermove = false;
        this.playerHit = false;
        this.player_moveRight = false;
        this.player_moveLeft = false;
        this.attackShow = true;
        this.attackDisabled = false;
        
        //Player Collision with world or enemey object
        //numeric values will be changed later, for now hard values will be in for width and height
        this.player_ObjectcollisionY = function(player_x, player_y, object_x, object_y) {
            if (player_x + 10 > object_x &&
                player_x + 10 < object_x + 32 &&
                player_y + 30 > object_y &&
                player_y + 30 < object_y + 32) {
                player_y = object_y - 30; //Top collision
                return player_y;
            }
            
            if (player_x + 10 > object_x &&
                player_x + 10 < object_x + 32 &&
                player_y > object_y &&
                player_y + 10 < object_y + 32) { 
                player_y = object_y + 20; //Bottom Collision
                return player_y;
            }
            return player_y;
        }
        this.player_ObjectcollisionX = function(player_x, player_y, object_x, object_y) {
            if (player_x - 15 > object_x &&
                player_x < object_x + 32 &&
                player_y + 15 > object_y &&
                player_y + 15 < object_y + 32) { 
                player_x = object_x + 30;//Right Side Collsion
                return player_x;
            }
            if (player_x + 20 > object_x &&
                player_x < object_x &&
                player_y + 25 > object_y &&
                player_y + 25 < object_y + 32) {
                player_x = object_x - 20; //Left Side collision
                return player_x;
            }
            return player_x;
        }
    };
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
        this.attackAnimation = function(Alive, Engaged, playerHealt, is_playerMov, playerMele, attackDisable, attackSho, enemy_hp, is_enemyMov, enemy_right, enemy_mele) {
            console.log("inside Attack");
            is_playerMove = is_playerMov;
                    if(attackSequence == 1 && Alive && Engaged) {
                        console.log("Fired");
                        is_playerMov = true;
                        if (is_playerMov) {
                            enemy_hp -= playerMele;
                            setTimeout(function() {
                                attackSho = false;
                                is_playerMov = false;
                                is_enemyMov = true;
                                attackDisable = true;
                                enemy_right = true;
                                if (is_enemyMov && Alive) {
                                    playerHealt -= enemy_mele;
                                    setTimeout(function() {
                                        attackDisable = false;
                                        attackSho = true;
                                        attackSequence = 0;
                                    }, 1500 );
                                }
                            }, 2500);
                        }
                    }
        /*this.handlemouseClick = function(e) {
            if (this.evt.pageX >= 550 && this.evt.pageX <= 700 || this.evt.pageX >= 766 && this.evt.pageX <= 830 &&
                this.evt.pageY >= 590 && this.evt.pageY <= 607 && battleScreen) {
                attackSequence++;
                this.attackAnimation(this.Alive, this.Engaged, this.playerHealt, this.is_playerMov, this.playerMele, this.attackDisable, this.attackSho, this.enemy_hp, this.is_enemyMov, this.enemy_right, this.enemy_mele);
                console.log("Fire");
                        }
                    }*/
                }
        
    }
    
    
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
    function playerMoveChange(changeMove) { 
        is_playerMove = changeMove;
        if (changeMove == 1) {
            changeMove = true;
        }else {
            changeMove = false;
        }
        return changeMove;
    };
    function enemyMoveChange(enemyMovement) {
        if (enemyMovement == 1) {
            return true;
        }else {
            return false;
        }
    };
    function enemyRightChange(enemyDirection) {
        if (enemyDirection == 1) {
            return true;
        }else {
            return false;
        }
    };
    function enemyDamage(enemy_hp) {
       return enemy_hp -= playerMelee;
    };
    function enemyHit(enemy_Attack) {
        return playerHealth -= enemy_Attack;
    }
    function checkAttack(Alive, Engaged, enemyHP, enemyDirection, enemyAttack) {
        var enemyHealth = enemyHP;
        var enemyPlace = enemyDirection;
        var enemyDoAttack = enemyAttack;
        var enemyDeath = false;
        if (attackSequence === 1 && Alive && Engaged) {
            playerMoveChange(1);
            if (is_playerMove) {
                enemyHealth = enemyDamage(enemyHP);
                stabilize();
                if (enemyDeath) {
                    return enemyDoAttack, enemyPlace, Alive, Engaged, enemyHealth;
                }
                setTimeout(function() {
                    attackShow = false;
                    is_playerMove = false;
                    is_slimeMove = enemyMoveChange(1);
                    attackDisabled = true;
                    enemyPlace = true;
                    //Resets all values to default when player attack and slime attack is fired
                    //stabilize();
                        if (is_slimeMove && Alive) {
                            enemyDoAttack = enemyHit(enemyAttack);
                            setTimeout(function() {
                            attackDisabled = false;
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
                    playerMoveChange(1);
                if (is_playerMove) {
                        attackShow = false;
                        is_playerMove = false;
                        is_slimeMove = enemyMoveChange(1);
                        attackDisabled = true;
                        enemyPlace = true;
                            if (is_slimeMove && Alive) {
                                setTimeout(function() {
                                attackDisabled = false;
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
function enemyBattleMovement(Engaged, drawType) {
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
function playerBattleMovement() {
            if (is_playerMove) {
                    player_sprite.draw(player_coordinates_x, player_coordinates_y, [3,4,5]); //Redraws based off player x, and player y /
                    
                    if (player_coordinates_x < 355 && player_moveLeft == true) { 
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
                    if (player_coordinates_x > 250 && player_moveRight == true) {
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
        }
       /* function resetPlayerPositionX(playerx, playery) {
            return playerx, playery;
        }
        function resetPlayerPositionY(playery) {
            return playery;
        }
        function grantXP(xp) {
            return xp += xp;
        }
        function grantGold(gold) {
            return gold += gold;
        }
        function resetSlime(pos) {
            return pos;
        }

        function registerDeath(enemyhp, enemyAlive, enemyEngage, callbackFun) {
            var enemyisAlive = enemyAlive;
            var enemyisEngaged = enemyEngage;
                    setTimeout(function() { 
                        enemyisAlive = false;
                        enemyEngage = false;
                        is_slimeMove = false;
                        battleScreen = false;
                        attackDisabled = false;
                        attackSequence = 0;
                        callbackFun;
                        playerMonitor();
                        console.log("Fired");
                    }, 250); 
            return false;      
        }*/




    var playerAttackhit_Sprite = new Sprite("sprites/playerAttack_Spritesheet.png")
    //Grass Terrain Sprties
        var cliffgrass_Back1 = new Sprite("sprites/Cliffgrass_Back.png"), cliffgrass_Front = new Sprite("sprites/Cliffgrass_Front.png"), cliffgrass_Left = new Sprite("sprites/Cliffgrass_leftside.png"), cliffgrass_Right = new Sprite("sprites/Cliffgrass_side.png"), cliffgrass_Topright = new Sprite("sprites/cliffgrass_topright.png"), cliffgrass_All = new Sprite("sprites/cliffgrass_all.png"), cliffgrass_Bottomright = new Sprite("sprites/cliffgrass_bottomright.png"), cliffgrass_BottomLeft = new Sprite("sprites/cliffgrass_bottomleft.png"), cliffgrass_TopLeft = new Sprite("sprites/cliffgrass_topleft.png"), 
            //Cave Terrain Sprites
        cliffEntrance_Open = new Sprite("sprites/CaveEntrance_Open.png"), cave_Terrain = new Sprite("sprites/cave_Terrain.png"), cave_Wall = new Sprite("sprites/cave_wall.png"), cave_ceiling = new Sprite("sprites/cave_ceiling.png"), blackBlock = new Sprite("sprites/black_block.png"), cave_Opening = new Sprite("sprites/cave_OpeningDoor.png");

    var bush = new Sprite("sprites/bushV1.png");
    var player_sprite = new Sprite("sprites/character_spritesheet.png");

        var is_playerMove = false, player_moveRight = false, player_moveLeft = true, attackShow = true,
            attackDisabled = false;
        var Context = null;
        var BLOCK_W = 32;
        var BLOCK_H = 32;
        var delayAmount = -2;
        var player_coordinates_x = 300;  //10 starter //590 end ======= Slimes 150 X Slimes 130 Y
        var player_coordinates_y = 150; //352 starter //94 end
        var player_Attackhit = false, playerAttack_x = 0, playerAttack_y = 0;
        var grass = new Sprite("sprites/grass1.png"), cliff_Front = new Sprite("sprites/cliff_Front.png"), dirt_Terrain = new Sprite("sprites/Dirt_Terrian.png");
        playerAttackhit_Sprite.image.width = 32; playerAttackhit_Sprite.image.height = 32;
           
        
        

        player_sprite.image.width = 32; player_sprite.image.height = 32;   
        var slimeSprite = new Sprite("sprites/slime_spritesheet.png"), slimeSuper_Sprite = new Sprite("sprites/slimeSuper_spritesheet.png"), slime1_x = 150, slime1_y = 150, slime1_Alive = true, slime1_left = false, slime1_right = true, slime1_Engaged = false, is_slimeMove = false; slimeSprite.image.width = 32; slimeSprite.image.height = 32; slimeSuper_Sprite.image.width = 32; slimeSuper_Sprite.image.height = 32;
        var slime2_Alive = true, slime2_x = 450, slime2_y = 150, slime2_Left = false, slime2_Right = true, slime2_Engaged = false;
        var slime3_Alive = true, slime3_x = 285, slime3_y = 250, slime3_Up = false, slime3_Down = true, slime3_Engaged = false;
        var slime4_Alive = true, slime4_x = 275, slime4_y = 210, slime4_Left = false, slime4_Right = true, slime4_Engaged = false;

         var slimeEntrance1_Alive = true, slimeEntrance1_x = 275, slimeEntrance1_y = 210, slimeEntrance1_Left = false, slimeEntrance1_Right = true, slimeEntrance1_Engaged = false, slimeEntrance2_Alive = true, slimeEntrance2_x = 375, slimeEntrance2_y = 100, slimeEntrance2_Left = false, slimeEntrance2_Right = true, slimeEntrance2_Engaged = false;  
        var shadeWalker_Sprite = new Sprite("sprites/shadewalker_Spritesheet.png"),  shadewalker1_Alive = true, shadewalker1_x = 150, shadewalker1_y = 130, shadewalker1_Left = false, shadewalker1_Right = true, shadewalker1_Engaged = false, shadewalker2_Alive = true, shadewalker2_x = 440, shadewalker2_y = 130, shadewalker2_Left = false, shadewalker2_Right = true, shadewalker2_Engaged = false, shadeKeeper_Sprite = new Sprite("sprites/shadeKeeper_Spritesheet.png"), shadekeeper1_Alive = true, shadekeeper1_x = 250, shadekeeper1_y = 200, shadekeeper1_Left = false, shadekeeper1_Right = true, shadekeeper1_Engaged = false;
        shadeWalker_Sprite.image.width = 32; shadeWalker_Sprite.image.height = 32; shadeKeeper_Sprite.image.width = 32; shadeKeeper_Sprite.image.height = 32;
        var battleScreen = false;
        var playerDirection = 0;
        var requestID;
        var playerMenu = 0, attackSequence = 0;
        var playerSequence = 0;
    if (slime1_Alive) { var slime1_Melee = 5, slime1_HP = 25;}
    if (slime2_Alive) { var slime2_Melee = 5, slime2_HP = 30;}
    if (slime3_Alive) { var slime3_Melee = 5, slime3_HP = 35;}
    if (slime4_Alive) { var slime4_Melee = 5, slime4_HP = 30;}
    if (slimeEntrance1_Alive) { var slimeEntrance1_Melee = 7, slimeEntrance1_HP = 35;}
    if (slimeEntrance2_Alive) { var slimeEntrance2_Melee = 15, slimeEntrance2_HP = 75;}

    if (shadewalker1_Alive) { var shadewalker1_Melee = 10, shadewalker1_HP = 60;}
    if (shadewalker2_Alive) { var shadewalker2_Melee = 10, shadewalker2_HP = 60;}
    if (shadekeeper1_Alive) { var shadekeeper1_Melee = 20, shadekeeper1_HP = 90;}
    


  var mapforest = [ 0,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,
                    5,6,6,6,6,6,6,6,6,6,6,6,4,0,0,0,0,3,3,3,
                    5,1,1,1,1,1,1,1,1,1,1,1,4,0,0,0,5,6,6,6,
                    5,1,11,2,2,2,2,2,2,2,7,1,4,0,3,3,9,1,1,1,
                    5,1,4,0,0,3,3,3,3,3,9,1,4,5,6,6,6,1,11,2,
                    5,1,4,0,5,1,1,1,1,1,1,1,4,5,1,1,1,1,4,0,
                    5,1,4,0,5,1,8,1,8,1,1,11,0,0,2,2,7,1,4,0,
                    5,1,4,0,5,1,1,1,1,1,1,4,0,0,0,0,5,1,4,0,
                    5,1,4,0,0,2,2,2,7,1,11,0,0,0,0,0,5,1,4,0,
                    5,1,4,0,0,0,0,0,5,1,4,0,0,0,0,0,5,1,4,0,
                    9,1,4,0,0,0,0,0,5,1,10,3,3,3,3,3,9,1,4,0,
                    1,1,4,0,0,0,0,0,5,1,6,6,6,6,6,6,6,1,4,0,
                    2,2,0,0,0,0,0,0,5,1,1,1,1,1,1,1,1,1,4,0,
                    0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];
                    
        var mapForestIndex = 0;

        function drawMap() {
            mapForestIndex = 0;

            for (var y = 0; y < 15; y++)
            {
                for (var x = 0; x < 20; x++, mapForestIndex++)
                {
                    var tile_x = x * BLOCK_W;
                    var tile_y = y * BLOCK_H;

                    var tileType = mapforest[mapForestIndex];
                    (function() {
                        if (tileType >= 2) {
                            player_coordinates_x = Player.player_ObjectcollisionX(player_coordinates_x, player_coordinates_y, tile_x, tile_y);
                            player_coordinates_y = Player.player_ObjectcollisionY(player_coordinates_x, player_coordinates_y, tile_x, tile_y);
                        }
                    })();
                    
                    if (tileType == 0) {
                        grass.draw(tile_x, tile_y);
                    }
                    if (tileType == 1) {
                        dirt_Terrain.draw(tile_x, tile_y);
                    }
                    if (tileType == 2) { //back grass cliff tile
                        cliffgrass_Back1.draw(tile_x, tile_y);
                        //player_coordinates_x, player_coordinates_y = Player.player_ObjectcollisionX(player_coordinates_x, player_coordinates_y, tile_x, tile_y);
                    }
                    if (tileType == 3) { //Front grass cliff tile
                        cliffgrass_Front.draw(tile_x, tile_y);
                    }
                    if (tileType == 4) {
                        cliffgrass_Left.draw(tile_x, tile_y);
                    }
                    if (tileType == 5) {
                        cliffgrass_Right.draw(tile_x, tile_y);
                        
                    }
                   if (tileType == 6) {
                       cliff_Front.draw(tile_x, tile_y);
                   }
                   if (tileType == 7) {
                       cliffgrass_Topright.draw(tile_x, tile_y);
                   }
                  if (tileType == 8) {
                    cliffgrass_All.draw(tile_x, tile_y);
                  }
                  if (tileType == 9) {
                      cliffgrass_Bottomright.draw(tile_x, tile_y);
                  }
                 if (tileType == 10) {
                     cliffgrass_BottomLeft.draw(tile_x, tile_y);
                 }
                 if (tileType == 11) {
                     cliffgrass_TopLeft.draw(tile_x, tile_y);
                  }
                }
            }
            bush.draw(230,300);
            bush.draw(400,250);
            bush.draw(425,10);
            bush.draw(150,100);
            bush.draw(125,350);
        };

        var mapBattle = [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

        var mapBattleIndex = 0;

        
        function drawBattleMap() {
            mapBattleIndex = 0;
            if (battleScreen && slime1_Engaged || slime2_Engaged || slime3_Engaged || slime4_Engaged || slimeEntrance1_Engaged || slimeEntrance2_Engaged) {
                    for (var y = 6; y < 11; y++)
                {
                    for (var x = 6; x < 14; x++, mapBattleIndex++)
                    {
                        var tile_x = x * BLOCK_W;
                        var tile_y = y * BLOCK_H;

                        var tileType = mapBattle[mapBattleIndex];

                        if (tileType == 0) {
                             grass.draw(tile_x, tile_y);
                        }

                    }
                }
            }
            if (battleScreen && shadewalker1_Engaged || shadewalker2_Engaged || shadekeeper1_Engaged) {
                  for (var y = 6; y < 11; y++)
                {
                    for (var x = 6; x < 14; x++, mapBattleIndex++)
                    {
                        var tile_x = x * BLOCK_W;
                        var tile_y = y * BLOCK_H;

                        var tileType = mapBattle[mapBattleIndex];

                        if (tileType == 0) {
                             cave_Wall.draw(tile_x, tile_y);
                        }

                    }
                }
            }
            
           
        };
        $(document).ready(function(){
            Context = new HTML("myCanvas", 640, 480);
            Context.canvas.addEventListener("mousedown", handleMouseClick);
            initializeKeyboard();
            initializeAnimationCounters();
            $("#hide").click(function() {
               $(".textControl").hide();
               $("#hide").hide();
               $("#show").show();
                
            });
            $("#show").click(function() {
                $(".textControl").show();
                $("#hide").show();
                $("#show").hide();
                
            })
        });
        
        $(window).load(function(){
            playerMonitor();
            drawForest();
        });

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
            if (enemyType === "slime") { currentXP += 25; currentGold += 25;}
        };

        function registerDeath(enemyAlive, callbackFun, enemyType, resetPlayerX, resetPlayerY) {
            var enemyisAlive = enemyAlive;
            rewardPlayer(enemyType);
                enemyisAlive = false;
                is_slimeMove = false;
                battleScreen = false;
                attackDisabled = false;
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
            if (playerHealth <= 0) { window.location.reload();}
                resetAnimationCounter();
                drawBattleUI();
                drawBattleMap();
                var playerSequence = 0;
                playerDirection = 0;
                
                //Triggers when attack is clicked
                
            if(slime1_Engaged) {enemyBattleMovement(slime1_Engaged, "slime");}
            if(slime2_Engaged) {enemyBattleMovement(slime2_Engaged, "slime");}
            if(slime3_Engaged) {enemyBattleMovement(slime3_Engaged, "slime");}
            if(slime4_Engaged) {enemyBattleMovement(slime4_Engaged, "slime");}
            if(slimeEntrance1_Engaged) {enemyBattleMovement(slimeEntrance1_Engaged, "slime");}
            if(slimeEntrance2_Engaged) {enemyBattleMovement(slimeEntrance2_Engaged, "slimesuper");}
            if(shadewalker1_Engaged) {enemyBattleMovement(shadewalker1_Engaged, "shadewalker");}
            if(shadewalker2_Engaged) {enemyBattleMovement(shadewalker2_Engaged, "shadewalker");}
            if(shadekeeper1_Engaged) {enemyBattleMovement(shadekeeper1_Engaged, "shadekeeper");}

            if(slime1_HP <= 0 && slime1_Alive && player_coordinates_x === 350) {cancelAnimation(); slime1_Engaged, slime1_Alive = registerDeath(slime1_Alive, drawForest(), "slime", 300, 150);}
            if(slime2_HP <= 0 && slime2_Alive && player_coordinates_x === 350) {cancelAnimation(); slime2_Engaged, slime2_Alive = registerDeath(slime2_Alive, drawForest(), "slime", 300, 150);}
            if(slime3_HP <= 0 && slime3_Alive && player_coordinates_x === 350) {cancelAnimation(); slime3_Engaged, slime3_Alive = registerDeath(slime3_Alive, drawForest(), "slime", 300, 150);}
            if(slime4_HP <= 0 && slime4_Alive && player_coordinates_x === 350) {cancelAnimation(); slime4_Engaged, slime4_Alive = registerDeath(slime4_Alive, drawForest(), "slime", 300, 150);}
            /*if(slime2_HP <= 0 && slime2_Alive && player_coordinates_x === 350) {
                slime1_x, slime1_y = resetSlime(150); player_coordinates_x, player_coordinates_y = resetPlayerPositionX(450, 150); currentXP = grantXP(25); currentGold = grantGold(25); cancelAnimation(drawBattle); slime2_Engaged, slime2_Alive = registerDeath(slime2_HP, slime2_Alive, slime2_Engaged, drawForest());return;
            }*/
            /*if(slime3_HP <= 0 && slime3_Alive && player_coordinates_x === 350) {
                slime1_x, slime1_y = resetSlime(150); player_coordinates_x, player_coordinates_y = resetPlayerPositionX(150, 150); currentXP = grantXP(25); currentGold = grantGold(25); cancelAnimation(drawBattle); slime1_Engaged, slime1_Alive = registerDeath(slime1_HP, slime1_Alive, slime1_Engaged, drawForest());return;
            }
            if(slime4_HP <= 0 && slime4_Alive && player_coordinates_x === 350) {
                slime1_x, slime1_y = resetSlime(150); player_coordinates_x, player_coordinates_y = resetPlayerPositionX(150, 150); currentXP = grantXP(25); currentGold = grantGold(25); cancelAnimation(drawBattle); slime1_Engaged, slime1_Alive = registerDeath(slime1_HP, slime1_Alive, slime1_Engaged, drawForest());return;
            }*/
                                                 
            /*if (slime3_HP <= 0 && slime3_Alive && player_coordinates_x == 350) {
                slime3_HP = 0; slime1_x = 150; slime1_y = 150; player_coordinates_x = 285; player_coordinates_y = 290; currentXP += 25; currentGold += 25; cancelAnimationFrame(requestID); setTimeout(function() {slime3_Alive = false; is_slimeMove = false; slime3_Engaged = false;  battleScreen = false; attackSequence = 0; attackDisabled = false; drawForest(); playerMonitor(); return;}, 1000);
            
            if (slime4_HP <= 0 && slime4_Alive && player_coordinates_x == 350) {
                slime4_HP = 0; slime1_x = 150; slime1_y = 150; player_coordinates_x = 275; player_coordinates_y = 210; currentXP += 25; currentGold += 25; cancelAnimationFrame(requestID); setTimeout(function() {slime4_Alive = false; is_slimeMove = false; slime4_Engaged = false;  battleScreen = false; attackSequence = 0; attackDisabled = false; drawForest(); playerMonitor(); return;}, 1000);
                }*/
            if (slimeEntrance1_HP <= 0 && slimeEntrance1_Alive) {
                slimeEntrance1_HP = 0; slime1_x = 150; slime1_y = 150; player_coordinates_x = 275; player_coordinates_y = 210; currentXP += 25; currentGold += 25; cancelAnimationFrame(requestID); setTimeout(function() {slimeEntrance1_Alive = false; is_slimeMove = false; slimeEntrance1_Engaged = false;  battleScreen = false; attackSequence = 0; attackDisabled = false; caveEntrance(); playerMonitor(); return;}, 1000); 
            }
            if (slimeEntrance2_HP <= 0 && slimeEntrance2_Alive) {
                slimeEntrance2_HP = 0; slime1_x = 150; slime1_y = 150; player_coordinates_x = 375; player_coordinates_y = 100; currentXP += 25; currentGold += 150; cancelAnimationFrame(requestID); setTimeout(function() {slimeEntrance2_Alive = false; is_slimeMove = false; slimeEntrance2_Engaged = false;  battleScreen = false; attackSequence = 0; attackDisabled = false; caveEntrance(); playerMonitor(); return;}, 1000); 
            }
            if (shadewalker1_HP <= 0 && shadewalker1_Alive) {
                shadewalker1_HP = 0; slime1_x = 150; slime1_y = 150; player_coordinates_x = 130; player_coordinates_y = 150; currentXP += 25; currentGold += 150; cancelAnimationFrame(requestID); setTimeout(function() {shadewalker1_Alive = false; is_slimeMove = false; shadewalker1_Engaged = false;  battleScreen = false; attackSequence = 0; attackDisabled = false; cave_level1(); playerMonitor(); return;}, 1000); 
            }
            if (shadewalker2_HP <= 0 && shadewalker2_Alive) {
                shadewalker2_HP = 0; slime1_x = 150; slime1_y = 150; player_coordinates_x = 440; player_coordinates_y = 130; currentXP += 25; currentGold += 150; cancelAnimationFrame(requestID); setTimeout(function() {shadewalker2_Alive = false; is_slimeMove = false; shadewalker2_Engaged = false;  battleScreen = false; attackSequence = 0; attackDisabled = false; cave_level1(); playerMonitor(); return;}, 1000); 
            }
            if (shadekeeper1_HP <= 0 && shadekeeper1_Alive) {
                shadekeeper1_HP = 0; slime1_x = 150; slime1_y = 150; player_coordinates_x = 250; player_coordinates_y = 200; currentXP += 25; currentGold += 150; cancelAnimationFrame(requestID); setTimeout(function() {shadekeeper1_Alive = false; is_slimeMove = false; shadekeeper1_Engaged = false;  battleScreen = false; attackSequence = 0; attackDisabled = false; cave_level2(); playerMonitor(); return;}, 1000); 
            }
        }
    };
    


    function drawForest() {
        //console.log(player_coordinates_x + "X");
        //console.log(player_coordinates_y + "Y");
            collisionDection();
            is_slimeMove = false;
            requestID = requestAnimationFrame(drawForest);
            
            resetAnimationCounter();
            drawMap();
            playerMovement();
            is_playerMove = false;
            playerDirection = 0;
        if (playerHealth <= 0) { window.location.reload();}
            if (key.escape) {
                return;
            }
        //collision for battle against slime1, width and height are based off total W & H of spritesheet
            if (player_coordinates_x + 20 > slime1_x &&
               player_coordinates_x < slime1_x + slimeSprite.image.width &&
               player_coordinates_y + 10 > slime1_y &&
               player_coordinates_y < slime1_y + slimeSprite.image.height && slime1_Alive == true) {
                cancelAnimationFrame(requestID);
                is_playerMove = false; attackShow = true; attackDisabled = false; is_slimeMove = false; attackSequence = 0; slime1_Engaged = true; battleScreen = true; drawBattle(); return;
            }
            if (player_coordinates_x + 20 > slime2_x &&
               player_coordinates_x < slime2_x + slimeSprite.image.width &&
               player_coordinates_y + 10 > slime2_y &&
               player_coordinates_y < slime2_y + slimeSprite.image.height && slime2_Alive == true) {
                
                cancelAnimationFrame(requestID);
                is_playerMove = false; attackShow = true; attackDisabled = false; slime2_Engaged = true; attackSequence = 0; battleScreen = true; drawBattle(); is_slimeMove = false; return;
            }
            if (player_coordinates_x + 20 > slime3_x &&
               player_coordinates_x < slime3_x + slimeSprite.image.width &&
               player_coordinates_y + 10 > slime3_y &&
               player_coordinates_y < slime3_y + slimeSprite.image.height && slime3_Alive) {
                
                cancelAnimationFrame(requestID);
                is_playerMove = false; attackShow = true; attackDisabled = false; slime3_Engaged = true; attackSequence = 0; battleScreen = true; drawBattle(); is_slimeMove = false; return;
            }
            if (player_coordinates_x + 20 > slime4_x &&
               player_coordinates_x < slime4_x + slimeSprite.image.width &&
               player_coordinates_y + 10 > slime4_y &&
               player_coordinates_y < slime4_y + slimeSprite.image.height && slime4_Alive) {
                
                cancelAnimationFrame(requestID);
                is_playerMove = false; attackShow = true; attackDisabled = false; slime4_Engaged = true; attackSequence = 0; battleScreen = true; drawBattle(); is_slimeMove = false; return;
            }
           
        
            //Animated Enemies
            if(slime1_Alive) {
                //Slime collision pathing
                if (slime1_x < 450 && slime1_right) {
                    slime1_x += 1;
                    slimeSprite.draw(slime1_x, slime1_y, [6,7,8]);
                    if (slime1_x >= 350) { slime1_right = false; slime1_left = true;}
                } 
                if (slime1_x > 150 && slime1_left) {
                    slime1_x -= 1; slimeSprite.draw(slime1_x, slime1_y, [3,4,5]);
                    if (slime1_x == 160) { slime1_left = false; slime1_right = true; }
                }
            } 
            if(slime2_Alive) {
                if (slime2_x < 550 && slime2_Right) {
                    slime2_x += 1; slimeSprite.draw(slime2_x, slime2_y, [6,7,8]);
                    if (slime2_x >= 545) { slime2_Right = false; slime2_Left = true;}
                }
                if (slime2_x <= 550 && slime2_Left) {
                    slimeSprite.draw(slime2_x, slime2_y, [3,4,5]);
                    slime2_x -= 1;
                    if (slime2_x <= 450) {
                        slime2_Left = false;
                        slime2_Right = true;
                    }
                }  
            }
            if(slime3_Alive){
                if (slime3_y < 400 && slime3_Down) {
                    slime3_y += 1;
                    slimeSprite.draw(slime3_x, slime3_y, [0,1,2]);
                    if (slime3_y >= 390) {
                        slime3_Down = false;
                        slime3_Up = true;
                    }
                }
                if (slime3_y >= 250 && slime3_Up) {
                    slime3_y -= 1;
                    slimeSprite.draw(slime3_x, slime3_y, [9,10,11]);
                    if (slime3_y <= 255) {
                        slime3_Up = false;
                        slime3_Down = true;
                    }
                }
            }
        
            if(slime4_Alive) {
                if (slime4_x >= 250 && slime4_Right) {
                    slime4_x += 1;
                    slimeSprite.draw(slime4_x, slime4_y, [6,7,8]);
                    if(slime4_x >= 325) {
                        slime4_Right = false;
                        slime4_Left = true;
                    }
                }
                if (slime4_x <= 330 && slime4_Left) {
                    slime4_x -= 1;
                    slimeSprite.draw(slime4_x, slime4_y, [3,4,5]);
                    if (slime4_x <= 250) {
                        slime4_Left = false;
                        slime4_Right = true;
                    }
                }
            }
            if (player_coordinates_x == 610 && player_coordinates_y >= 75) {
                cancelAnimationFrame(requestID);
                caveEntrance(); player_coordinates_x = 40; player_coordinates_y = 96; return;
            }
        };
/*QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});*/
