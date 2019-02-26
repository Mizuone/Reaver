
export default function (xOne: number, yOne: number, xTwo: number, yTwo: number) {

  let xDistance = xOne - xTwo;
  let yDistance = yOne - yTwo;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance,2));

}
