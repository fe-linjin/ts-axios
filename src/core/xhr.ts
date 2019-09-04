import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials
    } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    /** 判断是否携带cookie */
    if (withCredentials) {
      request.withCredentials = withCredentials
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        // 处理超时/网络错误等情况
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    request.onerror = function handleError() {
      // 错误情况1： 网络错误
      reject(createError('Network error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      // 错误情况2： 超时错误
      reject(createError(`Timeout of ${timeout} error`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    /** 再发送之前，进行判断是否取消 */
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort() // 取消
        reject(reason) // catch的时候，能捕获本次异步取消的错误
      })
    }

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      // 错误情况3： 状态码错误
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with the code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
