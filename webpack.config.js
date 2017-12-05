const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const distPath = path.join(__dirname, process.env.NODE_ENV === 'production' ? 'build' : 'src')

module.exports = {
  devtool: 'source-map',
  entry: {
   app: ['./src/stylesheet/styles.js', './src/javascript/index.js'],
  },
  output: {
    path: distPath,
    filename: 'javascript/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin
          .extract({
            fallbackLoader: 'style-loader',
            loader: [
              { loader: 'css-loader', options: { url: false, modules: false, sourceMaps: true } },
              { loader: 'sass-loader'},
            ]
          })
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|fontsvg|eot|ttf|otf|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        THREE: "three"
    }),
    new ExtractTextPlugin('stylesheet/main.css'),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    proxy: {'**': 'http://localhost:8000/PROJET_WEBGL/PROJET_WEBGL/src'}
  }
}
