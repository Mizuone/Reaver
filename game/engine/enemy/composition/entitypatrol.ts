export default (influenceObject: any) => ({

  patrol: (patToX?: any, patToY?: any): void => {

    if (patToX) {

      patrolCoordinates({
        entity: influenceObject,
        entityCoordinate: influenceObject.x,
        entityStartCoordinate: influenceObject.startX,
        patrolToCoordinate: patToX,
        entityCoordinateProp: 'x'
      });
    }

    if (patToY) {

      patrolCoordinates({
        entity: influenceObject,
        entityCoordinate: influenceObject.y,
        entityStartCoordinate: influenceObject.startY,
        patrolToCoordinate: patToY,
        entityCoordinateProp: 'y'
      });

    }

  }

});

function togglePatrolled(patrolDetailsObj: any) {

  if (patrolDetailsObj.entityCoordinate === patrolDetailsObj.patrolToCoordinate) {
    patrolDetailsObj.entity.patrolled = true;
  }
  if (patrolDetailsObj.entityCoordinate === patrolDetailsObj.entityStartCoordinate) {
    patrolDetailsObj.entity.patrolled = false;
  }

}

function patrolCoordinates(patrolDetailsObj: any) {

  togglePatrolled(patrolDetailsObj);

  if (patrolDetailsObj.entity.patrolled) {
    patrolDetailsObj.patrolToCoordinate = patrolDetailsObj.entityStartCoordinate;
  }

  if (patrolDetailsObj.entityCoordinate > patrolDetailsObj.patrolToCoordinate) {
    patrolDetailsObj.entity[patrolDetailsObj.entityCoordinateProp] -= 1;
    patrolDetailsObj.entity.direction = [3,4,5];
  }

  if (patrolDetailsObj.entityCoordinate < patrolDetailsObj.patrolToCoordinate) {
    patrolDetailsObj.entity[patrolDetailsObj.entityCoordinateProp] += 1;
    patrolDetailsObj.entity.direction = [6,7,8];
  }

}
