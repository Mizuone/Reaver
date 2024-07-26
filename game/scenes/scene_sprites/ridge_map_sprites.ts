import { dirt_terrain, grass_terrain } from "../../entity/terrain_entities/terrain_sprites";

import { SpriteCollection } from "../../engine/interfaces/map-sprites";
import { blackblock } from "../../entity/miscellaneous_entities/misc_sprites";
import ridge_sprites from "../../entity/ridgearea_entities/ridge_sprites";

export const ridge_battle_map_sprites: SpriteCollection = {
    blackblock,
    grass_terrain
}

export const ridge_map_sprites: SpriteCollection = {
    grass_terrain,
    dirt_terrain,
    ...ridge_sprites
}