const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    
    /** 
     * 我们会在example目录下创建多个子目录
     * 我们会把不同章节的 demo 放在不同的子目录下
     * 每个子目录下会创建一个 app.ts
     * app.ts作为webpack构建的入口文件
     * entries 收集了多目录个入口文件，并且每个入口还引入一个用于热更新文件
     * entries 是一个对象，key为目录名
     * */
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        const fullDir = path.join(__dirname, dir)
        const entry = path.join(fullDir, 'app.ts')
        if (fs.statSync(fullDir).isDirectory && fs.existsSync(entry)) {
            entries[dir] = ['webpack-hot-middleware/client', entry]
        }

        return entries
    }, {}),

    /** 
     * 根据不同的目录名称，生成.js 名称和目录一致 
     * */
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        publicPath: '/__build__/'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin
    ]

}