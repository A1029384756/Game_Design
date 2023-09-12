class IdGenerator {
  constructor() {
    /** @type {Number} */
    this.num = 0
    /** @type {String} */
    this.prefix = ''
  }

  create_prefix() {
    this.prefix = Date.now().toString(32)
  }

  /**
   * @returns {String}
  */
  create_id() {
    this.num++
    if (this.num === Number.MAX_SAFE_INTEGER) {
      this.num = 0
      this.create_prefix()
    }

    return this.prefix + this.num
  }
}
