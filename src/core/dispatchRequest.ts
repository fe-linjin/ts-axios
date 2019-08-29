import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { processHeaders, flattenHeaders } from '../helpers/headers'
import { transformRequest, transformResponse } from '../helpers/data'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
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
  const { url, params } = config
  return buildUrl(url!, params)
}

/** transform response data */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
