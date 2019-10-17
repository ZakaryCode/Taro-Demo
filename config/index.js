const config = {
  alias: {
    '@tarojs/mini-runner': '/Users/zhutianjian/project/taro/packages/taro-mini-runner',
    '@tarojs/transformer-wx': '/Users/zhutianjian/project/taro/packages/taro-transformer-wx',
    // '@tarojs/components': '/Users/zhutianjian/project/taro/packages/taro-components',
    // '@tarojs/redux-h5': '/Users/zhutianjian/project/taro/packages/taro-redux-h5',
    // '@tarojs/router': '/Users/zhutianjian/project/taro/packages/taro-router',
    // '@tarojs/taro': '/Users/zhutianjian/project/taro/packages/taro',
    // '@tarojs/taro-h5': '/Users/zhutianjian/project/taro/packages/taro-h5',
    // '@tarojs/webpack-runner': '/Users/zhutianjian/project/taro/packages/taro-webpack-runner',
    // '@tarojs/mobx-h5': '/Users/zhutianjian/project/taro/packages/taro-mobx-h5',
    // '@/src': path.resolve(__dirname, '..', 'src'),
    // '@components': path.resolve(__dirname, '..', 'src/components')
    // 'taro-ui': '/Users/zhutianjian/project/taro/taro-ui'
  },
  projectName: 'taro-demo',
  date: '2019-10-15',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread'
    ]
  },
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
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
        config: {

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
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
