const config = {
  alias: {},
  projectName: 'taro-demo',
  date: '2019-10-15',
  designWidth: 750,
  onePxTransform: false,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  babel: {
    sourceMap: true,
    presets: [
      [require.resolve('babel-preset-env'), {
        modules: false
      }]
    ],
    plugins: [
      require.resolve('babel-plugin-transform-decorators-legacy'),
      require.resolve('babel-plugin-transform-class-properties'),
      require.resolve('babel-plugin-transform-object-rest-spread')
    ]
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      pxtransform: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  const path = require('path');
  const configure = {
    alias: {
      // '@tarojs/taro': path.resolve(__dirname, '../../', '/taro/packages/taro'),
      // '@tarojs/taro-h5': path.resolve(__dirname, '../../', '/taro/packages/taro-h5'),
      // '@tarojs/taro-quickapp': path.resolve(__dirname, '../../', '/taro/packages/taro-quickapp'),
      // '@tarojs/components': path.resolve(__dirname, '../../', '/taro/packages/taro-components'),
      // '@tarojs/components-qa': path.resolve(__dirname, '../../', '/taro/packages/taro-components-qa'),
      '@tarojs/taro-webpack-runner': path.resolve(__dirname, '../../', '/taro/packages/taro-webpack-runner'),
      '@tarojs/taro-mini-runner': path.resolve(__dirname, '../../', '/taro/packages/taro-mini-runner'),
      '@tarojs/transformer-wx': path.resolve(__dirname, '../../', '/taro/packages/taro-transformer-wx'),
      // '@src': path.resolve(__dirname, '../../', 'src'),
      // '@components': path.resolve(__dirname, '../../', 'src/components')
    }
  };
  if (process.env.NODE_ENV === 'development') {
    return merge(configure, config, require('./dev'))
  }
  return merge(configure, config, require('./prod'))
}
