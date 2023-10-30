const path = require("path");
const webpack = require("webpack");
const HTMLWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: '/',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [[
              '@babel/preset-env', 
              { targets: "defaults"}
            ],
            [
              '@babel/preset-react',
              { runtime: "automatic"}
            ],
          ]
          },
        },
      },
      {
        test: /\.(png|svg|jpe?g|jpeg|gif|pdf)$/i,
        type: 'asset/resource'
      },
     {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new HTMLWebPackPlugin({
      template: './templates/frontend/index.html'
    })
  ],
};