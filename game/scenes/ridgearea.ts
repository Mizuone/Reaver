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
import { mapRidge } from './maps/ridge_maps';
import miscellaneousEntities from '../entity/miscellaneous_entities/misc_sprites';
import { resetAnimationCounter } from '../engine/animation/animationcounter';

export default class RidgeArea implements GameScene {
  sceneMapSprites: SpriteCollection = ridge_map_sprites;
  battleMapSprites: SpriteCollection = ridge_battle_map_sprites; 

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
  private tileCollisionMin = ridgeMapTileCollision;

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
  }

  draw(player: Player) {
    let ridgeScene = new Scene(mapRidge, this.sceneMapSprites, player);
    ridgeScene.renderMap(this.tileCollisionMin);

    renderMiscSprites(miscellaneousEntities.bush, this.miscEntities);
    transferNewLocationOnCollision(player, this.transferScenes, animationID.animationid.id);

    this.slimeMidBottom.process(player, this, { patrol: { patToX: 200, patToY: undefined } });
    this.slimeMidTop.process(player, this, { patrol: { patToX: 250, patToY: undefined } });
    this.slimeBottom.process(player, this, { patrol: { patToX: undefined, patToY: 380 } });
    this.slimeRight.process(player, this, { patrol: { patToX: 450, patToY: undefined } });
    this.slimeLeft.process(player, this, { patrol: { patToX: 300, patToY: undefined } });
    this.slimeSuper.process(player, this);
  
    resetAnimationCounter();
  }

  setTransferScenes(_transferScenes: TransferScene[]) {
    this.transferScenes = _transferScenes;
  }
}
