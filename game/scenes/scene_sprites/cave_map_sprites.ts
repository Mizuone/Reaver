import { cave_ceiling, cave_opening, cave_wall } from "../../entity/cave_entities/cave_sprites";

import { SpriteCollection } from "../../engine/interfaces/map-sprites";
import { blackblock } from "../../entity/miscellaneous_entities/misc_sprites";
import { cave_terrain } from "../../entity/terrain_entities/terrain_sprites";

export const caveMapTileCollisionMin = 3;

export const cave_battle_map_sprites: SpriteCollection = {
    blackblock,
    cave_wall
}

export const cave_map_sprites: SpriteCollection = {
    blackblock,
    cave_wall,
    cave_opening,
    cave_terrain,
    cave_ceiling,
}

