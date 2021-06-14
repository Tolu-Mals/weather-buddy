const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlLoader = require('html-loader');
const path = require("path");

module.exports = {
    entry: {
        index: './src/index.js',
        main: './src/main.js'
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader',"css-loader","sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        }
      ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html')
    })
  ],
}