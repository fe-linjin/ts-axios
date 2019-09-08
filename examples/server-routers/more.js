const path = require('path')
const fs = require('fs')
const multiparty = require('multiparty')
const atob = require('atob')

function moreRouter(router) {
    router.get('/more/get', function(req, res) {
        console.log(res.ServerResponse)
        res.json(req.cookies)
    })

    router.post('/more/upload', function(req, res) {
        const form = new multiparty.Form()
        form.encoding = 'utf-8' // 设置编码
        form.uploadDir = path.resolve(__dirname, '../upload-file') // 设置存储路径
        form.maxFilesSize = 2 * 1024 * 1024 // 设置文件大小限制
        form.parse(req, function(err, fields, files) {
            let filesTemp = JSON.stringify(files, null, 2)
            if (err) {
                console.log('parse error:' + err)
            } else {
                console.log('parse files:' + filesTemp)
                let inputFile = files.file[0]
                let oldPath = inputFile.path
                let newPath = path.resolve(__dirname, `../upload-file/${inputFile.originalFilename}`)
                fs.rename(oldPath, newPath, function(err) {
                    if (err) {
                        console.log('rename error:' + err)
                    } else {
                        console.log('rename success!')
                        res.end('upload success')
                    }
                })
            }
        }) 
    })

    router.get('/more/img', function(req, res) {
        let fileName = path.resolve(__dirname, '../upload-file/Group 9.png')
        fs.readFile(fileName, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log('success')
                res.end('success!')
            }
        })
    })

    router.post('/more/post', function(req, res) {
        const auth = req.headers.authorization
        const [type, credentials] = auth.split(' ')
        console.log()
        const [username, password] = atob(credentials).split(':')
        if (type === 'Basic' && username === 'Lin' && password === '123456') {
            res.json(req.body)
        } else {
            res.status(401)
            res.end('UnAuthorization')
        }
    })

    router.get('/more/304', function(req, res) {
        res.status(304)
        res.end()
    })
}

module.exports = moreRouter