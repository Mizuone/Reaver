import { cave_ceiling, cave_wall } from '../entity/cave_entities/sprites';

import Enemy from '../engine/enemy/enemy';
import { GameScene } from '../engine/interfaces/GameScene';
import Player from '../engine/character/player';
import Scene from './scene';
import { ShadeKeeper } from '../engine/enemy/enemies/enemy-database';
import { TransferScene } from '../engine/interfaces/transfer-scene';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';
import { blackblock } from '../entity/miscellaneous_entities/sprites';
import maps from './maps/maps';
import { ridgeAreaCaveLevelOne } from './scenes';
import terrain from '../entity/terrain_entities/sprites';
import { transferNewLocationOnCollision } from '../engine/helpers/helpers';

const spriteObj = {
    cave_wall: cave_wall,
    cave_terrain: terrain.cave_terrain,
    cave_ceiling: cave_ceiling,
    blackblock: blackblock,
};

export default class RidgeAreaCaveLevelTwo implements GameScene {
    private shadeKeeper: Enemy;
    private transferScenes: TransferScene[];
    private tileCollisionMin = 1;

    constructor() {
        this.shadeKeeper = new Enemy(ShadeKeeper, 275, 200);
        this.shadeKeeper.direction = [6, 6, 7];
        
        this.transferScenes = [
            {
                gameScene: ridgeAreaCaveLevelOne,
                transferX: 460,
                transferY: 475,
                arriveX: 484,
                arriveY: 75
            },
        ];
    }

    draw(player: Player) {
        let ridgeScene = new Scene(maps.mapRidgeAreaCaveLevelTwo, spriteObj, player);
        ridgeScene.renderMap(this.tileCollisionMin);

        this.shadeKeeper.process(player, this);

        transferNewLocationOnCollision(player, this.transferScenes, animationID.animationid.id);
        
        animation.resetanimationcounter();
    }
}
