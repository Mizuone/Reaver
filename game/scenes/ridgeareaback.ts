import { GreenSlime, SlimeSuper } from '../engine/enemy/enemies/enemy-database';
import { renderMiscSprites, transferNewLocationOnCollision } from '../engine/helpers/helpers';
import { ridgeMapTileCollision, ridge_battle_map_sprites, ridge_map_sprites } from './scene_sprites/ridge_map_sprites';

import Enemy from '../engine/enemy/enemy';
import { GameScene } from '../engine/interfaces/GameScene';
import Player from '../engine/character/player';
import Scene from './scene';
import { SpriteCollection } from '../engine/interfaces/map-sprites';
import { StaticEntity } from '../engine/interfaces/static-entity';
import { TransferScene } from '../engine/interfaces/transfer-scene';
import animationID from '../engine/animation/animationframeid/animationid';
import canPatrol from '../engine/enemy/composition/entitypatrol';
import { mapRidgeAreaBack } from './maps/ridge_maps';
import miscellaneousEntities from '../entity/miscellaneous_entities/misc_sprites';
import { resetAnimationCounter } from '../engine/animation/animationcounter';

export default class RidgeAreaBack implements GameScene {
	sceneMapSprites: SpriteCollection = ridge_map_sprites;
	battleMapSprites: SpriteCollection = ridge_battle_map_sprites;

	private slimeMidBottom: Enemy;
	private slimeCenterTop: Enemy;
	private slimeCenterBottom: Enemy;
	private slimeSuper: Enemy;
	private tileCollisionMin: number = ridgeMapTileCollision;
	private transferScenes: TransferScene[];
	private miscEntities: StaticEntity[] = [
		{ x: 47, y: 200 },
		{ x: 174, y: 71 },
		{ x: 533, y: 86 },
		{ x: 332, y: 435 },
		{ x: 299, y: 48 }
	];

	constructor() {
		this.slimeMidBottom = new Enemy(GreenSlime, 355, 345);
		Object.assign(this.slimeMidBottom, canPatrol(this.slimeMidBottom));

		this.slimeCenterTop = new Enemy(GreenSlime, 350, 197);
		Object.assign(this.slimeCenterTop, canPatrol(this.slimeCenterTop));

		this.slimeCenterBottom = new Enemy(GreenSlime, 199, 250);
		Object.assign(this.slimeCenterBottom, canPatrol(this.slimeCenterBottom));

		this.slimeSuper = new Enemy(SlimeSuper, 259, 164);
	}

	draw(player: Player) {
		let ridgeScene = new Scene(mapRidgeAreaBack, this.sceneMapSprites, player);
		ridgeScene.renderMap(this.tileCollisionMin);
	
		renderMiscSprites(miscellaneousEntities.bush, this.miscEntities);
		transferNewLocationOnCollision(player, this.transferScenes, animationID.animationid.id);

		this.slimeCenterTop.process(player, this, { patrol: { patToX: 190, patToY: undefined } });
		this.slimeCenterBottom.process(player, this, { patrol: { patToX: 401, patToY: undefined } });
		this.slimeMidBottom.process(player, this, { patrol: { patToX: 520, patToY: undefined } });
		this.slimeSuper.process(player, this);

		resetAnimationCounter();
	}

	setTransferScenes(_transferScenes: TransferScene[]) {
		this.transferScenes = _transferScenes;
	}
}
