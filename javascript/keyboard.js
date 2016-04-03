var keyboard = function () {
    this.w = false;
    this.s = false;
    this.a = false;
    this.d = false;
    this.escape = false;
}


var KEY_LEFT = 65;
var KEY_RIGHT = 68;
var KEY_FORWARD = 87;
var KEY_BACK = 83;
var KEY_ESCAPE = 27;


var DIR_E = 1;
var DIR_NE = 2;
var DIR_N = 4;
var DIR_NW = 8;
var DIR_W = 16;
var DIR_SW = 32;
var DIR_S = 64;
var DIR_SE = 128;


//var key = [false, false, false, false]; //right = 0 left =1 forward = 2 -- back = 3
window.key = null;


function initializeKeyboard() {
    
    window.key = new keyboard();
    
    $(document).keydown(function(e) {
        
        if (e.keyCode == KEY_LEFT) {
            key.a = true;
        }
        if (e.keyCode == KEY_RIGHT) {
            key.d = true;
        }
        if (e.keyCode == KEY_FORWARD) {
            key.w = true;
        }
        if (e.keyCode == KEY_BACK) {
            key.s = true;
        }
        if (e.keyCode == KEY_ESCAPE) {
            key.escape = true;
            playerMenu++;
            if (playerMenu == 2) {
                key.escape = false;
                playerMenu = 0;
            }
        }
        
    });
    $(document).keyup(function(e) {
        
        if (e.keyCode == KEY_LEFT) {
            key.a = false;
        }
        if (e.keyCode == KEY_RIGHT) {
            key.d = false;
        }
        if (e.keyCode == KEY_FORWARD) {
            key.w = false;
        }
        if (e.keyCode == KEY_BACK) {
            key.s = false;
        }
        if (e.keyCode == KEY_ESCAPE) {

        }
    });
}

function playerMovement() {
    if (key.escape) {
                drawUI();
                return;
            }
    
     // Animated characters
            
            if (key.w) { player_coordinates_y -= 2; is_playerMove = true; playerDirection |= DIR_N;
            }
            if (key.s) { player_coordinates_y += 2; is_playerMove = true; playerDirection |= DIR_S;
            }
            if (key.a) { player_coordinates_x -= 2; is_playerMove = true; playerDirection |= DIR_W;
            }
            if (key.d) { player_coordinates_x += 2; is_playerMove = true; playerDirection |= DIR_E;
            }
            
            if (key.d && key.a) { player_coordinates_x += 0; is_playerMove = false;
            }
            
        
            if (is_playerMove) {
                if (playerDirection & DIR_N) { playerSequence = [9,10,11]; player_sprite.draw(player_coordinates_x, player_coordinates_y, playerSequence);
                }
                if (playerDirection & DIR_S) { playerSequence = [0,1,2]; player_sprite.draw(player_coordinates_x, player_coordinates_y, playerSequence);
                }
                if (playerDirection & DIR_W) { playerSequence = [3,4,5]; player_sprite.draw(player_coordinates_x, player_coordinates_y, playerSequence);
                }
                if (playerDirection & DIR_E) { playerSequence = [6,7,8]; player_sprite.draw(player_coordinates_x, player_coordinates_y, playerSequence);
                }
                
                
                if (playerDirection & DIR_N && playerDirection & DIR_E) { playerSequence = [9,10,11]; player_sprite.draw(player_coordinates_x, player_coordinates_y, playerSequence);
                }
                if (playerDirection & DIR_N && playerDirection & DIR_W) { playerSequence = [9,10,11]; player_sprite.draw(player_coordinates_x, player_coordinates_y, playerSequence);
                }
                if (playerDirection & DIR_S && playerDirection & DIR_E) { playerSequence = [0,1,2]; player_sprite.draw(player_coordinates_x, player_coordinates_y, playerSequence);
                }
                if (playerDirection & DIR_S && playerDirection & DIR_W) { playerSequence = [0,1,2]; player_sprite.draw(player_coordinates_x, player_coordinates_y, playerSequence);
                }
                //
            } else {
                player_sprite.draw(player_coordinates_x, player_coordinates_y, 0);
            }
};