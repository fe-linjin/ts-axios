/** 处理error 测试案例 */
function registerErrorRouter(router) {
    router.get('/error/get', function (req, res) {
        if (Math.random() > 0.5) {
            res.json({
                msg: 'hello world'
            })
        } else {
            res.status(500)
            res.end()
        }
    })

    router.get('/error/timeout', function (req, res) {
        setTimeout(() => {
            res.json({
                message: 'hello world'
            })
        }, 3000)
    })
}

module.exports = registerErrorRouter