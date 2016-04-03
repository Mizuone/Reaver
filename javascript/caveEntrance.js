
   
var mapEntrance =[  0,0,0,0,0,9,9,9,9,9,9,9,9,9,9,9,9,0,0,0,
                    9,9,9,9,10,2,2,2,2,2,2,2,2,2,2,2,2,8,0,0,
                    2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,8,0,0,
                    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8,0,0,
                    6,6,6,6,4,1,1,1,1,1,1,1,1,1,1,1,1,8,0,0,
                    0,0,0,0,7,1,1,1,1,1,1,1,1,1,3,6,4,8,0,0,
                    0,0,0,0,7,1,1,1,1,1,1,1,1,3,8,0,0,8,0,0,
                    0,0,0,0,7,1,1,1,1,1,1,1,1,8,8,0,0,8,0,0,
                    0,0,0,0,0,6,4,1,1,1,1,1,1,8,2,2,2,8,0,0,
                    0,0,0,0,0,0,0,4,1,1,1,1,1,2,2,5,2,8,0,0,
                    0,0,0,0,0,0,0,7,1,1,1,1,1,1,1,1,1,8,0,0,
                    0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,6,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];
                    
        var mapEntranceIndex = 0;

        function drawEntrance() {
            mapEntranceIndex = 0;
            for (var y = 0; y < 15; y++)
            {
                for (var x = 0; x < 20; x++, mapEntranceIndex++)
                {
                    var tile_x = x * BLOCK_W;
                    var tile_y = y * BLOCK_H;

                    var tileType = mapEntrance[mapEntranceIndex];
                    
                    if (tileType == 0){
                        grass.draw(tile_x, tile_y);
                    }
                    if (tileType == 1){ // Dirt 1
                        dirt_Terrain.draw(tile_x, tile_y);
                    }
                    if (tileType == 2) { // Cliff 2
                        cliff_Front.draw(tile_x, tile_y);
                        if (player_coordinates_x + 10 > tile_x && player_coordinates_x + 10 < tile_x + cliffgrass_Front.image.width && player_coordinates_y > tile_y && player_coordinates_y + 10 < tile_y + cliffgrass_Front.image.height) { player_coordinates_y = tile_y + 20; }
                       if (player_coordinates_x + 20 > tile_x && player_coordinates_x < tile_x && player_coordinates_y + 30 > tile_y && player_coordinates_y + 30 < tile_y + cliffgrass_Front.image.height) { player_coordinates_x = tile_x - 20;}
                       if (player_coordinates_x  > tile_x && player_coordinates_x < tile_x + cliffgrass_Front.image.width && player_coordinates_y + 15 > tile_y && player_coordinates_y + 15 < tile_y + cliffgrass_Front.image.height) { player_coordinates_x = tile_x + 30;}
                    }
                    if (tileType == 3) { // Top Left 3
                        cliffgrass_TopLeft.draw(tile_x, tile_y);
                        if (player_coordinates_x + 20 > tile_x && player_coordinates_x < tile_x && player_coordinates_y + 20 > tile_y && player_coordinates_y + 20 < tile_y + cliffgrass_Front.image.height) { player_coordinates_x = tile_x - 20;} 
                     if (player_coordinates_x + 10 > tile_x && player_coordinates_x + 10 < tile_x + cliffgrass_Front.image.width && player_coordinates_y + 30 > tile_y && player_coordinates_y + 30 < tile_y + cliffgrass_Front.image.height) {player_coordinates_y = tile_y - 30;}
                    }
                    if (tileType == 4) { // Top Right 4
                        cliffgrass_Topright.draw(tile_x, tile_y);
                        if (player_coordinates_x + 15 > tile_x && player_coordinates_x + 15 < tile_x + cliffgrass_Front.image.width && player_coordinates_y + 30 > tile_y && player_coordinates_y + 30 < tile_y + cliffgrass_Front.image.height) {player_coordinates_y = tile_y - 30;}
                       if (player_coordinates_x  > tile_x && player_coordinates_x < tile_x + cliffgrass_Front.image.width && player_coordinates_y + 15 > tile_y && player_coordinates_y + 15 < tile_y + cliffgrass_Front.image.height) { player_coordinates_x = tile_x + 30;}
                    }
                    if(tileType == 5) { //Entrance Cave 5
                        cliffEntrance_Open.draw(tile_x, tile_y);
                    }
                    if (tileType == 6) { // North Facing 6
                        cliffgrass_Back1.draw(tile_x, tile_y);
                        if (player_coordinates_x + 10 > tile_x && player_coordinates_x + 10 < tile_x + cliffgrass_Back1.image.width && player_coordinates_y + 30 > tile_y && player_coordinates_y + 30 < tile_y + cliffgrass_Back1.image.height) { player_coordinates_y = tile_y - 30;}
                    }
                    if (tileType == 7) { //Right sided 7
                        cliffgrass_Right.draw(tile_x, tile_y);
                        if (player_coordinates_x  > tile_x && player_coordinates_x < tile_x + cliffgrass_Front.image.width && player_coordinates_y + 20 > tile_y && player_coordinates_y + 20 < tile_y + cliffgrass_Front.image.height) { player_coordinates_x = tile_x + 30;}
                    }
                    if (tileType == 8) { //Left sided 8
                        cliffgrass_Left.draw(tile_x, tile_y);
                        if (player_coordinates_x + 20 > tile_x && player_coordinates_x < tile_x + cliffgrass_Front.image.width && player_coordinates_y + 20 > tile_y && player_coordinates_y + 20 < tile_y + cliffgrass_Front.image.height) { player_coordinates_x = tile_x - 20; }
                    }
                    if (tileType == 9) { //Front facing 9
                        cliffgrass_Front.draw(tile_x, tile_y);
                        if (player_coordinates_x + 10 > tile_x && player_coordinates_x + 10 < tile_x + cliffgrass_Front.image.width && player_coordinates_y > tile_y && player_coordinates_y + 10 < tile_y + cliffgrass_Front.image.height) { player_coordinates_y = tile_y + 20; }
                    }
                    if (tileType == 10) {
                        cliffgrass_Bottomright.draw(tile_x, tile_y);
                        if (player_coordinates_x > tile_x && player_coordinates_x < tile_x + cliffgrass_Front.image.width && player_coordinates_y + 25 > tile_y && player_coordinates_y + 15 < tile_y + cliffgrass_Front.image.height) {player_coordinates_x = tile_x + 30;}
                      if (player_coordinates_x + 10 > tile_x && player_coordinates_x + 10 < tile_x + cliffgrass_Front.image.width && player_coordinates_y > tile_y && player_coordinates_y + 10 < tile_y + cliffgrass_Front.image.height) { player_coordinates_y = tile_y + 20;}
                    }
                 }
            }
            bush.draw(25,350);
            bush.draw(200,300);
            bush.draw(400,375);
            bush.draw(550,10);
            bush.draw(575,350);
        };

