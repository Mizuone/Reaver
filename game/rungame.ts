import animationID from './engine/animation/animationframeid/animationid';
import Player from './engine/character/player';
import Limiter from './engine/fpslimiter';

const limiter = new Limiter(60);

export const runGame = (locationClass: any, playerObject: Player) => {
    animationID.animationid.id = requestAnimationFrame(() => {
        runGame(locationClass, playerObject);
    });

    if (limiter.fpsLimiter()) {
        limiter.updateCurrentTime();
        
        playerObject.keyboard.keyboardPlayerMovement();
        locationClass.draw(playerObject);
        playerObject.renderPlayer();
    }

}
