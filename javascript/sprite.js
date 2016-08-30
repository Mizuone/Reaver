var Sprite = function(fn) {

    this.TO_RADIANS = Math.PI/180;
    this.image = null;
    
    this.is_pattern = false;
    this.pattern = null;
    this.pattern_x_times = 0;
    this.load = function(filename) { this.image = new Image(); this.image.src = filename; return this; };
    this.to_pattern = function(x_times) { this.pattern_x_times = x_times; this.pattern = Context.context.createPattern(this.image, 'repeat'); this.is_pattern = true; };
    
    
    this.spritesheet = null;

    // Load the sprite
    if (fn != undefined && fn != "" && fn != null)
    {
        this.load(fn);
        console.log("Loaded sprite " + fn);
    }
    else
    {
        console.log("Unable to load sprite. Filename '" + fn + "' is undefined or null.");
    }
    // Normal draw
    
    this.draw = function(x, y, various) {
        // Draw player Sprite 
        if (various === undefined) {
            Context.context.drawImage(this.image, x, y, BLOCK_W, BLOCK_H);
        } else 
            // if various is a single numeric frame id
        if ($.isNumeric(various) && various >= 0) {
            var res = i2xy(various, 3);
            Context.context.drawImage(this.image, res[0]*32, res[1]*32, 32, 32, x, y, 32, 32);
        } else
            //if various is Animation sequence  - an array [1,2,3] or 17,18,19
         if (various.length != undefined && various.length > 0) {
             
             if (animationCounter[animationCounterIndex].animationDelay++ >= 3) {
                animationCounter[animationCounterIndex].animationDelay = delayAmount;
                animationCounter[animationCounterIndex].animationIndexCounter++;
                if (animationCounter[animationCounterIndex].animationIndexCounter >= various.length)
                    animationCounter[animationCounterIndex].animationIndexCounter = 0;
                animationCounter[animationCounterIndex].animationCurrentFrame = various[animationCounter[animationCounterIndex].animationIndexCounter];
            }
            var res = i2xy(animationCounter[animationCounterIndex].animationCurrentFrame, 3);
            Context.context.drawImage(this.image, res[0]*32, res[1]*32, 32, 32, x, y, 32, 32);
            
            animationCounterIndex++;
        }
    }   
};