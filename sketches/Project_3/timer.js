class Timer {
  /** 
   * @param {Number} time_ms
   * @param {Function} complete_action
   */
  constructor(time_ms, complete_action = null) {
    this.time_ms = time_ms
    this.time_remaining = time_ms
    this.complete = false
    this.complete_action = complete_action
  }

  update() {
    this.time_remaining -= deltaTime

    if (this.time_remaining <= 0) {
      this.complete = true

      if (this.complete_action != null) {
        this.complete_action()
      }
    }
  }

  reset() {
    this.time_remaining = this.time_ms
    this.complete = false
  }
}
