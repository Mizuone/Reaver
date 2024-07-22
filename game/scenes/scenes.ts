import RidgeArea from "./ridgearea";
import RidgeAreaBack from "./ridgeareaback";
import RidgeAreaCave from "./ridgeareacave";
import RidgeAreaCaveLevelOne from "./ridgeareacave_level1";
import RidgeAreaCaveLevelTwo from './ridgeareacave_level2';

export let ridgeAreaBack: RidgeAreaBack;
export let ridgeArea: RidgeArea;
export let ridgeAreaCave: RidgeAreaCave;
export let ridgeAreaCaveLevelOne: RidgeAreaCaveLevelOne;
export let ridgeAreaCaveLevelTwo: RidgeAreaCaveLevelTwo;

export const InitializeGameScenes = () => {
    ridgeAreaBack = new RidgeAreaBack();
    ridgeArea = new RidgeArea();
    ridgeAreaCave = new RidgeAreaCave();
    ridgeAreaCaveLevelOne = new RidgeAreaCaveLevelOne();
    ridgeAreaCaveLevelTwo = new RidgeAreaCaveLevelTwo();
}
