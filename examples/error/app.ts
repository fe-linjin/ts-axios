import axios, { AxiosError } from '../../src/index'

/** url 不存在 404 */
axios({ 
    method: 'get',
    url: '/error/get1'
}).then(res => {
    console.log(res)
}).catch(e => {
    console.log(e)
})

/** 正常请求，一定几率错误 */
axios({
    method: 'get',
    url: '/error/get'
}).then(res => {
    console.log(res)
}).catch(e => {
    console.log(e)
})

/** 延时错误 */
setTimeout(() => {
    axios({
        method: 'get',
        url: '/error/get'
    }).then(res => {
        console.log(res)
    }).catch(e => {
        console.log(e)
    })
}, 5000)

/** 超时错误 */
axios({
    method: 'get',
    url: '/error/get',
    timeout: 2000
}).then(res => {
    console.log(res)
}).catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.config)
    console.log(e.code)
})