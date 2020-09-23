// 导入公共配置
const baseConfig = require('./webpack.base.js')

const merge = require('webpack-merge')

const testConfig = {
  //模式
  mode: 'none'
}

module.exports = merge(baseConfig, testConfig)
