// 导入path模块
const path = require('path')

// 引入vue-loader
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 引入html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 引入clean-webpack-plugin(每次打包之前会把dist文件删除)
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
  // 打包入口文件
  entry: './src/main.js',
  // 打包出口文件
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  },
  // 配置打包规则
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,  // 正则表达式
        loader: 'vue-loader'  // 表示使用vue-loader对 .vue 文件进行打包
      },
      // {
      //   test: /\.(jpg|jpeg|png|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]'  // 原文件名.源文件拓展名
      //   }
      // }
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',  // 原文件名.源文件拓展名
          limit: 2048 // 当文件小于2048byte时，使用url-loader打包，生成base64,当大于2048byte时，使用file-loader
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // 顺序有讲究 按照从右到左，从下到上依次执行
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
          // 从下到上依次执行
        ]
      }
    ]
  },

  // 插件
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: { // 别名
      'vue': 'vue/dist/vue.js', // 表示main.js里导入的vue是vue/dist/vue.js, 而不是默认的vue/dist/vue.common.js
      '@': path.resolve(__dirname, '../src'), // @就可以代表src路径了
      'styles': path.resolve(__dirname, '../src/assets/styles'), // styles就代表src/assets/styles路径了
      'images': path.resolve(__dirname, '../src/assets/images')
    }
  }

}
