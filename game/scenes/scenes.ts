import RidgeArea from "./ridgearea";
import RidgeAreaBack from "./ridgeareaback";
import RidgeAreaCave from "./ridgeareacave";
import RidgeAreaCaveLevelOne from "./ridgeareacave_level1";
import RidgeAreaCaveLevelTwo from './ridgeareacave_level2';

export var ridgeArea: RidgeArea;
export var ridgeAreaBack: RidgeAreaBack;
export var ridgeAreaCave: RidgeAreaCave;
export var ridgeAreaCaveLevelOne: RidgeAreaCaveLevelOne;
export var ridgeAreaCaveLevelTwo: RidgeAreaCaveLevelTwo;

export const InitializeGameScenes = () => {
    ridgeArea = new RidgeArea();
    ridgeAreaBack = new RidgeAreaBack();
    ridgeAreaCave = new RidgeAreaCave();
    ridgeAreaCaveLevelOne = new RidgeAreaCaveLevelOne();
    ridgeAreaCaveLevelTwo = new RidgeAreaCaveLevelTwo();

    ridgeArea.setTransferScenes([
        {
            gameScene: ridgeAreaBack,
            transferX: 0,
            transferY: 356,
            arriveX: 585,
            arriveY: 352
        },
        {
            gameScene: ridgeAreaCave,
            transferX: 635,
            transferY: 120,
            arriveX: 40,
            arriveY: 95
        },
    ]);

    ridgeAreaBack.setTransferScenes([
        {
            gameScene: ridgeArea,
            transferX: 630,
            transferY: 355,
            arriveX: 30,
            arriveY: 346
        },
    ]);

    ridgeAreaCave.setTransferScenes([
        {
            gameScene: ridgeArea,
            transferX: 9,
            transferY: 100,
            arriveX: 590,
            arriveY: 95
        },
        {
            gameScene: ridgeAreaCaveLevelOne,
            transferX: 495,
            transferY: 310,
            arriveX: 320,
            arriveY: 427
        }
    ]);

    ridgeAreaCaveLevelOne.setTransferScenes([
        {
            gameScene: ridgeAreaCave,
            transferX: 330,
            transferY: 480,
            arriveX: 485,
            arriveY: 325
        },
        {
            gameScene: ridgeAreaCaveLevelTwo,
            transferX: 496,
            transferY: 52,
            arriveX: 450,
            arriveY: 436,
        }
    ]);

    ridgeAreaCaveLevelTwo.setTransferScenes([
        {
            gameScene: ridgeAreaCaveLevelOne,
            transferX: 460,
            transferY: 475,
            arriveX: 484,
            arriveY: 75
        },
    ]);
}