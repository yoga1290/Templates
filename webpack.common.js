// see https://webpack.js.org/guides/production/

var path = require('path')
var webpack = require('webpack')

var VaadinIconsPath = path.join(__dirname, 'node_modules', 'vaadin-icons', 'assets', 'fonts')
var BootstrapPath = path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')
var mainPath = path.join(__dirname, 'index.js')

var config = {
  entry: {
    'app': mainPath
  },
  context: __dirname,
  // context: path.join(__dirname, 'vue'),
  output: {
    filename: path.join('[name].js')
  },

// https://webpack.js.org/configuration/plugins/#plugins
  plugins: [
  ],

  resolve: {
    alias: {
      // https://vuejs.org/v2/guide/installation.html
      'vue$': 'vue/dist/vue.esm.js',

      './Vaadin-Icons.eot': path.join(VaadinIconsPath, 'Vaadin-Icons.eot'),
      './Vaadin-Icons.woff': path.join(VaadinIconsPath, 'Vaadin-Icons.woff'),
      './Vaadin-Icons.ttf': path.join(VaadinIconsPath, 'Vaadin-Icons.ttf'),
      './Vaadin-Icons.svg': path.join(VaadinIconsPath, 'Vaadin-Icons.svg'),

      'bootstrap.css': path.join(BootstrapPath, 'bootstrap.min.css'),
      'bootstrap.min.css.map': path.join(BootstrapPath, 'bootstrap.min.css.map'),
      'animate.css' : path.join(__dirname, 'node_modules', 'animate.css', 'animate.min.css'),

      'Template': path.join(__dirname, 'Template.js')
      // 'configuration': path.join()
    }
  },

  module: {
    rules: [
      //https://github.com/babel/babel-loader
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'env']
          }
        }
      },

      // copy fonts to output dir (after resolving their "alias")
      {
          test: /\.(eot|svg|ttf|woff|woff2|map|css)$/,
          use: [{
            loader: 'file-loader',
            options: {
              // outputPath: 'public' + path.sep,
              context: '',
              name: '[name].[ext]'
            }
          }]
      },

      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            presets: ['es2015', 'env']
          }
        }
      }
      // 1 more thing, .babelrc for ES6 support
      // see https://vue-loader.vuejs.org/en/features/es2015.html#configuring-babel-with-babelrc

    ]
  }

};

module.exports = config
