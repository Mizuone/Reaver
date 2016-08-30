
function mobileControls() {
            
            
            if (battleScreen && !freezeMovement) {
                player_coordinates_x = 350;
                player_coordinates_y = 250;
                freezeMovement = true;
            }
            if (!battleScreen) {
                eventsOn();
                $(document).on('touchstart', '#myCanvas', function(e) {
                    var xPos = e.originalEvent.touches[0].pageX,
                        yPos = e.originalEvent.touches[0].pageY;
                    
                    handleMouseClick(xPos, yPos);
                });
            }
            function eventsOn() {
                var mycanvas = document.getElementById("myCanvas"),
                hammertime = new Hammer(mycanvas, {});
                hammertime.on('panright', function(ev) {
                    if (!battleScreen) {
                        player_coordinates_x += 2; is_playerMove = true; playerDirection |= DIR_E;
                    }
                    if (battleScreen) {
                        player_coordinates_x = player_coordinates_x;
                    }
                });
                hammertime.on('panleft', function(ev) {
                    if (!battleScreen) {
                        player_coordinates_x -= 2; is_playerMove = true; playerDirection |= DIR_W;
                    }
                    if (battleScreen) {
                        player_coordinates_x = player_coordinates_x;
                    }
                        
                });
                hammertime.on('panup', function(ev) {
                    if (!battleScreen) {
                        player_coordinates_y -= 2; is_playerMove = true; playerDirection |= DIR_N;
                    }
                    if (battleScreen) {
                        player_coordinates_y = player_coordinates_y;
                    }
                        
                });
                hammertime.on('pandown', function(ev) {
                    if (!battleScreen) {
                        player_coordinates_y += 2; is_playerMove = true; playerDirection |= DIR_S;
                    }
                    if (battleScreen) {
                        player_coordinates_y = player_coordinates_y;
                    }
                        
                });
            }
    }
