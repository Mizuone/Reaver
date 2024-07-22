import { GreenSlime, SlimeSuper } from '../engine/enemy/enemies/enemy-database';
import { renderMiscSprites, transferNewLocationOnCollision } from '../engine/helpers/helpers';
import { ridgeAreaBack, ridgeAreaCave } from './scenes';

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
import ridgeEntities from '../entity/ridgearea_entities/sprites';
import terrain from '../entity/terrain_entities/sprites';

const spriteObj = {
  grass_terrain: terrain.grass_terrain,
  dirt_terrain: terrain.dirt_terrain,
  ...ridgeEntities
};

export default class RidgeArea implements GameScene {
  private slimeMidTop: Enemy;
  private slimeMidBottom: Enemy;
  private slimeBottom: Enemy;
  private slimeRight: Enemy;
  private slimeLeft: Enemy;
  private slimeSuper: Enemy;
  private transferScenes: TransferScene[];
  private miscEntities: StaticEntity[] = [
    { x: 230, y: 300 },
    { x: 400, y: 250 },
    { x: 425, y: 10 },
    { x: 120, y: 100 },
    { x: 125, y: 350 }
  ]
  private tileCollisionMin = 2;

  constructor() {
    this.slimeMidBottom = new Enemy(GreenSlime, 300, 215);
    Object.assign(this.slimeMidBottom, canPatrol(this.slimeMidBottom));

    this.slimeMidTop = new Enemy(GreenSlime, 325, 155);
    Object.assign(this.slimeMidTop, canPatrol(this.slimeMidTop));

    this.slimeBottom = new Enemy(GreenSlime, 285, 275);
    Object.assign(this.slimeBottom, canPatrol(this.slimeBottom));

    this.slimeRight = new Enemy(GreenSlime, 525, 155);
    Object.assign(this.slimeRight, canPatrol(this.slimeRight));

    this.slimeLeft = new Enemy(GreenSlime, 75, 55);
    Object.assign(this.slimeLeft, canPatrol(this.slimeLeft));

    this.slimeSuper = new Enemy(SlimeSuper, 542, 93);

    this.transferScenes = [
      {
        gameScene: ridgeAreaBack,
        transferX: 0,
        transferY: 356,
        arriveX: 585,
        arriveY: 352
      },
      {
        gameScene: ridgeAreaCave,
        transferX: 635,
        transferY: 120,
        arriveX: 40,
        arriveY: 95
      },
    ];
  }

  draw(player: Player) {
      let ridgeScene = new Scene(maps.mapridge, spriteObj, player);
      ridgeScene.renderMap(this.tileCollisionMin);
  
      renderMiscSprites(miscellaneousEntities.bush, this.miscEntities);
      transferNewLocationOnCollision(player, this.transferScenes, animationID.animationid.id);

      this.slimeMidBottom.process(player, this, { patrol: { patToX: 200, patToY: undefined } });
      this.slimeMidTop.process(player, this, { patrol: { patToX: 250, patToY: undefined } });
      this.slimeBottom.process(player, this, { patrol: { patToX: undefined, patToY: 380 } });
      this.slimeRight.process(player, this, { patrol: { patToX: 450, patToY: undefined } });
      this.slimeLeft.process(player, this, { patrol: { patToX: 300, patToY: undefined } });
      this.slimeSuper.process(player, this);
    
      animation.resetanimationcounter();
  }
}
