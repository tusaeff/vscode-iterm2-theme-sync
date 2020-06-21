const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackScriptExtPlugin = require('script-ext-html-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/webview.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'webview.js',
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      cache: false,
      title: 'Syncing VSCode theme with ITerm2',
      filename: 'webview.html',
    }),
    new HtmlWebpackScriptExtPlugin({
      inline: ['webview.js'],
    }),
  ]
}