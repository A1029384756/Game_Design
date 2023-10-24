class Camera extends Component { }

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
      ]),
      new Query([
        new Camera(),
        new Transform()
      ]),
    ]

    // System local variables
    // to prevent allocations
    // on subsequent function
    // calls
    this.sprite_transforms = []
    /** @type {Transform} */
    this.filter_transform
    /** @type {Sprite} */
    this.filter_sprite
    /** @type {Sprite} */
    this.sprite
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let sprite_query = r[0]
    let cameras = r[1]

    let camera_pos = /** @type {Vector} */ (createVector())
    cameras.forEach((c_c, _) => {
      let cam_transform = system_get_transform(c_c)
      camera_pos = cam_transform.pos
    })

    sprite_query.forEach((c_list, _) => {
      this.filter_sprite = system_get_sprite(c_list)
      this.filter_transform = clone_object(system_get_transform(c_list))

      if (
        this.filter_transform.pos.x < camera_pos.x - CANVAS_WIDTH / 2 - this.filter_sprite.imgs[this.filter_sprite.curr_frame].width / 2 ||
        this.filter_transform.pos.x > camera_pos.x + CANVAS_WIDTH / 2 + this.filter_sprite.imgs[this.filter_sprite.curr_frame].width / 2 ||
        this.filter_transform.pos.y < camera_pos.y - CANVAS_HEIGHT / 2 - this.filter_sprite.imgs[this.filter_sprite.curr_frame].height / 2 ||
        this.filter_transform.pos.y > camera_pos.y + CANVAS_HEIGHT / 2 + this.filter_sprite.imgs[this.filter_sprite.curr_frame].height / 2
      ) {
        return
      }

      this.sprite_transforms.push({
        sprite: system_get_sprite(c_list),
        transform: system_get_transform(c_list)
      })
    })

    game_controller.game_buffer.push()
    game_controller.game_buffer.translate(-camera_pos.x + CANVAS_WIDTH / 2, -camera_pos.y + CANVAS_HEIGHT / 2)
    this.sprite_transforms.sort((a, b) => a.transform.pos.z - b.transform.pos.z).forEach(st => {
      this.sprite = st.sprite

      game_controller.game_buffer.push()
      game_controller.game_buffer.translate(createVector(st.transform.pos.x, st.transform.pos.y))
      if (!this.sprite.facing_right) {
        game_controller.game_buffer.scale(-1, 1)
      }
      game_controller.game_buffer.rotate(st.transform.dir)
      game_controller.game_buffer.image(
        this.sprite.imgs[this.sprite.curr_frame],
        -this.sprite.imgs[this.sprite.curr_frame].width / 2,
        -this.sprite.imgs[this.sprite.curr_frame].height / 2
      )
      game_controller.game_buffer.pop()
    })
    game_controller.game_buffer.pop()

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
        new UIText(),
        new Transform()
      ]),
      new Query([
        new UIImage(),
        new Transform(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let button_query = r[0]
    let text_query = r[1]
    let image_query = r[2]

    image_query.forEach((i_c, _) => {
      let img = system_get_image(i_c)
      let transform = system_get_transform(i_c)

      game_controller.ui_buffer.push()
      game_controller.ui_buffer.translate(createVector(transform.pos.x, transform.pos.y))
      game_controller.ui_buffer.image(
        img.imgs[img.curr_frame],
        -img.imgs[img.curr_frame].width / 2,
        -img.imgs[img.curr_frame].height / 2,
      )
      game_controller.ui_buffer.pop()
    })

    text_query.forEach((t_c, _) => {
      let text_c = system_get_text(t_c)
      let text_transform = system_get_transform(t_c)

      game_controller.ui_buffer.push()
      game_controller.ui_buffer.fill(text_c.color[0], text_c.color[1], text_c.color[2])
      game_controller.ui_buffer.translate(createVector(text_transform.pos.x, text_transform.pos.y))
      game_controller.ui_buffer.textAlign(CENTER, CENTER)
      game_controller.ui_buffer.textSize(text_c.size)
      game_controller.ui_buffer.text(text_c.text, 0, 0)
      game_controller.ui_buffer.pop()
    })

    button_query.forEach((b_c, _) => {
      let button = system_get_button(b_c)
      let button_transform = system_get_transform(b_c)

      game_controller.ui_buffer.push()
      game_controller.ui_buffer.translate(createVector(button_transform.pos.x, button_transform.pos.y))
      game_controller.ui_buffer.image(
        button.imgs[button.curr_frame],
        -button.imgs[button.curr_frame].width / 2,
        -button.imgs[button.curr_frame].height / 2,
      )
      game_controller.ui_buffer.pop()

      if (button_hovered(button, button_transform) && mouseIsPressed) {
        button.action()
      }
    })
  }
}
