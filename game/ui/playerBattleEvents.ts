import Enemy from "../engine/enemy/enemy";
import Player from "../engine/character/player";

export const attackEnemy = (playerObject: Player, enemyObject: Enemy) => {
    if (!enemyObject.battleTurn && !playerObject.disableAttack) {
        playerObject.battleTurn = true;
        playerObject.disableAttack = true;
        playerObject.battleMoveForward = true;
    }
}