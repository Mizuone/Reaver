import * as location from './location-creation';

export const sceneDictionary = {
    ridgeBackArea: {
        location: location.ridgeBackArea,
        transitionLocations: [
            {
                location: location.ridgeArea,
                transferXCoordinate: 630,
                transferYCoordinate: 370,
                playerNewX: 43,
                playerNewY: 367
            },
        ]
    },
    ridgeArea: {
        location: location.ridgeArea,
        transitionLocations: [
            {
                location: location.ridgeBackArea,
                transferXCoordinate: 0,
                transferYCoordinate: 370,
                playerNewX: 609,
                playerNewY: 369
            },
            {
                location: location.ridgeAreaCave,
                transferXCoordinate: 635,
                transferYCoordinate: 120,
                playerNewX: 40, 
                playerNewY: 95
            },
        ]
    },
    ridgeAreaCave: {
        location: location.ridgeAreaCave,
        transitionLocations: [
            {
                location: location.ridgeArea,
                transferXCoordinate: 9,
                transferYCoordinate: 100,
                playerNewX: 590,
                playerNewY: 95
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
                playerNewX: 450,
                playerNewY: 436,
            }
        ]
    },
    ridgeAreaCaveLevelTwo: {
        location: location.ridgeAreaCaveLevelTwo,
        transitionLocations: [
            {
                location: location.ridgeAreaCaveLevelOne,
                transferXCoordinate: 460,
                transferYCoordinate: 475,
                playerNewX: 484,
                playerNewY: 75
            },
        ]
    }
}