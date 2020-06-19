// 导入公共配置
const baseConfig = require('./webpack.base.js')

const merge = require('webpack-merge')

const prodConfig = {
  //模式
  mode: 'production'
}

module.exports = merge(baseConfig, prodConfig)
