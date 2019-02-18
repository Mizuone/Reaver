import Enemy from "../engine/enemy/enemy";
import Player from "../engine/character/player";

export const attackEnemy = (playerObject: Player, enemyObject: Enemy) => {
    playerObject.disableAttack = true;
    playerObject.battleMoveForward = true;
}

// {x: 507, y: 184}
// {x: 564, y: 197}