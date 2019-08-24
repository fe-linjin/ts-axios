# typescript 重构axios

## 解析参数

- 参数为数组
```
axios({
    method: 'get',
    url: '/api/getiInfo',
    params: {
        foo: ['bar', 'baz']
    }
})

// 解析url为 api/getInfo?foo[]=bar&foo[]=baz
```

- 参数为对象
```
axios({
    method: 'get',
    url: '/api/getiInfo',
    params: {
        foo: {
            bar: 'baz'
        }
    }
})

// 解析url为 /api/getInfo?foo=%7b%22bar:%22baz%2z%7d
```

- 参数为Date对象
```
axios({
    method: 'get',
    url: '/api/getiInfo',
    params: {
        date
    }
})

// 解析url为 /api/getInfo?date=2019-04-01T05:55:39.030Z
```

- 特殊字符的支持
```
axios({
    method: 'get',
    url: '/api/getiInfo',
    params: {
        foo: '@:$'
    }
})

// 解析url为 /api/getInfo?foo=@:$+，注意我们会把空格转换成+
```


- 空值忽略
```
axios({
    method: 'get',
    url: '/api/getiInfo',
    params: {
        foo: 'bar',
        baz: null
    }
})

// 解析url为 /api/getInfo?foo=bar
```

- 丢弃url中的哈希标记
```
axios({
    method: 'get',
    url: '/api/getInfo#hash',
    params: {
        foo: 'bar'
    }
})

// 解析url为 /api/getInfo?foo=bar
```

- 保留url中已存在的参数
```
axios({
    method: 'get',
    url: '/api/getiInfo?foo=bar',
    params: {
        bar: 'baz'
    }
})

// 解析url为 /api/getInfo?foo=bar&bar=baz
```

## 处理error
- 网络异常错误

- 超时错误

- 状态码错误

## 开放的api

- axios<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
```
/** a simple example */
axios({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hi'
    }
})
```

- axios.request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
```
/** a simple example */
axios.request({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hello'
    }
})
```

- axios.get<T = any>(urL: string, config?: AxiosRequestConfig): AxiosPromise<T>
```
/** a simple example */
axios.get('/extend/get')
```

- axios.delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
```
/** a simple example */
axios.delete('/extend/delete')
```

- axios.head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
```
/** a simple example */
axios.head('/extend/head')
```

- axios.options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
```
/** a simple example */
axios.options('/extend/options')
```

- axios.post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
```
/** a simple example */
axios.post('/extend/post', { 
    msg: 'hello' 
})
```

- axios.put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
```
/** a simple example */
axios.put('/extend/put', { 
    msg: 'hello' 
})
```

- axios.patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
```
/** a simple example */
axios.patch('/extend/patch', { 
    msg: 'hello' 
})
```

在实际使用中，你也可以使用泛型，增强响应类型
```
interface ResponseData<T = any> {
    code: number
    result: T
    message: string
}

interface User {
    name: string
    age: number
}

function getUser<T>() {
    return axios<ResponseData<T>>('/extend/user')
        .then(res => res.data)
        .catch(err => console.error(err))
} 

async function test() {
    const user = await getUser<User>()
    if (user) {
        console.log(user.result.name)
    }
}

test()
```