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
import { mapRidgeAreaCave } from './maps/ridge_maps';
import miscellaneousEntities from '../entity/miscellaneous_entities/misc_sprites';
import { resetAnimationCounter } from '../engine/animation/animationcounter';

export default class RidgeAreaCave implements GameScene {
    sceneMapSprites: SpriteCollection = ridge_map_sprites;
    battleMapSprites: SpriteCollection = ridge_battle_map_sprites;

    private slimeSuper: Enemy;
    private slimeTop: Enemy;
    private slimeMiddle: Enemy;
    private tileCollisionMin: number = ridgeMapTileCollision;
    private transferScenes: TransferScene[];
    private miscEntities: StaticEntity[] = [
        { x: 450, y: 400 },
        { x: 495, y: 185 },
        { x: 575, y: 75 },
        { x: 50, y: 175 },
        { x: 125, y: 350 }
    ];


    constructor() {
        this.slimeSuper = new Enemy(SlimeSuper, 429, 315);

        this.slimeTop = new Enemy(GreenSlime, 175, 115);
        Object.assign(this.slimeTop, canPatrol(this.slimeTop));

        this.slimeMiddle = new Enemy(GreenSlime, 255, 270);
        Object.assign(this.slimeMiddle, canPatrol(this.slimeMiddle));        
    }

    draw(player: Player) {
        let ridgeScene = new Scene(mapRidgeAreaCave, this.sceneMapSprites, player);
        ridgeScene.renderMap(this.tileCollisionMin);

        renderMiscSprites(miscellaneousEntities.bush, this.miscEntities);

        this.slimeSuper.process(player, this);
        this.slimeTop.process(player, this, { patrol: { patToX: 350, patToY: undefined} });
        this.slimeMiddle.process(player, this, { patrol: { patToX: 350, patToY: undefined } });

        transferNewLocationOnCollision(player, this.transferScenes, animationID.animationid.id);
        
        resetAnimationCounter();
    }

    setTransferScenes(_transferScenes: TransferScene[]) {
        this.transferScenes = _transferScenes;
    }
}
