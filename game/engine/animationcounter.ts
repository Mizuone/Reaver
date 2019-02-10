import Animate from './animate';
import blockSize from './blocksize/blocksize';
import Context from './context/context';
import utility from '../utility';

let animationCounterIndex = 0;
let animationArr: any[] | Animate[] = [];

function drawAnimation(animationImageObj: { various: any; sprite: any; x: any; y: any; }) {
  // Draw player Sprite
  let various = animationImageObj.various;
  const delayAmount = -2;

  if (various === undefined) {
      Context.context.drawImage(animationImageObj.sprite, animationImageObj.x, animationImageObj.y, blockSize.blockw, blockSize.blockh);
      return;
  }
      // if various is a single numeric frame id
  if (typeof various === 'number' && various >= 0) {
      var res = utility.i2xy(various, 3);
      Context.context.drawImage(animationImageObj.sprite, res[0]*32, res[1]*32, 32, 32, animationImageObj.x, animationImageObj.y, 32, 32);
  } else
      //if various is Animation sequence  - an array [1,2,3] or 17,18,19
   if (various.length != undefined && various.length > 0) {


       if (animationArr[animationCounterIndex].animationDelay++ >= 3) {

          animationArr[animationCounterIndex].animationDelay = delayAmount;
          animationArr[animationCounterIndex].animationIndexCounter++;

          if (animationArr[animationCounterIndex].animationIndexCounter >= various.length)

              animationArr[animationCounterIndex].animationIndexCounter = 0;
          animationArr[animationCounterIndex].animationCurrentFrame = various[animationArr[animationCounterIndex].animationIndexCounter];
      }
      var res = utility.i2xy(animationArr[animationCounterIndex].animationCurrentFrame, 3);
      Context.context.drawImage(animationImageObj.sprite, res[0]*32, res[1]*32, 32, 32, animationImageObj.x, animationImageObj.y, 32, 32);

      animationCounterIndex++;
  }

}

function initializeAnimationCounters() {
  for (var i = 0; i < 32000; i++) {
    animationArr[i] = new Animate(0,0,0);
  }
};

function resetAnimationCounter() {
  animationCounterIndex= 0;
}

export default {
  drawanimation: (animationImageObj: any) => {
    drawAnimation(animationImageObj)
  },
  initializeanimationcounters: initializeAnimationCounters,
  resetanimationcounter: resetAnimationCounter
}
