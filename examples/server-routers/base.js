/** 处理base 测试案例 */
function registerBaseRouter(router) {
    router.post('base/post', function (req, res) {
        res.json(req.body)
    })

    router.post('base/buffer', function (req, res) {
        let msg = []
        req.on('data', chunk => {
            if (chunk) {
                msg.push(chunk)
            }
        })
        req.on('end', () => {
            let bug = Buffer.concat(msg)
            res.json(bug.toJSON())
        })
    })
}

module.exports = registerBaseRouter