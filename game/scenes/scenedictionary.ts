import * as location from './location-creation';

export const sceneDictionary = {
    ridgeArea: {
        location: location.ridgeArea,
        transitionLocations: [
            {
                location: location.ridgeAreaCave,
                transferXCoordinate: 635,
                transferYCoordinate: 120
            },
        ]
    },
    ridgeAreaCave: {
        location: location.ridgeAreaCave,
        transitionLocations: [
            {
                location: location.ridgeArea,
                transferXCoordinate: 9,
                transferYCoordinate: 100
            },
            {
                location: location.ridgeAreaCaveLevelOne,
                transferXCoordinate: 495,
                transferYCoordinate: 310,
                playerNewX: 320,
                playerNewY: 427
            }
        ]
    },
    ridgeAreaCaveLevelOne: {
        location: location.ridgeAreaCaveLevelOne,
        transitionLocations: [
            {
                location: location.ridgeAreaCave,
                transferXCoordinate: 330,
                transferYCoordinate: 480,
                playerNewX: 485,
                playerNewY: 325
            },
            {
                location: location.ridgeAreaCaveLevelTwo,
                transferXCoordinate: 496,
                transferYCoordinate: 52,
                playerNewX: 0,
                playerNewY: 0,
            }
        ]
    },
    ridgeAreaCaveLevelTwo: {
        location: location.ridgeAreaCaveLevelTwo,
        transitionLocations: [
            {
                location: location.ridgeAreaCaveLevelOne,
                transferXCoordinate: 330,
                transferYCoordinate: 480,
                playerNewX: 485,
                playerNewY: 325
            },
        ]
    }
}