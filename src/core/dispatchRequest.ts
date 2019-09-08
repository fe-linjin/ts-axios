import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildUrl, combineURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'
import { isAbsolute } from 'path'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  transformConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/** transform config 入口 */
function transformConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

/** transform url */
function transformUrl(config: AxiosRequestConfig) {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && isAbsolute(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildUrl(url!, params, paramsSerializer)
}

/** transform response data */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

/** if cancelToken is used throw  */
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequest()
  }
}
