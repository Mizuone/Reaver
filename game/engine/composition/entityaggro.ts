
export default (influenceObject: { xCoordinates: number; yCoordinates: number; }) => ({
  aggro: (playerX: number, playerY: number) => {

    let xDistance = influenceObject.xCoordinates - playerX;
    let yDistance = influenceObject.yCoordinates - playerY;

    let distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance,2));

    if (distance <= 150) {
      // Todo implement pathfinding algorithm
      console.log(influenceObject.xCoordinates - playerX);
      influenceObject.xCoordinates = influenceObject.xCoordinates - playerX;
      influenceObject.yCoordinates = influenceObject.yCoordinates - playerY;
      console.log(influenceObject.yCoordinates);
    }

  }
})
