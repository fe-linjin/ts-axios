import axios from '../../src/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

/** HTTP授权例子  */
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
