const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
module.exports={
    entry: ["regenerator-runtime/runtime.js",'./src/client/index.jsx'],
    output:{
        filename: "bundle.js",
        path: path.resolve(__dirname,'./public/'),
        libraryTarget: "var",
        library: "catt"
    },
    devServer: {
        static: './public'

    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
              }
        ]
    },
    resolve:{
        extensions: ['.js','.jsx','.scss','.css']
    },
    
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
            extractComments: false
        })]
    }
}