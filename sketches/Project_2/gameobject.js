class GameObject {
  /** @param {Vector} pos */
  constructor(pos) {
    this.pos = pos
    this.collider = new Collider(this.pos, 0)
    this.sprite = createImage(0, 0)
  }

  draw() {
    image(this.sprite, this.pos.x - this.sprite.width / 2, this.pos.y - this.sprite.height / 2)
  }

  update() {
    this.collider.pos = this.pos
    game_controller.add_message(
      new Message(
        MessageType.Interact,
        this
      )
    )
  }

  /** @param {GameObject} rhs */
  handle_interaction(rhs) {}
}
