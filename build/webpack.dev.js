// 导入公共配置
const baseConfig = require('./webpack.base.js')

const merge = require('webpack-merge')

// 引入webpack
const webpack = require('webpack')


const devConfig = {
  //模式
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // 快速定位出错的地方所在的行
  devServer: {
    // 指定服务器根目录
    contentBase: './dist',
    // 自动打开浏览器
    open: true,
    // 启用热模块替换
    hot: true
  },
  // 插件
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(baseConfig, devConfig)
