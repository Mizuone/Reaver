
var mapCave_level1 =[3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,3,3,
                     3,3,3,3,3,3,3,3,3,3,3,3,2,0,0,4,0,2,3,3,
                     3,3,2,2,2,2,2,2,3,3,3,3,2,1,1,1,1,2,3,3,
                     3,3,2,0,0,0,0,2,3,3,3,3,2,1,1,1,1,2,3,3,
                     3,3,2,1,1,1,1,2,3,3,3,3,2,2,1,1,2,2,3,3,
                     3,3,2,1,1,1,1,2,2,2,2,2,2,2,1,1,2,0,3,3,
                     3,3,2,2,2,2,1,0,0,2,2,2,0,0,1,1,2,3,3,3,
                     3,3,0,0,0,2,1,1,1,2,2,2,1,1,1,1,2,3,3,3,
                     3,3,3,3,3,0,2,1,1,0,2,0,1,1,2,2,2,3,3,3,
                     3,3,3,3,3,3,2,1,1,1,0,1,1,1,2,0,0,3,3,3,
                     3,3,3,3,3,3,2,2,1,1,1,1,1,2,2,3,3,3,3,3,
                     3,3,3,3,3,3,0,2,2,1,1,1,2,2,0,3,3,3,3,3,
                     3,3,3,3,3,3,3,0,2,1,1,1,2,0,3,3,3,3,3,3,
                     3,3,3,3,3,3,3,3,0,2,1,2,0,3,3,3,3,3,3,3,
                     3,3,3,3,3,3,3,3,3,2,1,2,3,3,3,3,3,3,3,3 ];
                    
        var mapCave1Index = 0;

        function drawCave_level1() {
            mapCave1Index = 0;
            for (var y = 0; y < 15; y++)
            {
                for (var x = 0; x < 20; x++, mapCave1Index++)
                {
                    var tile_x = x * BLOCK_W;
                    var tile_y = y * BLOCK_H;

                    var tileType = mapCave_level1[mapCave1Index];
                    (function() {
                        if (tileType == 0 || tileType == 2) {
                            player_coordinates_x = Player.player_ObjectcollisionX(player_coordinates_x, player_coordinates_y, tile_x, tile_y);
                            player_coordinates_y = Player.player_ObjectcollisionY(player_coordinates_x, player_coordinates_y, tile_x, tile_y);
                        }
                    })();
                    if (tileType == 0) { //Cave Wall 0
                        cave_Terrain.draw(tile_x, tile_y);
                    }
                    if (tileType == 1) { //Cave Terrian 0
                        cave_Wall.draw(tile_x, tile_y);
                        
                    }
                    if (tileType == 2) { //Cave Ceiling 2
                        cave_ceiling.draw(tile_x, tile_y);
                    }
                    if (tileType == 3) { //Black Block 3
                        blackBlock.draw(tile_x, tile_y);
                    }
                    if (tileType == 4) {
                        cave_Opening.draw(tile_x, tile_y);
                    }
                    
                }
            }
        };

function cave_level1() {
    //console.log(player_coordinates_x + "X");
    //console.log(player_coordinates_y + "Y");
    requestID = requestAnimationFrame(cave_level1);
    drawCave_level1();
    Context.context.beginPath(); Context.context.fillStyle = "rgba(0,0,0,0.2)"; Context.context.fillRect(0,0,Context.width, Context.height); Context.context.fill();Context.context.closePath();
    resetAnimationCounter();
    playerMovement();
    is_playerMove = false;
    playerDirection = 0;
    if (key.escape) {return;} //Access Player Menu
    
    shadewalker1_Engaged = enemyAggro(shadewalker1_x, shadewalker1_y, shadewalker1_Alive, shadewalker1_Engaged);
    shadewalker2_Engaged = enemyAggro(shadewalker2_x, shadewalker2_y, shadewalker2_Alive, shadewalker2_Engaged);
        if (shadewalker1_Alive) {
            shadewalker1_x = enemyPatrol(shadewalker1_Alive, shadewalker1_x, shadewalker1_y, shadewalker1_Left, shadewalker1_Right, "shadewalker", 210, 130, false);
            if (shadewalker1_x >= 200 && shadewalker1_Right) { shadewalker1_Right = false; shadewalker1_Left = true; }
            if (shadewalker1_x <= 130 && shadewalker1_Left) { shadewalker1_Left = false; shadewalker1_Right = true; }
        }
        if (shadewalker2_Alive) {
            shadewalker2_x = enemyPatrol(shadewalker2_Alive, shadewalker2_x, shadewalker2_y, shadewalker2_Left, shadewalker2_Right, "shadewalker", 500, 440, false);
            if (shadewalker2_x >= 480 && shadewalker2_Right) { shadewalker2_Right = false; shadewalker2_Left = true; }
            if (shadewalker2_x <= 440 && shadewalker2_Left) { shadewalker2_Left = false; shadewalker2_Right = true; }
        }
    if (player_coordinates_x >= 315 && player_coordinates_x <= 330 &&
       player_coordinates_y >= 430 && player_coordinates_y <= 450) {
         cancelAnimationFrame(requestID); player_coordinates_x = 460; player_coordinates_y = 330; caveEntrance(); return;
    }
    if (player_coordinates_x >= 460 && player_coordinates_x <= 500 &&
       player_coordinates_y >= 30 && player_coordinates_y <= 60) {
         cancelAnimationFrame(requestID); player_coordinates_x = 440; player_coordinates_y = 420; cave_level2(); return;
    }
   
};
