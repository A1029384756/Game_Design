class System {
  constructor() {
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
    this.sprite_transforms = []
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
      /** @type {Transform} */
      let transform = st.transform
      /** @type {Vector} */
      let pos = copy_vector(transform.pos)
      /** @type {Sprite} */
      let sprite = st.sprite

      if (
        pos.x < -game_controller.canvas.width - sprite.img.width ||
        pos.x > game_controller.canvas.width + sprite.img.width ||
        pos.y < -game_controller.canvas.height - sprite.img.height ||
        pos.y > game_controller.canvas.height + sprite.img.height
      ) {
        return
      }

      translate(pos)
      rotate(transform.dir)
      image(sprite.img.get(
        0,
        (sprite.img.height / sprite.frame_count) * sprite.curr_frame,
        sprite.img.width,
        sprite.img.height / sprite.frame_count
      ), -sprite.img.width / 2, -sprite.img.height / (2 * sprite.frame_count))
      rotate(-transform.dir)
      translate(pos.mult(createVector(-1, -1)))
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

      image(button_transform.pos.x - button.img.width / 2, button_transform.pos.y - button.img.height / 2, button.img.width, button.img.height, 15)

      const top_left_bound = mouseX > button_transform.pos.x - button.img.width / 2 && mouseY > button_transform.pos.y - button.img.height / 2
      const bottom_right_bound = mouseX < button_transform.pos.x + button.img.width / 2 && mouseY < button_transform.pos.y + button.img.height / 2

      if (top_left_bound && bottom_right_bound && mouseIsPressed) {
        button.action()
      }
    })

    text_query.forEach((t_c, _) => {
      let text_c = system_get_text(t_c)
      let text_transform = system_get_transform(t_c)
      let pos = copy_vector(text_c.pos)

      fill(text_c.color[0], text_c.color[1], text_c.color[2])
      translate(pos)
      textAlign(CENTER, CENTER)
      textSize(text_c.size)
      text(text_c.text, text_transform.pos.x, text_transform.pos.y)
      translate(pos.mult(-1))
    })
  }
}
