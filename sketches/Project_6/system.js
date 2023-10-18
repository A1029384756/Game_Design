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

    game_controller.game_buffer.image(sprite_manager.get_sprite('background').imgs[0], 0, 0)
    this.sprite_transforms.sort((a, b) => a.transform.pos.z - b.transform.pos.z).forEach(st => {
      this.transform = st.transform
      this.pos = copy_vector(this.transform.pos)
      this.sprite = st.sprite

      if (
        this.pos.x < -game_controller.canvas.width - this.sprite.imgs[this.sprite.curr_frame].width ||
        this.pos.x > game_controller.canvas.width + this.sprite.imgs[this.sprite.curr_frame].width ||
        this.pos.y < -game_controller.canvas.height - this.sprite.imgs[this.sprite.curr_frame].height ||
        this.pos.y > game_controller.canvas.height + this.sprite.imgs[this.sprite.curr_frame].height
      ) {
        return
      }

      game_controller.game_buffer.translate(this.pos)
      game_controller.game_buffer.rotate(this.transform.dir)
      game_controller.game_buffer.tint(this.sprite.tint)
      game_controller.game_buffer.image(this.sprite.imgs[this.sprite.curr_frame], -this.sprite.imgs[this.sprite.curr_frame].width / 2, -this.sprite.imgs[this.sprite.curr_frame].height / 2)
      game_controller.game_buffer.rotate(-this.transform.dir)
      game_controller.game_buffer.translate(this.pos.mult(createVector(-1, -1)))
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
    this.sprite_transforms = []
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let button_query = r[0]
    let text_query = r[1]

    button_query.forEach((b_c, _) => {
      let button = system_get_button(b_c)
      let button_transform = system_get_transform(b_c)

      game_controller.ui_buffer.image(
        button.img,
        button_transform.pos.x - button.img.width / 2,
        button_transform.pos.y - button.img.height / 2, 
      )

      const top_left_bound = mouseX > button_transform.pos.x - button.img.width / 2 && mouseY > button_transform.pos.y - button.img.height / 2
      const bottom_right_bound = mouseX < button_transform.pos.x + button.img.width / 2 && mouseY < button_transform.pos.y + button.img.height / 2

      if (top_left_bound && bottom_right_bound && mouseIsPressed) {
        button.action()
      }
    })

    text_query.forEach((t_c, _) => {
      let text_c = system_get_text(t_c)
      let text_transform = system_get_transform(t_c)
      let pos = copy_vector(text_transform.pos)

      game_controller.ui_buffer.fill(text_c.color[0], text_c.color[1], text_c.color[2])
      game_controller.ui_buffer.translate(pos)
      game_controller.ui_buffer.textAlign(CENTER, CENTER)
      game_controller.ui_buffer.textSize(text_c.size)
      game_controller.ui_buffer.text(
        text_c.text,
        text_transform.pos.x - CANVAS_WIDTH / 2,
        text_transform.pos.y
      )
      game_controller.ui_buffer.translate(pos.mult(-1))
    })
  }
}
