import { cave_battle_map_sprites, cave_map_sprites } from './scene_sprites/cave_map_sprites';

import Enemy from '../engine/enemy/enemy';
import { GameScene } from '../engine/interfaces/GameScene';
import Player from '../engine/character/player';
import Scene from './scene';
import { ShadeKeeper } from '../engine/enemy/enemies/enemy-database';
import { SpriteCollection } from '../engine/interfaces/map-sprites';
import { TransferScene } from '../engine/interfaces/transfer-scene';
import animationID from '../engine/animation/animationframeid/animationid';
import { mapRidgeAreaCaveLevelTwo } from './maps/cave_maps';
import { resetAnimationCounter } from '../engine/animation/animationcounter';
import { transferNewLocationOnCollision } from '../engine/helpers/helpers';

export default class RidgeAreaCaveLevelTwo implements GameScene {
    sceneMapSprites: SpriteCollection = cave_map_sprites;
    battleMapSprites: SpriteCollection = cave_battle_map_sprites;

    private shadeKeeper: Enemy;
    private transferScenes: TransferScene[];
    private tileCollisionMin = 2;

    constructor() {
        this.shadeKeeper = new Enemy(ShadeKeeper, 275, 200);
        this.shadeKeeper.direction = [6, 6, 7];
        this.shadeKeeper.endGame = true;
    }

    draw(player: Player) {
        let ridgeScene = new Scene(mapRidgeAreaCaveLevelTwo, this.sceneMapSprites, player);
        ridgeScene.renderMap(this.tileCollisionMin);

        this.shadeKeeper.process(player, this);

        transferNewLocationOnCollision(player, this.transferScenes, animationID.animationid.id);
        
        resetAnimationCounter();
    }

    setTransferScenes(_transferScenes: TransferScene[]) {
        this.transferScenes = _transferScenes;
    }
}
