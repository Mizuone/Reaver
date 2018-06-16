import RidgeArea from './scenes/ridgearea';
import animationCounter from './engine/animationcounter';
import animationID from './engine/animationframeid/animationid';
import Player from './engine/character/player';
import Keyboard from './engine/keyboard';
import Limiter from './engine/fpslimiter.js';

const player = new Player('sprites/character_spritesheet.png');
const keyboard = new Keyboard(player);
const ridgeAreaScene = new RidgeArea();
const limiter = new Limiter(60);

animationCounter.initializeanimationcounters();
keyboard.intializeKeyBoardEvents();

const runGame = () => {
  animationID.animationid.id = requestAnimationFrame(runGame);

  if (limiter.fpsLimiter()) {
    limiter.updateCurrentTime();

    keyboard.keyboardPlayerMovement();
    ridgeAreaScene.draw(player);
    player.renderPlayer();

  }


}

runGame();