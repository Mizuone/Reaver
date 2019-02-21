import Sprite from '../../engine/sprite';
import canPatrol from '../../engine/composition/entitypatrol';
import Enemy from '../../engine/enemy/enemy';
import slimeDetails from '../../engine/enemyentities/slime';

const cliffgrass_back = new Sprite("sprites/cliffgrass_back.png");
const cliffgrass_front = new Sprite("sprites/cliffgrass_front.png");
const cliffgrass_left = new Sprite("sprites/cliffgrass_leftside.png");
const cliffgrass_right = new Sprite("sprites/cliffgrass_side.png");
const cliff_front = new Sprite("sprites/cliff_front.png");
const cliffgrass_topright = new Sprite("sprites/cliffgrass_topright.png");
const cliffgrass_all = new Sprite("sprites/cliffgrass_all.png");
const cliffgrass_bottomright = new Sprite("sprites/cliffgrass_bottomright.png");
const cliffgrass_bottomleft = new Sprite("sprites/cliffgrass_bottomleft.png");
const cliffgrass_topleft = new Sprite("sprites/cliffgrass_topleft.png");
const cliffgrass_toprightbottom = new Sprite("sprites/cliffgrass_uprightbottom.png");
const cliffgrass_topbottom = new Sprite("sprites/cliffgrass_topbottom.png");
const cliffentrance_open = new Sprite("sprites/caveentrance_open.png");

export default {

    cliffgrass_back: cliffgrass_back,
    cliffgrass_front: cliffgrass_front,
    cliffgrass_left: cliffgrass_left,
    cliffgrass_right: cliffgrass_right,
    cliff_front: cliff_front,
    cliffgrass_topright: cliffgrass_topright,
    cliffgrass_all: cliffgrass_all,
    cliffgrass_bottomright: cliffgrass_bottomright,
    cliffgrass_bottomleft: cliffgrass_bottomleft,
    cliffgrass_topleft: cliffgrass_topleft,
    cliffgrass_toprightbottom: cliffgrass_toprightbottom,
    cliffgrass_topbottom: cliffgrass_topbottom,
    cliffentrance_open: cliffentrance_open

}

let slimeMidBottom = new Enemy(slimeDetails, 300, 215);
Object.assign(slimeMidBottom, canPatrol(slimeMidBottom));

let slimeMidTop = new Enemy(slimeDetails, 325, 155);
Object.assign(slimeMidTop, canPatrol(slimeMidTop));

let slimeBottom = new Enemy(slimeDetails, 285, 275);
Object.assign(slimeBottom, canPatrol(slimeBottom));

let slimeRight = new Enemy(slimeDetails, 525, 155);
Object.assign(slimeRight, canPatrol(slimeRight));

let slimeLeft = new Enemy(slimeDetails, 75, 55);
Object.assign(slimeLeft, canPatrol(slimeLeft));

export const ridgeEnemies = [slimeMidBottom, slimeMidTop, slimeBottom, slimeRight, slimeLeft];
