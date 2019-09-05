import { isDate, isPlainObject } from './util'
import { encode } from 'punycode'

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
export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

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
      values = [key]
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

  let serialzedParams = parts.join('&')

  if (serialzedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(markIndex, 1)
    }
    url += url.indexOf('?') === -1 ? '?' : '&'
  }

  return url
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
