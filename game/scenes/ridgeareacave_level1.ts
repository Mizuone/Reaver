import { cave_ceiling, cave_opening, cave_wall } from '../entity/cave_entities/sprites';

import Enemy from '../engine/enemy/enemy';
import { GameScene } from '../engine/interfaces/GameScene';
import Player from '../engine/character/player';
import Scene from './scene';
import { ShadeWalker } from '../engine/enemy/enemies/enemy-database';
import { TransferScene } from '../engine/interfaces/transfer-scene';
import animationID from '../engine/animation/animationframeid/animationid';
import { blackblock } from '../entity/miscellaneous_entities/sprites';
import canPatrol from '../engine/enemy/composition/entitypatrol';
import maps from './maps/maps';
import { resetAnimationCounter } from '../engine/animation/animationcounter';
import terrain from '../entity/terrain_entities/sprites';
import { transferNewLocationOnCollision } from '../engine/helpers/helpers';

const spriteObj = {
    cave_wall: cave_wall,
    cave_opening: cave_opening,
    cave_terrain: terrain.cave_terrain,
    cave_ceiling: cave_ceiling,
    blackblock: blackblock,
};

export default class RidgeAreaCaveLevelOne implements GameScene {
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
        let ridgeScene = new Scene(maps.mapRidgeAreaCaveLevelOne, spriteObj, player);
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
