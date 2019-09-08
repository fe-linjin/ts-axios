import { isDate, isPlainObject, isURLSearchParams } from './util'

interface ResolveUrl {
  protocol: string
  host: string
}

/**
 * build url 处理请求url参数
 *
 * @export
 * @param {string} url
 * @param {*} [params]
 * @returns {string}
 */
export function buildUrl(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  let serialzedParams

  if (paramsSerializer) {
    serialzedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serialzedParams = params.toString()
  } else {
    Object.keys(params).forEach(key => {
      const val = params[key]
      if (val === null || typeof val === 'undefined') {
        return // 结束本次forEach
      }

      let values = []
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }
      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          // 普通对象，不包含formData类型等
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })
    console.log(parts)
    serialzedParams = parts.join('&')
  }
  console.log(serialzedParams)
  if (serialzedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(markIndex, 1)
    }
    url += url.indexOf('?') === -1 ? '?' : '&'
  }
  return url + serialzedParams
}

export function isSameOrigin(requestUrl: string): boolean {
  const parsedOrigin = resolveUrl(requestUrl)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveUrl(window.location.href)

function resolveUrl(url: string): ResolveUrl {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
