class System {
  constructor() {
    /** @type {String} */
    this.name = this.constructor.name
    /** @type {Query[]} */
    this.query_set = [new Query([])]
  }

  /**
   * @param {QueryResponse[]} _
  */
  work(_) { }
}

class RenderSprites extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Sprite(),
        new Transform()
      ])
    ]

    // System local variables
    // to prevent allocations
    // on subsequent function
    // calls
    this.sprite_transforms = []
    /** @type {Transform} */
    this.transform
    /** @type {Vector} */
    this.pos
    /** @type {Sprite} */
    this.sprite
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let sprite_query = r[0]

    sprite_query.forEach((c_list, _) => {
      this.sprite_transforms.push({
        sprite: system_get_sprite(c_list),
        transform: system_get_transform(c_list)
      })
    })

    this.sprite_transforms.sort((a, b) => a.transform.pos.z - b.transform.pos.z).forEach(st => {
      this.transform = st.transform
      this.pos = clone_object(this.transform.pos)
      this.sprite = st.sprite
      this.pos.sub(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)

      if (
        this.pos.x < -game_controller.canvas.width - this.sprite.imgs[this.sprite.curr_frame].width ||
        this.pos.x > game_controller.canvas.width + this.sprite.imgs[this.sprite.curr_frame].width ||
        this.pos.y < -game_controller.canvas.height - this.sprite.imgs[this.sprite.curr_frame].height ||
        this.pos.y > game_controller.canvas.height + this.sprite.imgs[this.sprite.curr_frame].height
      ) {
        return
      }

      game_controller.game_buffer.translate(createVector(this.pos.x, this.pos.y))
      game_controller.game_buffer.rotate(this.transform.dir)
      game_controller.game_buffer.tint(this.sprite.tint)
      game_controller.game_buffer.image(this.sprite.imgs[this.sprite.curr_frame], -this.sprite.imgs[this.sprite.curr_frame].width / 2, -this.sprite.imgs[this.sprite.curr_frame].height / 2)
      game_controller.game_buffer.rotate(-this.transform.dir)
      game_controller.game_buffer.translate(createVector(this.pos.x, this.pos.y).mult(createVector(-1, -1)))
    })

    this.sprite_transforms.length = 0
  }
}

class RenderUI extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Button(),
        new Transform()
      ]),
      new Query([
        new GameText(),
        new Transform()
      ])
    ]
    /** @type {Button} */
    this.button
    /** @type {Transform} */
    this.button_transform
    /** @type {GameText} */
    this.text_c
    /** @type {Transform} */
    this.text_transform
    /** @type {Vector} */
    this.text_pos
    /** @type {Boolean} */
    this.top_left_bound
    /** @type {Boolean} */
    this.bottom_right_bound
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let button_query = r[0]
    let text_query = r[1]

    button_query.forEach((b_c, _) => {
      this.button = system_get_button(b_c)
      this.button_transform = system_get_transform(b_c)

      game_controller.ui_buffer.image(
        this.button.img,
        this.button_transform.pos.x - this.button.img.width / 2,
        this.button_transform.pos.y - this.button.img.height / 2,
      )

      this.top_left_bound = mouseX > this.button_transform.pos.x - this.button.img.width / 2 && mouseY > this.button_transform.pos.y - this.button.img.height / 2
      this.bottom_right_bound = mouseX < this.button_transform.pos.x + this.button.img.width / 2 && mouseY < this.button_transform.pos.y + this.button.img.height / 2

      if (this.top_left_bound && this.bottom_right_bound && mouseIsPressed) {
        this.button.action()
      }
    })

    text_query.forEach((t_c, _) => {
      this.text_c = system_get_text(t_c)
      this.text_transform = system_get_transform(t_c)
      this.pos = clone_object(this.text_transform.pos)

      game_controller.ui_buffer.fill(this.text_c.color[0], this.text_c.color[1], this.text_c.color[2])
      game_controller.ui_buffer.translate(createVector(this.pos.x, this.pos.y))
      game_controller.ui_buffer.textAlign(CENTER, CENTER)
      game_controller.ui_buffer.textSize(this.text_c.size)
      game_controller.ui_buffer.text(
        this.text_c.text,
        this.text_transform.pos.x - CANVAS_WIDTH / 2,
        this.text_transform.pos.y
      )
      game_controller.ui_buffer.translate(createVector(this.pos.x, this.pos.y).mult(createVector(-1, -1)))
    })
  }
}
