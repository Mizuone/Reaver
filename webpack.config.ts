import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { Configuration } from 'webpack';
import { EsbuildPlugin } from 'esbuild-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

const ROOT = path.resolve(__dirname, './');
const DESTINATION = path.resolve(__dirname, 'dist');

const config: Configuration = {
  context: ROOT,
  entry: './game/htmlcanvas/index.ts',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: DESTINATION,
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [ROOT, 'node_modules']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './game/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'ts',
            target: 'es2015'
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'sprites/[name][ext]'
        }
      },
      {
        test: /\.(s*)css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new EsbuildPlugin({
        target: 'es2015'
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'source-map'
};

export default config;