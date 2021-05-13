const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/js/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    mode: 'development',
    watch: true,
    plugins: [
        new MiniCssExtractPlugin(),
        new TerserWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin( {
            template: "404.pug",
            filename: "404.html"
        }),
        new HtmlWebpackPlugin( {
            template: "Questions.pug",
            filename: "Questions.html"
        }),
        new HtmlWebpackPlugin( {
            template: "About.pug",
            filename: "About.html"
        }),
        new HtmlWebpackPlugin( {
            template: "Main.pug",
            filename: "Main.html"
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [ new TerserWebpackPlugin(), new OptimizeCssAssetsWebpackPlugin() ]
    },
    module: {
        rules: [
            {
                test: /\.(eot|ttf|woff|svg)$/i,
                use: ['file-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/dist',
                            esModule: false
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.pug$/,
				loader: 'pug-loader',
				options: {
                pretty: true
                }
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: 'eslint-loader'
            }
        ]
    },
}