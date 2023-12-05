const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/index.js',
        recipes: './src/js/recipes.js',
        recipe: './src/js/recipe.js',
        ingredients: './src/js/ingredients.js',
        ingredient: './src/js/ingredient.js',
        loadingbar: './src/js/loadingBar.js',
        home: './src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['main', 'home'],
        }),
        new HtmlWebpackPlugin({
            filename: 'recipes.html',
            template: './src/recipes.html',
            chunks: ['main', 'recipes', 'loadingbar']
        }),
        new HtmlWebpackPlugin({
            filename: 'ingredients.html',
            template: './src/ingredients.html',
            chunks: ['main', 'ingredients']
        }),
        new HtmlWebpackPlugin({
            filename: 'recipe.html',
            template: './src/recipe.html',
            chunks: ['main', 'recipe']
        }),
        new HtmlWebpackPlugin({
            filename: 'ingredient.html',
            template: './src/ingredient.html',
            chunks: ['main', 'ingredient', 'loadingbar']
        }),
        new HtmlWebpackPlugin({
            filename: 'randButton.html',
            template: './src/randButton.html',
            chunks: ['main']
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '0.0.0.0',
        port: 8080
    }
}