function caveEntrance() {
    requestID = requestAnimationFrame(caveEntrance);
    if (playerHealth <= 0) { window.location.reload();}
    drawEntrance();
    resetAnimationCounter();
    playerMovement();
    is_playerMove = false;
    playerDirection = 0;
    if (key.escape) {
        return;
    }
    
    
    if(slimeEntrance1_Alive) {
                //Slime collision pathing
                if (slimeEntrance1_x < 450 && slimeEntrance1_Right) {
                    slimeEntrance1_x += 1;
                    slimeSprite.draw(slimeEntrance1_x, slimeEntrance1_y, [6,7,8]);
                    if (slimeEntrance1_x >= 350) { slimeEntrance1_Right = false; slimeEntrance1_Left = true;}
                } 
                if (slimeEntrance1_x > 150 && slimeEntrance1_Left) {
                    slimeEntrance1_x -= 1; slimeSprite.draw(slimeEntrance1_x, slimeEntrance1_y, [3,4,5]);
                    if (slimeEntrance1_x == 160) { slimeEntrance1_Left = false; slimeEntrance1_Right = true; }
                }
            } 
    if(slimeEntrance2_Alive) {
                //Slime collision pathing
                if (slimeEntrance2_x < 450 && slimeEntrance2_Right) {
                    slimeEntrance2_x += 1;
                    slimeSuper_Sprite.draw(slimeEntrance2_x, slimeEntrance2_y, [6,7,8]);
                    if (slimeEntrance2_x >= 400) { slimeEntrance2_Right = false; slimeEntrance2_Left = true;}
                } 
                if (slimeEntrance2_x > 300 && slimeEntrance2_Left) {
                    slimeEntrance2_x -= 1; slimeSuper_Sprite.draw(slimeEntrance2_x, slimeEntrance2_y, [3,4,5]);
                    if (slimeEntrance2_x == 310) { slimeEntrance2_Left = false; slimeEntrance2_Right = true; }
                }
            }
    if (player_coordinates_x + 20 > slimeEntrance1_x &&
               player_coordinates_x < slimeEntrance1_x + slimeSprite.image.width &&
               player_coordinates_y + 10 > slimeEntrance1_y &&
               player_coordinates_y < slimeEntrance1_y + slimeSprite.image.height && slimeEntrance1_Alive) {
                
                cancelAnimationFrame(requestID);
                is_playerMove = false; attackShow = true; attackDisabled = false; slimeEntrance1_Engaged = true; attackSequence = 0; battleScreen = true; drawBattle(); is_slimeMove = false;                       return;
            }
    if (player_coordinates_x + 20 > slimeEntrance2_x &&
               player_coordinates_x < slimeEntrance2_x + slimeSprite.image.width &&
               player_coordinates_y + 10 > slimeEntrance2_y &&
               player_coordinates_y < slimeEntrance2_y + slimeSprite.image.height && slimeEntrance2_Alive) {
                
                cancelAnimationFrame(requestID);
                is_playerMove = false; attackShow = true; attackDisabled = false; slimeEntrance2_Engaged = true; attackSequence = 0; battleScreen = true; drawBattle(); is_slimeMove = false;                       return;
            }
    console.log(player_coordinates_x + "X");
    console.log(player_coordinates_y + "Y");
    if (player_coordinates_x >= 0 && player_coordinates_x <= 15 &&
        player_coordinates_y >= 84 && player_coordinates_y <= 100) {
                cancelAnimationFrame(requestID);
                drawForest(); player_coordinates_x = 590; player_coordinates_y = 94; return;
            }
    if (player_coordinates_x >= 470 && player_coordinates_x <= 490 &&
        player_coordinates_y >= 300 && player_coordinates_y <= 305) {
        cancelAnimationFrame(requestID); player_coordinates_x = 310; player_coordinates_y = 410; cave_level1(); return;
    }
};