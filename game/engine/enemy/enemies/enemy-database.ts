import { shadeKeeperSprite, shadeWalkerSprite, slimeSprite, slimeSuperSprite } from "../../../entity/enemy_entities/sprites";

import { EnemyDetails } from "../../interfaces/enemy-details";

export const ShadeKeeper: EnemyDetails = {
    sprite: shadeKeeperSprite,
    name: 'Shade Keeper',
    health: 125,
    defense: 0,
    damage: 7,
    goldReward: 50,
    experienceReward: 300,
};

export const ShadeWalker: EnemyDetails = {
    sprite: shadeWalkerSprite,
    name: 'Shade Walker',
    health: 50,
    defense: 0,
    damage: 5,
    goldReward: 25,
    experienceReward: 50,
}

export const SlimeSuper: EnemyDetails = {
    sprite: slimeSuperSprite,
    name: 'Slime Super',
    health: 80,
    defense: 0,
    damage: 7,
    goldReward: 15,
    experienceReward: 85,
}

export const GreenSlime: EnemyDetails = {
    sprite: slimeSprite,
    name: 'Green Slime',
    health: 80,
    defense: 0,
    damage: 7,
    goldReward: 15,
    experienceReward: 85,
}