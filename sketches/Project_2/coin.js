class Coin extends GameObject {
  /**
   * @param {Image} sprite
   * @param {Vector} pos
  */
  constructor(sprite, pos) {
    super(pos)
    /* @type {Image} */
    this.sprite = sprite
    /* @type {Collider} */
    this.collider = new Collider(this.pos, this.sprite.width)
  }

  /** @param {GameObject} rhs */
  handle_interaction(rhs) {
    if (rhs instanceof Player) {
      if (this.collider.collides(rhs.collider)) {
        game_controller.add_message(
          new Message(
            MessageType.Delete,
            this
          )
        )
      }
    } else if (rhs instanceof Enemy) {
      if (this.collider.collides(rhs.collider)) {
        game_controller.add_message(
          new Message(
            MessageType.Delete,
            rhs
          )
        )
      }
    }
  }
}

const coin_sprite = () => {
  let buf = createGraphics(20, 20)
  buf.noStroke()
  buf.fill('rgba(0,0,0,255)')
  buf.rect(7, 0, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(8, 0, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(9, 0, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(10, 0, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(11, 0, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(12, 0, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(5, 1, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(6, 1, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 1, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 1, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 1, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 1, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 1, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 1, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(13, 1, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(14, 1, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(3, 2, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(4, 2, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 2, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 2, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 2, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 2, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 2, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 2, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 2, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 2, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 2, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 2, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(15, 2, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(16, 2, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(2, 3, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(3, 3, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 3, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 3, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 3, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(7, 3, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(8, 3, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(9, 3, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(10, 3, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(11, 3, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(12, 3, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 3, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 3, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 3, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(16, 3, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(17, 3, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(2, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(3, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 4, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(6, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 4, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(13, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 4, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(16, 4, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(17, 4, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(1, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(2, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(3, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 5, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(5, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 5, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(14, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(16, 5, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(17, 5, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(18, 5, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(1, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(2, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(3, 6, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(4, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 6, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(15, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(16, 6, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(17, 6, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(18, 6, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(0, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(1, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(2, 7, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(3, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 7, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(16, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(17, 7, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(18, 7, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(19, 7, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(0, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(1, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(2, 8, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(3, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 8, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(16, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(17, 8, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(18, 8, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(19, 8, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(0, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(1, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(2, 9, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(3, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 9, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(16, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(17, 9, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(18, 9, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(19, 9, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(0, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(1, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(2, 10, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(3, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 10, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(16, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(17, 10, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(18, 10, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(19, 10, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(0, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(1, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(2, 11, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(3, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 11, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(16, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(17, 11, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(18, 11, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(19, 11, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(0, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(1, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(2, 12, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(3, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 12, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(16, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(17, 12, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(18, 12, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(19, 12, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(1, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(2, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(3, 13, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(4, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 13, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(15, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(16, 13, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(17, 13, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(18, 13, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(1, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(2, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(3, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 14, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(5, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 14, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(14, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(16, 14, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(17, 14, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(18, 14, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(2, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(3, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 15, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(6, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 15, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(13, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 15, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(16, 15, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(17, 15, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(2, 16, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(3, 16, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(4, 16, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 16, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 16, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(7, 16, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(8, 16, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(9, 16, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(10, 16, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(11, 16, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(12, 16, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 16, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 16, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(15, 16, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(16, 16, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(17, 16, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(3, 17, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(4, 17, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(5, 17, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(6, 17, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 17, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 17, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 17, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 17, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 17, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 17, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(13, 17, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(14, 17, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(15, 17, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(16, 17, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(5, 18, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(6, 18, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(7, 18, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(8, 18, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(9, 18, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(10, 18, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(11, 18, 1, 1)
  buf.fill('rgba(255,208,0,255)')
  buf.rect(12, 18, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(13, 18, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(14, 18, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(7, 19, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(8, 19, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(9, 19, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(10, 19, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(11, 19, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(12, 19, 1, 1)
  return buf.get(0, 0, buf.width, buf.height)
}
