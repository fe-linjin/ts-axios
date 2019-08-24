import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function cerateInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context) // 首先 instance是一个方法 ， 可以Axios({...})

  extend(instance, context) // 其次，把context上的所有方法拷贝到instance上面，可以Axios.get(url, ....)

  return instance as AxiosInstance
}

const axios = cerateInstance()

export default axios
