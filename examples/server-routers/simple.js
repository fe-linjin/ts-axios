function registerSimpleRouter(router) {
    router.get('/simple/get', function (req, res) {
        res.json({
            msg: `hello world`
        })
    })
}

module.exports = registerSimpleRouter