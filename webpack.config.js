const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // tell webpack the entry point of application, where to create dependency graph
  entry: ['regenerator-runtime/runtime.js', './src/index.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      //tells webpack to inject bundle file generated into index.html
      template: './src/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // preset-env/react transpile ES2015+/react syntax
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
