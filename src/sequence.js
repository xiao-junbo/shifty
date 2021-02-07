export default class Sequence {
  #tweenable = null
  #steps = []

  get tweenable() {
    return this.#tweenable
  }

  get steps() {
    return this.#steps
  }

  constructor(tweenable) {
    this.#tweenable = tweenable
    ;['push'].forEach(methodName => {
      this[methodName] = (...args) => {
        Array.prototype[methodName].apply(this.#steps, args)
      }
    })
  }

  add(...steps) {
    this.push(...steps)
  }
}
