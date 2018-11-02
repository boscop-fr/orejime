var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var PUBLIC_DIR = path.resolve(BUILD_DIR, 'public');
var SRC_DIR = path.resolve(__dirname,'src');
var APP_ENV = process.env.APP_ENV || 'dev';
var APP_CSS = process.env.APP_CSS || false;
var APP_DEV_MODE = APP_ENV === 'dev' && process.env.APP_DEV_MODE;


var config = {
  target: 'web',
  context: SRC_DIR,
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx'],
    modules: [
      SRC_DIR,
      "node_modules"
    ],
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  module: {
    loaders: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.scss|sass$/,
        loaders: ['style-loader', withEnvSourcemap('css-loader'), withEnvSourcemap('sass-loader')]
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', withEnvSourcemap('css-loader')]
      },
      {
        test: /\.yaml|yml$/,
        loaders: ['json-loader', 'yaml-loader'],
      },
      {
        test: /\.jsx?/,
        include: [path.resolve('node_modules'), SRC_DIR],
        loader: 'babel-loader',
        query: {
          presets: [["env", { "modules": false }], 'react', 'stage-2'],
        }
      }
    ]
  },
  entry: [
    SRC_DIR + '/klaro.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'klaro-no-css.js',
    library: 'klaro',
    libraryTarget: 'umd',
    publicPath: ''
  },
  plugins: []
};

if (APP_ENV === 'dev') {
  config.devtool = 'inline-source-maps';
  config.plugins.push(
    new webpack.DefinePlugin({
      VERSION : JSON.stringify('development'),
    })
  );
}

if (APP_DEV_MODE === 'server') {
  config.entry = ['webpack/hot/only-dev-server'].concat(config.entry);
  config.devServer = {
    hot: true,
    // enable HMR on the server

    host: '0.0.0.0',

    contentBase: ['dist'],
    // match the output path

    publicPath: '',
    // match the output `publicPath`
    historyApiFallback: true,
    //always render index.html if the document does not exist (we need this for correct routing)

    proxy: {
      '/api': {
        target: 'http://localhost:5000/',
        secure: false
      }
    }
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}

if (APP_ENV === 'production') {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      VERSION : JSON.stringify(process.env.CI_APP_VERSION || process.env.APP_VERSION || process.env.APP_COMMIT || 'unknown'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      minimize: true,
      sourceMaps: false,
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}

if (APP_CSS) {
  config.entry = [SRC_DIR + '/scss/klaro.scss'].concat(config.entry);
  config.output.filename = 'klaro.js';
}

module.exports = config;

function withEnvSourcemap(loader) {
  return APP_ENV === 'dev' ? loader + '?sourceMap' : loader;
}
