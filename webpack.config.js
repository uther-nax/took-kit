const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.*', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: 'bundle.[name].js',
    publicPath: 'https://uther-nax.github.io/took-kit/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'demo',
      template: 'assets/index.ejs',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'assets'), to: path.join(__dirname, 'dist') },
      ],
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    host: 'localhost',
    port: 8080,
    hot: true,
  },
};
