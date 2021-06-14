const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlLoader = require('html-loader');
const WorkboxPlugin = require('workbox-webpack-plugin');
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
    }),
     new WorkboxPlugin.GenerateSW({
       // these options encourage the ServiceWorkers to get in there fast
       // and not allow any straggling "old" SWs to hang around
       clientsClaim: true,
       skipWaiting: true,
     }),
  ],
}