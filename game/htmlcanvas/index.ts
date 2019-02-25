// @ts-ignore
import cliffgrass_back from '../sprites/cliffgrass_back.png';
// @ts-ignore
import cliffgrass_front from '../sprites/cliffgrass_front.png';
// @ts-ignore
import cliffgrass_leftside from '../sprites/cliffgrass_leftside.png';
// @ts-ignore
import cliff_front from '../sprites/cliff_front.png';
// @ts-ignore
import cliffgrass_topright from '../sprites/cliffgrass_topright.png';
// @ts-ignore
import cliffgrass_all from '../sprites/cliffgrass_all.png';
// @ts-ignore
import cliffgrass_bottomright from '../sprites/cliffgrass_bottomright.png';
// @ts-ignore
import cliffgrass_bottomleft from '../sprites/cliffgrass_bottomleft.png';
// @ts-ignore
import cliffgrass_topleft from '../sprites/cliffgrass_topleft.png';
// @ts-ignore
import cliffgrass_uprightbottom from '../sprites/cliffgrass_uprightbottom.png';
// @ts-ignore
import cliffgrass_topbottom from '../sprites/cliffgrass_topbottom.png';
// @ts-ignore
import caveentrance_open from '../sprites/caveentrance_open.png';
// @ts-ignore
import cave_wall from '../sprites/cave_wall.png';
// @ts-ignore
import cave_ceiling from '../sprites/cave_ceiling.png';
// @ts-ignore
import cave_openingdoor from '../sprites/cave_openingdoor.png';
// @ts-ignore
import black_block from '../sprites/black_block.png';
// @ts-ignore
import bushV1 from '../sprites/bushV1.png';
// @ts-ignore
import slime_spritesheet from '../sprites/slime_spritesheet.png';
// @ts-ignore
import slimeSuper_spritesheet from '../sprites/slimeSuper_spritesheet.png';
// @ts-ignore
import shadewalker_Spritesheet from '../sprites/shadewalker_Spritesheet.png';
// @ts-ignore
import shadeKeeper_Spritesheet from '../sprites/shadeKeeper_Spritesheet.png';
// @ts-ignore
import playerAttack_Spritesheet from '../sprites/playerAttack_Spritesheet.png';
// @ts-ignore
import character_spritesheet from '../sprites/character_spritesheet.png';
// @ts-ignore
import cliffgrass_side from '../sprites/cliffgrass_side.png';
// @ts-ignore
import dirt_terrian from '../sprites/dirt_terrian.png';
// @ts-ignore
import cave_terrain from '../sprites/cave_terrain.png';
// @ts-ignore
import grass1 from '../sprites/grass1.png';
// @ts-ignore
import cave_opening from '../sprites/cave_openingdoor.png';
// @ts-ignore
import cave_ceiling from '../sprites/cave_ceiling.png';
// @ts-ignore
import cave_wall from '../sprites/cave_wall.png';

console.log(cliffgrass_back, cliffgrass_front, cliffgrass_leftside, cliffgrass_front, cliff_front, cliffgrass_topright,
    cliffgrass_all, cliffgrass_bottomright, cliffgrass_bottomleft, cliffgrass_topleft, cliffgrass_uprightbottom, cliffgrass_topbottom,
    caveentrance_open, cave_wall, cave_ceiling, cave_openingdoor, black_block, bushV1, slime_spritesheet, slimeSuper_spritesheet, shadewalker_Spritesheet,
    shadeKeeper_Spritesheet, playerAttack_Spritesheet, character_spritesheet, cliffgrass_side, dirt_terrian, cave_terrain, grass1, cave_opening,
    cave_ceiling, cave_wall);

import { runGame } from '../rungame'
import { sceneDictionary } from '../scenes/scenedictionary';
import Player from '../engine/character/player';
import animationCounter from '../engine/animation/animationcounter';

const player = new Player('sprites/character_spritesheet.png');
const startArea = sceneDictionary.ridgeAreaCave.location;

player.keyboard.intializeKeyBoardEvents();
animationCounter.initializeanimationcounters();

runGame({ playerObject: player, locationClass: startArea });