import axios from '../../src/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { AxiosError } from '../../src/helpers/error';
import qs from 'qs'

/** baseURL */
/** 
const instance = axios.create({
    baseURL: 'http://www.baidu.com'
})

instance.get('/more/get')
*/

/** 自定义参数序列化 */
/** 
axios.get('/more/get', {
    params: new URLSearchParams('a=b&b=c')
}).then(res => {
    console.log(res)
})

axios.get('/more/get', {
    params: {
        a: 1,
        b: 2,
        c: ['a', 'b', 'c']
    }
}).then(res => {
    console.log(res)
})

const instance = axios.create({
    paramsSerializer(params) {
        return qs.stringify(params, {
            arrayFormat: 'brackets'
        })
    }
})

instance.get('/more/get', {
    params: {
        a: 1,
        b: 2, 
        c: ['a', 'b', 'c']
    }
}).then(res => {
    console.log(res)
})
*/

/** 自定义合法状态码 */
/** 
axios.get('/more/304', {
    validateStatus(status) {
        return status >= 200 && status < 400
    }
}).then(res => {
    console.log(res)
}).catch((e: AxiosError) => {
    console.log(e.message)
})
*/

/** HTTP授权例子  */
/**
axios.post('/more/post', {
    a: 1
}, {
    auth: {
        username: 'Lin',
        password: '123456'
    }
}).then(res => {
    console.log(res)
})
*/


/** 上传下载监控例子 */
/** 
const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
    return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
    const setupStartProgress = () => {
        instance.interceptors.request.use(config => {
            NProgress.start()
            return config
        })
    }

    const setupUpdateProgress = () => {
        const update = (e: ProgressEvent) => {
            console.log(e)
            NProgress.set(calculatePercentage(e.loaded, e.total))
        }
        instance.defaults.onDownloadProgress = update
        instance.defaults.onUploadProgress = update
    }

    const setupEndProgress = () => {
        instance.interceptors.response.use(response => {
            NProgress.done()
            return response
        }, error => {
            NProgress.done()
            return Promise.reject(error)
        })
    }

    setupStartProgress()
    setupUpdateProgress()
    setupEndProgress()
}

loadProgressBar()

const downloadEle = document.getElementById('download')

downloadEle.addEventListener('click', e => {
    instance.get('/more/img', {
        withCredentials: true
    })
})

const uploadEle = document.getElementById('upload')

uploadEle.addEventListener('click', e => {
    const data = new FormData()
    const fileEle = document.getElementById('file') as HTMLInputElement
    if (fileEle.files) {
        data.append('file', fileEle.files[0])

        instance.post('/more/upload', data)
    }   
})
*/

/** cookie 例子 */
/**
document.cookie = 'a=1'

axios.get('/more/get').then(res => {
    console.log(res)
})

axios.post('http://127.0.0.1:8088/more/server2', {}, {
    withCredentials: true
}).then(res => {
    console.log(res)
})
*/

/** token 防xsrf攻击例子 */
/**
const instance = axios.create({
    xsrfCookieName: 'XSRF-TOKEN-D',
    xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => {
    console.log(res)
})
*/
