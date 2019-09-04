function moreRouter(router) {
    router.get('/more/get', function(req, res) {
        res.json(req.cookies)
    })
}

module.exports = moreRouter