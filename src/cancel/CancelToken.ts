import { CancelExecutor, CancelTokenSource, Canceler } from '../types'

/** 对于类既可以当做值 也可以当作类型 */
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  /** 当实例化的时候，1.创建一个promise 2.执行executor立即执行函数 */
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    /** 使resolvePromise指向resolve，后续调用resolvedPromise就是执行了resolve，就把promise从pedding变更为resolved*/
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    /** 内部有一个cancel方法，外部一旦调用这个方法，就会把message赋值给reason，然后调用resolvePromise（相当于是把promise从pedding变更为resolved），进而就会执行then中指向的逻辑 */
    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequest() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
