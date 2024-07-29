import { BLOCK_H, BLOCK_W } from '../settings/blocksize';

import Animate from './animate';
import GameCanvas from '../canvas/game-canvas';
import { SpriteDetails } from '../interfaces/sprite-details';
import { maxAnimatableSprites } from '../settings/settings';
import utility from '../../utility';

let counterIndex = 0;
let animatableSprites: Animate[] = [];

export function drawAnimation(animatableSprite: SpriteDetails) {
	let spriteSheet = animatableSprite.spriteSheet;
	const delayAmount = -2;

	if (spriteSheet === undefined) {
		GameCanvas.context.drawImage(animatableSprite.sprite, animatableSprite.x, animatableSprite.y, BLOCK_W, BLOCK_H);
		return;
	}

	if (spriteSheet.length != undefined && spriteSheet.length > 0) {
		if (animatableSprites[counterIndex].delay++ >= 3) {

			animatableSprites[counterIndex].delay = delayAmount;
			animatableSprites[counterIndex].indexCounter++;

			if (animatableSprites[counterIndex].indexCounter >= spriteSheet.length)

					animatableSprites[counterIndex].indexCounter = 0;
			animatableSprites[counterIndex].currentFrame = spriteSheet[animatableSprites[counterIndex].indexCounter];
		}

		var res = utility.i2xy(animatableSprites[counterIndex].currentFrame, 3);
		GameCanvas.context.drawImage(animatableSprite.sprite, res[0]*32, res[1]*32, 32, 32, animatableSprite.x, animatableSprite.y, 32, 32);

		counterIndex++;
	}

}

export function initializeAnimationCounters() {
	for (var i = 0; i < maxAnimatableSprites; i++) {
		animatableSprites[i] = new Animate(0,0,0);
	}
};

export function resetAnimationCounter() {
	counterIndex = 0;
}
