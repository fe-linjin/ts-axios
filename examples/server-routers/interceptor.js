/** interceptor 拦截器 */
function interceptorRouter(router) {
    router.get('/interceptor/get', function(req, res) {
        res.end()
    })
}

module.exports = interceptorRouter