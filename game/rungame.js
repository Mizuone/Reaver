import RidgeArea from './scenes/ridgearea';
import animationCounter from './engine/animationcounter';
import animationID from './engine/animationframeid/animationid';
import Player from './engine/character/player';
import Keyboard from './engine/keyboard';

const player = new Player('sprites/character_spritesheet.png');
const keyboard = new Keyboard(player);
const ridgeAreaScene = new RidgeArea();

const fps = 60;
let now;
let currentTime = Date.now();
let interval = 1000 / fps;
let delta;

animationCounter.initializeanimationcounters();
keyboard.intializeKeyBoardEvents();

const runGame = () => {
  animationID.animationid.id = requestAnimationFrame(runGame);

  now = Date.now();
  delta = now - currentTime;

  if (delta > interval) {
    currentTime = now - (delta % interval);

    keyboard.keyboardPlayerMovement();
    ridgeAreaScene.draw(player);
    player.renderPlayer();

  }


}

runGame();
