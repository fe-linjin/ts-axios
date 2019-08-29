const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

const registerSimpleRouter = require('./server-routers/simple')
const registerBaseRouter = require('./server-routers/base')
const registerErrorRouter = require('./server-routers/error')
const registerExtendRouter = require('./server-routers/extend')
const transformRouter = require('./server-routers/transform')
const interceptorRouter = require('./server-routers/interceptor')
const registerConfigRouter = require('./server-routers/config')

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__',
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

registerSimpleRouter(router)
registerBaseRouter(router)
registerErrorRouter(router)
registerExtendRouter(router)
interceptorRouter(router)
registerConfigRouter(router)
transformRouter(router)

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost: ${port}, Ctrl + C to stop`)
})