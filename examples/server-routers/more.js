function moreRouter(router) {
    router.get('/more/get', function(req, res) {
        console.log(res.ServerResponse)
        res.json(req.cookies)
    })
}

module.exports = moreRouter