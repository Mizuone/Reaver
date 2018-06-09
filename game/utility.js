function i2xy(index, mapWidth) {
    var x = index % mapWidth;
    var y = Math.floor(index / mapWidth);

    return[x,y]
};
function xy2i(x, y, mapWidth) {
    return y * mapWidth + x;
}

export default {
  i2xy: (index, mapWidth) => {
    return i2xy(index, mapWidth);
  },
  xy2i: (x, y, mapWidth) => {
    return xy2i(x, y, mapWidth);
  }

}
