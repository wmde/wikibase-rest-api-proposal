const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootPath = path.resolve(__dirname, '..');
const outputPath = path.resolve(rootPath, 'dist');

module.exports = {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, 'index.js'),
    },
    module: {
        rules: [
            {
                test: /openapi\.json$/,
                use: [
                    { 
                        loader: path.resolve(rootPath, 'loaders', 'openapi-loader.js')
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    // Copy the Swagger OAuth2 redirect file to the project root;
                    // that file handles the OAuth2 redirect after authenticating the end-user.
                    from: 'node_modules/swagger-ui/dist/oauth2-redirect.html',
                    to: outputPath
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: outputPath,
    }
};
