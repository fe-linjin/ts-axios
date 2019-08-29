import axios, { AxiosTransformer } from "../../src"
import qs from 'qs'

axios({
    transformRequest: [
        function (data) {
            return qs.stringify(data)
        },
        ...(axios.defaults.transformRequest as AxiosTransformer[])
    ],
    transformResponse: [
        ...(axios.defaults.transformResponse as AxiosTransformer[]),
        function (data) {
            if (typeof data === 'object') {
                data.b = 233
            }
            return data
        }
    ],
    url: '/transform/post',
    method: 'post',
    data: {
        a: 1,
        c: 2
    }
}).then(res => {
    console.log(res.data)
}).catch(e => {
    console.log(e)
})