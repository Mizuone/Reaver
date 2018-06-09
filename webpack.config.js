const glob = require('glob');

module.exports = {
  entry: glob.sync("./game/" + '**/*.js'),
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  watch: true
}
