const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = path.resolve(__dirname, './');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
  context: ROOT,
  entry: './game/htmlcanvas/index.ts',
  output: {
    filename: "[name].bundle.js",
    path: DESTINATION
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      ROOT,
      'node_modules'
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ],
  module: {
    rules: [
      /****************
       * PRE-LOADERS
       *****************/
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },


      /****************
       * LOADERS
       *****************/
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'sprites/'
            }
          }
        ]
      }
    ]
  },
  watch: true
};
