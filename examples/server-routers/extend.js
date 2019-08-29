/** extend 路由 */
function registerExtendRouter(router) {
    router.get('/extend/get', function (req, res) {
        res.json({
            msg: 'hello world'
        })
    })

    router.options('/extend/options', function (req, res) {
        res.end()
    })

    router.delete('/extend/delete', function (req, res) {
        res.end()
    })

    router.head('/extend/head', function (req, res) {
        res.end()
    })

    router.post('/extend/post', function (req, res) {
        res.json(req.body)
    })

    router.put('/extend/put', function (req, res) {
        res.json(req.body)
    })

    router.patch('/extend/patch', function (req, res) {
        res.json(req.body)
    })

    router.get('/extend/user', function(req, res) {
        res.json({
            code: 0,
            message: 'ok',
            result: {
                name: 'jack',
                age: 18
            }
        })
    })
}

module.exports = registerExtendRouter