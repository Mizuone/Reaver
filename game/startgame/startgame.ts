import '../sprites/cave_ceiling.png';
import '../sprites/cave_openingdoor.png';
import '../sprites/black_block.png';
import '../sprites/bushV1.png';
import '../sprites/slime_spritesheet.png';
import '../sprites/slimeSuper_spritesheet.png';
import '../sprites/shadewalker_Spritesheet.png';
import '../sprites/shadeKeeper_Spritesheet.png';
import '../sprites/playerAttack_Spritesheet.png';
import '../sprites/character_spritesheet.png';
import '../sprites/cliffgrass_side.png';
import '../sprites/dirt_terrian.png';
import '../sprites/cave_terrain.png';
import '../sprites/grass1.png' ;
import '../sprites/cave_openingdoor.png';
import '../sprites/cave_ceiling.png';
import '../sprites/cave_wall.png';
import '../sprites/caveentrance_open.png';
import '../sprites/cave_wall.png';
import '../sprites/cliffgrass_all.png';
import '../sprites/cliff_front.png';
import '../sprites/cliffgrass_bottomleft.png';
import '../sprites/cliffgrass_back.png';
import '../sprites/cliffgrass_front.png';
import '../sprites/cliffgrass_bottomright.png';
import '../sprites/cliffgrass_topbottom.png';
import '../sprites/cliffgrass_leftside.png';
import '../sprites/cliffgrass_topright.png';
import '../sprites/cliffgrass_topleft.png';
import '../sprites/cliffgrass_uprightbottom.png';
import '../sprites/cliffgrass_upleftbottom.png';
import '../sitesheet.css';

import { InitializeGameScenes, ridgeArea } from '../scenes/scenes';

import Player from '../engine/character/player';
import { RunGame } from '../rungame'
import { initializeAnimationCounters } from '../engine/animation/animationcounter';

export const startGame = () => {
    InitializeGameScenes();
    const player = new Player('sprites/character_spritesheet.png');

    player.keyboard.intializeKeyBoardEvents();

    RunGame({ player: player, gameScene: ridgeArea });
}

initializeAnimationCounters();
startGame();