class IdGenerator {
  constructor() {
    /** @type {Number} */
    this.num = 0
  }

  /**
   * @returns {String}
  */
  create_id() {
    this.num++
    if (this.num === Number.MAX_SAFE_INTEGER) {
      this.num = 0
    }

    return Date.now().toString() + this.num
  }
}
