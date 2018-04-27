const webpack = require('webpack');
const path = require('path');
const ClearPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const inProduction = process.env.NODE_ENV === 'production';

module.exports = {

    entry: {
        app: [
            './src/app.js',
            './src/app.scss',
        ],
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js',
    },

    module: {

        rules: [

            {
                test: /\.js$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/,
            },

            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: { extractCSS: true },
                    },
                    'eslint-loader',
                ],
                exclude: /node_modules/,
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, 'src/styles'),
                            },
                        },
                    },
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },

        ],

    },

    plugins: [
        new ClearPlugin(['build'], {
            dist: __dirname,
            verbose: true,
            dry: false,
        }),
        new MiniCssExtractPlugin('app.css'),
        new webpack.LoaderOptionsPlugin({minimize: inProduction}),
    ],

    resolve: {
        extensions: ['*', '.js'],
    },

};
