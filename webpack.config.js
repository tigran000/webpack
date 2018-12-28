const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const combineLESS = new ExtractTextPlugin({
    filename: "style.css"
})

module.exports = {
    entry: './source/es6.js',
    output: {
        path: path.join(__dirname, './build'),
        filename: 'bundle.js',
    },
    devServer: {
        hot: true
    },
    module: {
       rules: [
            {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader'
            }
          }, {
            test: /\.less$/,
            use: combineLESS.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        inject: true
      }),
      combineLESS,
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
};
