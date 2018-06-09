
export default function (xOne, yOne, xTwo, yTwo) {

  let xDistance = xOne - xTwo;
  let yDistance = yOne - yTwo;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance,2));

}
