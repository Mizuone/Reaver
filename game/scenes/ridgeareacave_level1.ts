import { cave_battle_map_sprites, cave_map_sprites } from './scene_sprites/cave_map_sprites';

import Enemy from '../engine/enemy/enemy';
import { GameScene } from '../engine/interfaces/GameScene';
import Player from '../engine/character/player';
import Scene from './scene';
import { ShadeWalker } from '../engine/enemy/enemies/enemy-database';
import { SpriteCollection } from '../engine/interfaces/map-sprites';
import { TransferScene } from '../engine/interfaces/transfer-scene';
import animationID from '../engine/animation/animationframeid/animationid';
import canPatrol from '../engine/enemy/composition/entitypatrol';
import { mapRidgeAreaCaveLevelOne } from './maps/cave_maps';
import { resetAnimationCounter } from '../engine/animation/animationcounter';
import { transferNewLocationOnCollision } from '../engine/helpers/helpers';

export default class RidgeAreaCaveLevelOne implements GameScene {
    sceneMapSprites: SpriteCollection = cave_map_sprites;
    battleMapSprites: SpriteCollection = cave_battle_map_sprites;

    private shadeWalkerLeft: Enemy;
    private shadeWalkerRight: Enemy;
    private transferScenes: TransferScene[];
    private tileCollisionMin = 2;

    constructor() {
        this.shadeWalkerLeft = new Enemy(ShadeWalker, 100, 150);
        Object.assign(this.shadeWalkerLeft, canPatrol(this.shadeWalkerLeft));

        this.shadeWalkerRight = new Enemy(ShadeWalker, 480, 65);
    }

    draw(player: Player) {
        let ridgeScene = new Scene(mapRidgeAreaCaveLevelOne, this.sceneMapSprites, player);
        ridgeScene.renderMap(this.tileCollisionMin);

        this.shadeWalkerLeft.process(player, this, { patrol: { patToX: 200, patToY: undefined } });
        this.shadeWalkerRight.process(player, this);

        transferNewLocationOnCollision(player, this.transferScenes, animationID.animationid.id);
        
        resetAnimationCounter();
    }

    setTransferScenes(_transferScenes: TransferScene[]) {
        this.transferScenes = _transferScenes;
    }
}
