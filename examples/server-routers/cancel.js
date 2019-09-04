function cancelRouter(router) {
    router.get('/cancel/get', function(req, res) {
        setTimeout(() => {
            res.json('hello')
        }, 1000)
    })

    router.post('/cancel/post', function(req, res) {
        setTimeout(() => {
            res.json(req.body)
        }, 1000)
    })
}

module.exports = cancelRouter