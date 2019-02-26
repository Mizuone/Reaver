import animationID from './engine/animation/animationframeid/animationid';
import Limiter from './engine/fpslimiter';
import { RunGameOptions } from './engine/dtos/run-game-options';

const limiter = new Limiter(60);

export const runGame = (runGameOptions: RunGameOptions) => {
    animationID.animationid.id = requestAnimationFrame(() => {
        runGame(runGameOptions);
    });

    if (limiter.fpsLimiter()) {
        limiter.updateCurrentTime();
        if (runGameOptions.playerObject.keyboard.escapeToggle > 0) {
            runGameOptions.playerObject.keyboard.checkToDisplayUserMenu(runGameOptions.playerObject);
        } else {
            runGameOptions.playerObject.keyboard.keyboardPlayerMovement();
            runGameOptions.locationClass.draw(runGameOptions.playerObject);
            runGameOptions.playerObject.renderPlayer();
        }
    }

}
