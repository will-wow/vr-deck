var path = require("path");

var CopyPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var webpack = require("webpack");

module.exports = {
  devServer: {
    disableHostCheck: true,
    hotOnly: true
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([{ from: "src/assets", to: "assets" }])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ["babel-loader", "aframe-super-hot-loader"]
      },
      {
        test: /\.html/,
        exclude: /(node_modules|index.html)/,
        use: [
          "aframe-super-hot-html-loader",
          {
            loader: "html-require-loader",
            options: {
              root: path.resolve(__dirname, "src")
            }
          }
        ]
      },
      {
        test: /\.glsl/,
        exclude: /(node_modules)/,
        loader: "webpack-glsl-loader"
      },
      {
        test: /\.png|\.jpg/,
        exclude: /(node_modules)/,
        use: ["url-loader"]
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")]
  }
};
