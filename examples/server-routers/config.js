/** config router */
function registerConfigRouter(router) {
    router.post('/config/post', function(req, res) {
        res.json(req.body)
    })
}

module.exports = registerConfigRouter