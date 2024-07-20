import Limiter from './engine/fpslimiter';
import { RunGameOptions } from './engine/interfaces/run-game-options';
import animationID from './engine/animation/animationframeid/animationid';

const limiter = new Limiter(60);

export const RunGame = (runGameOptions: RunGameOptions) => {
    animationID.animationid.id = requestAnimationFrame(() => {
        RunGame(runGameOptions);
    });

    if (limiter.fpsLimiter()) {
        limiter.updateCurrentTime();
        if (runGameOptions.player.keyboard.escapeToggle > 0) {
            runGameOptions.player.keyboard.checkToDisplayUserMenu(runGameOptions.player);
        } else {
            runGameOptions.player.keyboard.keyboardPlayerMovement();
            runGameOptions.locationClass.draw(runGameOptions.player);
            runGameOptions.player.render();
        }
    }

}
