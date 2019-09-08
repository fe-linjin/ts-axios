import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

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
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()

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

    configRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    function configRequest(): void {
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
    }

    function addEvents(): void {
      request.onerror = function handleError() {
        // 错误情况1： 网络错误
        reject(createError('Network error', config, null, request))
      }

      request.ontimeout = function handleTimeout() {
        // 错误情况2： 超时错误
        reject(createError(`Timeout of ${timeout} error`, config, 'ECONNABORTED', request))
      }

      /** 上传 下载 处理 */
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      /** 删除FormData的Content-Type 改默认添加 */
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      /** 处理跨域请求 || 同域请求 携带cookie */
      if (withCredentials || (isSameOrigin(url!) && xsrfCookieName)) {
        const xsrfValue = cookie.read(xsrfCookieName!)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      /** 处理auth */
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      /** 处理content-type */
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      /** 再发送之前，进行判断是否取消 */
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort() // 取消
          reject(reason) // catch的时候，能捕获本次异步取消的错误
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      // 错误情况3： 状态码错误
      if (!validateStatus || validateStatus(response.status)) {
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
