import { GreenSlime, SlimeSuper } from '../engine/enemy/enemies/enemy-database';
import { cliff_front, cliffentrance_open, cliffgrass_back, cliffgrass_bottomleft, cliffgrass_bottomright, cliffgrass_front, cliffgrass_left, cliffgrass_right, cliffgrass_topleft, cliffgrass_topright } from '../entity/ridgearea_entities/sprites';
import { renderMiscSprites, transferNewLocationOnCollision } from '../engine/helpers/helpers';
import { ridgeArea, ridgeAreaCaveLevelOne } from './scenes';

import Enemy from '../engine/enemy/enemy';
import { GameScene } from '../engine/interfaces/GameScene';
import Player from '../engine/character/player';
import Scene from './scene';
import { StaticEntity } from '../engine/interfaces/static-entity';
import { TransferScene } from '../engine/interfaces/transfer-scene';
import animation from '../engine/animation/animationcounter';
import animationID from '../engine/animation/animationframeid/animationid';
import canPatrol from '../engine/enemy/composition/entitypatrol';
import maps from './maps/maps';
import miscellaneousEntities from '../entity/miscellaneous_entities/sprites';
import terrain from '../entity/terrain_entities/sprites';

const spriteObj = {
    grass_terrain: terrain.grass_terrain,
    dirt_terrain: terrain.dirt_terrain,
    cliffentrance_open: cliffentrance_open,
    cliffgrass_topleft: cliffgrass_topleft,
    cliffgrass_topright: cliffgrass_topright,
    cliffgrass_front: cliffgrass_front,
    cliffgrass_back: cliffgrass_back,
    cliffgrass_right: cliffgrass_right,
    cliffgrass_left: cliffgrass_left,
    cliffgrass_bottomright: cliffgrass_bottomright,
    cliffgrass_bottomleft: cliffgrass_bottomleft,
    cliff_front: cliff_front
};

export default class RidgeAreaCave implements GameScene {
    private slimeSuper: Enemy;
    private slimeTop: Enemy;
    private slimeMiddle: Enemy;
    private tileCollisionMin: number = 3;
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
    
        this.transferScenes = [
            {
                gameScene: ridgeArea,
                transferX: 9,
                transferY: 100,
                arriveX: 590,
                arriveY: 95
            },
            {
                gameScene: ridgeAreaCaveLevelOne,
                transferX: 495,
                transferY: 310,
                arriveX: 320,
                arriveY: 427
            }
        ];
    }

    draw(player: Player) {
        let ridgeScene = new Scene(maps.mapRidgeAreaCave, spriteObj, player);
        ridgeScene.renderMap(this.tileCollisionMin);

        renderMiscSprites(miscellaneousEntities.bush, this.miscEntities);

        this.slimeSuper.process(player, this);
        this.slimeTop.process(player, this, { patrol: { patToX: 350, patToY: undefined} });
        this.slimeMiddle.process(player, this, { patrol: { patToX: 350, patToY: undefined } });

        transferNewLocationOnCollision(player, this.transferScenes, animationID.animationid.id);
        
        animation.resetanimationcounter();
    }
}
