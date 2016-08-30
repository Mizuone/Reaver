
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
                    (function() {
                        if (tileType == 0 || tileType == 2) {
                            player_coordinates_x = Player.player_ObjectcollisionX(player_coordinates_x, player_coordinates_y, tile_x, tile_y);
                            player_coordinates_y = Player.player_ObjectcollisionY(player_coordinates_x, player_coordinates_y, tile_x, tile_y);
                        }
                    })();
                    if (tileType == 0) { //Cave Wall 0
                        cave_Terrain.draw(tile_x, tile_y);
                    }
                    if (tileType == 1) { //Cave Terrian 1
                        cave_Wall.draw(tile_x, tile_y);
                        
                    }
                    if (tileType == 2) { //Cave Ceiling 2
                        cave_ceiling.draw(tile_x, tile_y);
                    }
                    if (tileType == 3) { //Black Block 3
                        blackBlock.draw(tile_x, tile_y);
                    }
                }
            }
        };

function cave_level2() {
    //console.log(player_coordinates_x + "X");
    //console.log(player_coordinates_y + "Y");
    requestID = requestAnimationFrame(cave_level2);
    drawCave_level2();
    Context.context.beginPath(); Context.context.fillStyle = "rgba(0,0,0,0.2)"; Context.context.fillRect(0,0,Context.width, Context.height); Context.context.fill();Context.context.closePath();
    resetAnimationCounter();
    playerMovement();
    is_playerMove = false;
    playerDirection = 0;
    if (key.escape) {return;} //Access Player Menu
    shadekeeper1_Engaged = enemyAggro(shadekeeper1_x, shadekeeper1_y, shadekeeper1_Alive, shadekeeper1_Engaged);
        if (shadekeeper1_Alive) {
            shadekeeper1_x = enemyPatrol(shadekeeper1_Alive, shadekeeper1_x, shadekeeper1_y, shadekeeper1_Left, shadekeeper1_Right, "shadekeeper", 300, 240, false);
            if (shadekeeper1_x >= 280 && shadekeeper1_Right) { shadekeeper1_Right = false; shadekeeper1_Left = true; }
            if (shadekeeper1_x <= 240 && shadekeeper1_Left) { shadekeeper1_Left = false; shadekeeper1_Right = true; }
        }

     //260 X
     //200 Y
    if (player_coordinates_x >= 440 && player_coordinates_x <= 470 &&
       player_coordinates_y >= 440 && player_coordinates_y <= 460) {
         cancelAnimationFrame(requestID); player_coordinates_x = 460; player_coordinates_y = 80; cave_level1(); return;
    }
   
};