
export default (influenceObject) => ({

  patrol: (patToX, patToY) => {

    if (patToX) {

      patrolCoordinates({
        entity: influenceObject,
        entityCoordinate: influenceObject.xCoordinates,
        entityStartCoordinate: influenceObject.startX,
        patrolToCoordinate: patToX,
        entityCoordinateProp: 'xCoordinates'
      });
    }

    if (patToY) {

      patrolCoordinates({
        entity: influenceObject,
        entityCoordinate: influenceObject.yCoordinates,
        entityStartCoordinate: influenceObject.startY,
        patrolToCoordinate: patToY,
        entityCoordinateProp: 'yCoordinates'
      });

    }

  }

});

function togglePatrolled(patrolDetailsObj) {

  if (patrolDetailsObj.entityCoordinate === patrolDetailsObj.patrolToCoordinate) {
    patrolDetailsObj.entity.patrolled = true;
  }
  if (patrolDetailsObj.entityCoordinate === patrolDetailsObj.entityStartCoordinate) {
    patrolDetailsObj.entity.patrolled = false;
  }

}

function patrolCoordinates(patrolDetailsObj) {

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