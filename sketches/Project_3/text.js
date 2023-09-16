class GameText extends GameObject {
  /** @param {Vector} pos
   *  @param {String} text
   *  @param {String} color
   *  @param {Number} size
   */
  constructor(pos, text, color, size = 30) {
    super(pos)
    this.text = text
    this.color = color
    this.size = size
  }

  draw() {
    fill(this.color)
    textSize(this.size)
    textAlign(CENTER, CENTER)
    text(this.text, this.pos.x, this.pos.y)
  }
}
