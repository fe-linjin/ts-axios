import axios from '../../src/index'
import { ConsoleLogger } from 'typedoc/dist/lib/utils';

document.cookie = 'a=1'

axios.get('/more/get').then(res => {
    console.log(res)
})

axios.post('http://127.0.0.1:8088/more/server2', {}, {
    withCredentials: true
}).then(res => {
    console.log(res)
})