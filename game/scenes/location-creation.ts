import RidgeArea from "./ridgearea";
import RidgeAreaBack from "./ridgebackarea";
import RidgeAreaCave from "./ridgeareacave";
import RidgeAreaCaveLevelOne from "./ridgeareacave_level1";
import RidgeAreaCaveLevelTwo from './ridgeareacave_level2';

export let ridgeBackArea = new RidgeAreaBack();
export let ridgeArea = new RidgeArea();
export let ridgeAreaCave = new RidgeAreaCave();
export let ridgeAreaCaveLevelOne = new RidgeAreaCaveLevelOne();
export let ridgeAreaCaveLevelTwo = new RidgeAreaCaveLevelTwo();

export const RestartScenes = () => {
    ridgeBackArea = new RidgeAreaBack();
    ridgeArea = new RidgeArea();
    ridgeAreaCave = new RidgeAreaCave();
    ridgeAreaCaveLevelOne = new RidgeAreaCaveLevelOne();
    ridgeAreaCaveLevelTwo = new RidgeAreaCaveLevelTwo();
};
