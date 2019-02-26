import RidgeArea from "./ridgearea";
import RidgeAreaCave from "./ridgeareacave";
import RidgeAreaCaveLevelOne from "./ridgeareacave_level1";
import RidgeAreaCaveLevelTwo from './ridgeareacave_level2';

const ridgeAreaReference = new RidgeArea();
const ridgeAreaCaveReference = new RidgeAreaCave();
const ridgeAreaCaveLevelOneReference = new RidgeAreaCaveLevelOne();
const ridgeAreaCaveLevelTwoReference = new RidgeAreaCaveLevelTwo();

export const ridgeArea = ridgeAreaReference;
export const ridgeAreaCave = ridgeAreaCaveReference;
export const ridgeAreaCaveLevelOne = ridgeAreaCaveLevelOneReference;
export const ridgeAreaCaveLevelTwo = ridgeAreaCaveLevelTwoReference;