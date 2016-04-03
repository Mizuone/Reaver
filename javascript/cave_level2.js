
var mapCave_level2 = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
                      3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
                      3,3,3,3,3,3,2,2,2,2,2,2,3,3,3,3,3,3,3,3,
                      3,3,3,3,3,3,2,0,0,0,0,2,3,3,3,3,3,3,3,3,
                      3,3,3,3,3,3,2,1,1,1,1,2,2,2,2,3,3,3,3,3,
                      3,3,3,3,3,3,2,1,1,1,1,0,0,0,2,2,3,3,3,3,
                      3,3,3,3,3,3,2,1,1,1,1,1,1,1,0,2,3,3,3,3,
                      3,3,3,3,3,3,2,1,1,1,1,1,1,1,1,2,3,3,3,3,
                      3,3,3,3,3,3,2,1,1,1,1,2,2,1,1,2,2,3,3,3,
                      3,3,3,3,3,3,2,2,2,2,2,2,2,1,1,0,2,3,3,3,
                      3,3,3,3,3,3,0,0,0,0,0,0,2,1,1,1,2,3,3,3,
                      3,3,3,3,3,3,3,3,3,3,3,3,2,1,1,1,2,3,3,3,
                      3,3,3,3,3,3,3,3,3,3,3,3,2,2,1,2,2,3,3,3,
                      3,3,3,3,3,3,3,3,3,3,3,3,0,2,1,2,0,3,3,3,
                      3,3,3,3,3,3,3,3,3,3,3,3,3,2,1,2,3,3,3,3];
                    
        var mapCave2Index = 0;

        function drawCave_level2() {
            mapCave2Index = 0;
            for (var y = 0; y < 15; y++)
            {
                for (var x = 0; x < 20; x++, mapCave2Index++)
                {
                    var tile_x = x * BLOCK_W;
                    var tile_y = y * BLOCK_H;

                    var tileType = mapCave_level2[mapCave2Index];
                    
                    if (tileType == 0) { //Cave Wall 0
                        cave_Terrain.draw(tile_x, tile_y);
                        if (player_coordinates_x + 20 > tile_x && player_coordinates_x < tile_x  && player_coordinates_y + 20 > tile_y && player_coordinates_y + 20 < tile_y + cliffgrass_Front.image.height) { player_coordinates_x = tile_x - 20; }
                        if (player_coordinates_x > tile_x && player_coordinates_x < tile_x + cliffgrass_Front.image.width && player_coordinates_y + 15 > tile_y && player_coordinates_y + 15 < tile_y + cliffgrass_Front.image.height) { player_coordinates_x = tile_x + 30;}
                        if (player_coordinates_x + 10 > tile_x &&
                           player_coordinates_x + 10 < tile_x + cliffgrass_Front.image.width &&
                           player_coordinates_y > tile_y &&
                           player_coordinates_y + 10 < tile_y + cliffgrass_Front.image.height) {
                            
                            player_coordinates_y = tile_y + 25;
                        }
                    }
                    if (tileType == 1) { //Cave Terrian 1
                        cave_Wall.draw(tile_x, tile_y);
                        
                    }
                    if (tileType == 2) { //Cave Ceiling 2
                        cave_ceiling.draw(tile_x, tile_y);
                        if (player_coordinates_x + 20 > tile_x && player_coordinates_x < tile_x && player_coordinates_y + 20 > tile_y && player_coordinates_y + 20 < tile_y + cliffgrass_Front.image.height) { player_coordinates_x = tile_x - 20; }
                        if (player_coordinates_x > tile_x && player_coordinates_x < tile_x + cliffgrass_Front.image.width && player_coordinates_y + 15 > tile_y && player_coordinates_y + 15 < tile_y + cliffgrass_Front.image.height) { player_coordinates_x = tile_x + 30;}
                        if (player_coordinates_x + 10 > tile_x &&
                         player_coordinates_x + 10 < tile_x + cliffgrass_Front.image.width &&
                         player_coordinates_y + 30 > tile_y &&
                         player_coordinates_y + 30 < tile_y + cliffgrass_Front.image.height) {
                         player_coordinates_y = tile_y - 30;
	                   }
                    }
                    if (tileType == 3) { //Black Block 3
                        blackBlock.draw(tile_x, tile_y);
                    }
                }
            }
        };

function cave_level2() {
    requestID = requestAnimationFrame(cave_level2);
    drawCave_level2();
    Context.context.beginPath(); Context.context.fillStyle = "rgba(0,0,0,0.2)"; Context.context.fillRect(0,0,Context.width, Context.height); Context.context.fill();Context.context.closePath();
    resetAnimationCounter();
    playerMovement();
    is_playerMove = false;
    playerDirection = 0;
    if (key.escape) {
        return;
    }
    if (player_coordinates_x + 20 > shadekeeper1_x &&
               player_coordinates_x < shadekeeper1_x + shadeWalker_Sprite.image.width &&
               player_coordinates_y + 10 > shadekeeper1_y &&
               player_coordinates_y < shadekeeper1_y + shadeWalker_Sprite.image.height && shadekeeper1_Alive == true) {
                cancelAnimationFrame(requestID);
                is_playerMove = false; attackShow = true; attackDisabled = false; is_slimeMove = false; attackSequence = 0; shadekeeper1_Engaged = true; battleScreen = true; drawBattle();return;
            }
    if(shadekeeper1_Alive) {
        
                if (shadekeeper1_x >= 240 && shadekeeper1_Right) {
                    shadekeeper1_x += 1;
                    shadeKeeper_Sprite.draw(shadekeeper1_x,shadekeeper1_y, [6,7,8]);
                    if(shadekeeper1_x >= 280) {
                        shadekeeper1_Right = false;
                        shadekeeper1_Left = true;
                    }
                }
                if (shadekeeper1_x <= 300 && shadekeeper1_Left) {
                    shadekeeper1_x -= 1;
                    shadeKeeper_Sprite.draw(shadekeeper1_x, shadekeeper1_y, [3,4,5]);
                    if (shadekeeper1_x <= 240) {
                        shadekeeper1_Left = false;
                        shadekeeper1_Right = true;
                    }
                }
            }
    console.log(player_coordinates_x + "X");
    console.log(player_coordinates_y + "Y");
     //260 X
     //200 Y
    if (player_coordinates_x >= 440 && player_coordinates_x <= 470 &&
       player_coordinates_y >= 440 && player_coordinates_y <= 460) {
         cancelAnimationFrame(requestID); player_coordinates_x = 460; player_coordinates_y = 80; cave_level1(); return;
    }
   
};