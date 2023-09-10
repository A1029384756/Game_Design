class Button extends GameObject {
  /** @param {Vector} pos
    * @param {Vector} size
    * @param {String} text
    * @param {Function} action
    * @param {String} button_color 
    * @param {String} text_color 
    */
  constructor(pos, size, text, action, button_color = 'red', text_color = 'black') {
    super(
      createVector(pos.x - size.x / 2, pos.y - size.y / 2))
    /** @type {Vector} */
    this.size = size
    /** @type {String} */
    this.text = text
    /** @type {String} */
    this.button_color = button_color
    /** @type {String} */
    this.text_color = text_color
    /** @type {Function} */
    this.action = action
  }

  draw() {
    fill(this.button_color)
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y, 15)
    fill(this.text_color)
    textSize(30)
    textAlign(CENTER, CENTER)
    text(this.text, this.pos.x, this.pos.y, this.size.x, this.size.y)
  }

  /** @param {Vector} mouse_pos */
  collides(mouse_pos) {
    let top_left_bound = mouse_pos.x > this.pos.x && mouse_pos.y > this.pos.y
    let bottom_right_bound = mouse_pos.x < this.pos.x + this.size.x && mouse_pos.y < this.pos.y + this.size.y
    return top_left_bound && bottom_right_bound
  }
}
