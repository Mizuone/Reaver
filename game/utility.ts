function i2xy(index: number, mapWidth: number) {
    var x = index % mapWidth;
    var y = Math.floor(index / mapWidth);

    return[x,y]
};
function xy2i(x: number, y: number, mapWidth: number) {
    return y * mapWidth + x;
}

export default {
  i2xy: (index: any, mapWidth: any) => {
    return i2xy(index, mapWidth);
  },
  xy2i: (x: any, y: any, mapWidth: any) => {
    return xy2i(x, y, mapWidth);
  }

}
