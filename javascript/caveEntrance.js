
   
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
                    (function() {
                        if (tileType >= 2 && tileType != 5) {
                            player_coordinates_x = Player.player_ObjectcollisionX(player_coordinates_x, player_coordinates_y, tile_x, tile_y);
                            player_coordinates_y = Player.player_ObjectcollisionY(player_coordinates_x, player_coordinates_y, tile_x, tile_y);
                        }
                    })();
                    if (tileType == 0){
                        grass.draw(tile_x, tile_y);
                    }
                    if (tileType == 1){ // Dirt 1
                        dirt_Terrain.draw(tile_x, tile_y);
                    }
                    if (tileType == 2) { // Cliff 2
                        cliff_Front.draw(tile_x, tile_y);
                    }
                    if (tileType == 3) { // Top Left 3
                        cliffgrass_TopLeft.draw(tile_x, tile_y);
                    }
                    if (tileType == 4) { // Top Right 4
                        cliffgrass_Topright.draw(tile_x, tile_y);
                    }
                    if(tileType == 5) { //Entrance Cave 5
                        cliffEntrance_Open.draw(tile_x, tile_y);
                    }
                    if (tileType == 6) { // North Facing 6
                        cliffgrass_Back1.draw(tile_x, tile_y);
                    }
                    if (tileType == 7) { //Right sided 7
                        cliffgrass_Right.draw(tile_x, tile_y);
                    }
                    if (tileType == 8) { //Left sided 8
                        cliffgrass_Left.draw(tile_x, tile_y);
                    }
                    if (tileType == 9) { //Front facing 9
                        cliffgrass_Front.draw(tile_x, tile_y);
                    }
                    if (tileType == 10) {
                        cliffgrass_Bottomright.draw(tile_x, tile_y);
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
    //console.log(player_coordinates_x + "X");
    //console.log(player_coordinates_y + "Y");
    requestID = requestAnimationFrame(caveEntrance);
    drawEntrance();
    resetAnimationCounter();
    playerMovement();
    is_playerMove = false;
    playerDirection = 0;
    if (key.escape) {return;} //Access Player Menu
    
        if (slimeEntrance1_Alive) {
            slimeEntrance1_x = enemyPatrol(slimeEntrance1_Alive, slimeEntrance1_x, slimeEntrance1_y, slimeEntrance1_Left, slimeEntrance1_Right, "slime", 450, 150, false);
            if (slimeEntrance1_x >= 350 && slimeEntrance1_Right) { slimeEntrance1_Right = false; slimeEntrance1_Left = true; }
            if (slimeEntrance1_x === 160 && slimeEntrance1_Left) { slimeEntrance1_Left = false; slimeEntrance1_Right = true; }
        }
        if (slimeEntrance2_Alive) {
            slimeEntrance2_x = enemyPatrol(slimeEntrance2_Alive, slimeEntrance2_x, slimeEntrance2_y, slimeEntrance2_Left, slimeEntrance2_Right, "slimesuper", 450, 300, false);
            if (slimeEntrance2_x >= 400 && slimeEntrance2_Right) { slimeEntrance2_Right = false; slimeEntrance2_Left = true; }
            if (slimeEntrance2_x === 310 && slimeEntrance2_Left) { slimeEntrance2_Left = false; slimeEntrance2_Right = true; }
        }
    slimeEntrance1_Engaged = enemyAggro(slimeEntrance1_x, slimeEntrance1_y, slimeEntrance1_Alive, slimeEntrance1_Engaged);
    slimeEntrance2_Engaged = enemyAggro(slimeEntrance2_x, slimeEntrance2_y, slimeEntrance2_Alive, slimeEntrance2_Engaged);
    //console.log(player_coordinates_x + "X");
    //console.log(player_coordinates_y + "Y");
    if (player_coordinates_x >= 0 && player_coordinates_x <= 15 &&
        player_coordinates_y >= 84 && player_coordinates_y <= 100) {
                cancelAnimationFrame(requestID);
                drawForest(); player_coordinates_x = 590; player_coordinates_y = 94; return;
            }
    if (player_coordinates_x >= 470 && player_coordinates_x <= 500 &&
        player_coordinates_y >= 300 && player_coordinates_y <= 305) {
        cancelAnimationFrame(requestID); player_coordinates_x = 310; player_coordinates_y = 410; cave_level1(); return;
    }
};