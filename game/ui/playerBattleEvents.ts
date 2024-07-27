import Enemy from "../engine/enemy/enemy";
import Player from "../engine/character/player";

export const attackEnemy = (player: Player, enemy: Enemy) => {
    if (!enemy.battleTurn && !player.disableAttack) {
        player.battleTurn = true;
        player.disableAttack = true;
        player.battleMoveForward = true;
    }
}