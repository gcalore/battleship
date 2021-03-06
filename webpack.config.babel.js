import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
}

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html',
  inject: 'body'
})

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const base = {
  entry: [
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      {test: /\.scss$/,loader: ExtractTextPlugin.extract('css-loader!sass-loader')},
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules:[path.resolve('./app'), path.join(__dirname, 'node_modules')],
  }
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin(),new ExtractTextPlugin('public/style.css', {allChunks: true})]
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HTMLWebpackPluginConfig, productionPlugin]
}

export default Object.assign({}, base, isProduction === true ? productionConfig : developmentConfig)
