class Button extends GameObject {
  /** @param {Vec2} pos
    * @param {Vec2} size
    * @param {String} text
    * @param {Function} action
    */
  constructor(pos, size, text, action) {
    super(
      new Vec2(pos.x - size.x / 2, pos.y - size.y / 2))
    /** @type {Vec2} */
    this.size = size
    /** @type {String} */
    this.text = text
    this.action = action
  }

  draw() {
    fill(ACCENT_1)
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y, 15)
    fill(ACCENT_2)
    textSize(30)
    textAlign(CENTER, CENTER)
    text(this.text, this.pos.x, this.pos.y, this.size.x, this.size.y)
  }

  /** @param {Vec2} mouse_pos */
  collides(mouse_pos) {
    let top_left_bound = mouse_pos.x > this.pos.x && mouse_pos.y > this.pos.y
    let bottom_right_bound = mouse_pos.x < this.pos.x + this.size.x && mouse_pos.y < this.pos.y + this.size.y
    return top_left_bound && bottom_right_bound
  }
}
