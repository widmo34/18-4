const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const plugins = [new HtmlWebpackPlugin({
    template: 'client/index.html',
    filename: 'index.html',
    inject: 'body'
})];

//webpack.config.js
module.exports = (env) => {

    if(env === 'production'){
        plugins.push(
            new OptimizeJsPlugin({
                sourceMap: false
            })
        )
    };


    const environment = env || 'production';
    return{
    mode: environment,
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.' + environment + '.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    plugins: env !== 'production' ? ["react-hot-loader/babel"] : [],
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
            
        ]
    },
    optimization: {
        minimize: false
    },
    plugins: plugins
    ,
    devServer: {
        proxy : {
            '/socket.io' : {
                target: 'http://localhost:3000',
                ws: true
            }
        }
    }
}
};