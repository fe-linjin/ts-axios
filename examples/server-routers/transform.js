/** transform  */
function transformRouter(router) {
    router.post('/transform/post', function(req, res) {
        res.json(req.body)
    })
}

module.exports = transformRouter