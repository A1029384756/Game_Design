class System {
  constructor() {
    /** @type {Query[]} */
    this.query_set = [new Query([])]
  }

  /**
   * @param {QueryResponse[]} r
  */
  work(r) { }
}

class RenderSprites extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Sprite(),
        new Transform()
      ], [
        new Camera()
      ]
      ),
      new Query([
        new Camera(),
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
    let non_camera_query = r[0]
    let camera_query = r[1]

    /** @type {Vector} */
    let camera_pos = createVector()

    non_camera_query.forEach((c_list, _) => {
      this.sprite_transforms.push({
        sprite: system_get_sprite(c_list),
        transform: system_get_transform(c_list)
      })
    })

    camera_query.forEach((c_list, _) => {
      this.sprite_transforms.push({
        sprite: system_get_sprite(c_list),
        transform: system_get_transform(c_list)
      })

      camera_pos = system_get_transform(c_list).pos
    })

    translate(-camera_pos.x + game_controller.canvas.width / 2, -camera_pos.y + game_controller.canvas.height / 2)
    this.sprite_transforms.sort((a, b) => a.transform.pos.z - b.transform.pos.z).forEach(st => {
      /** @type {Transform} */
      let transform = st.transform
      /** @type {Vector} */
      let pos = copy_vector(transform.pos)
      /** @type {Image} */
      let img = st.sprite.img

      if (
        pos.x < camera_pos.x - game_controller.canvas.width / 2 - img.width ||
        pos.x > camera_pos.x + game_controller.canvas.width / 2 + img.width ||
        pos.y < camera_pos.y - game_controller.canvas.height / 2 - img.height ||
        pos.y > camera_pos.y + game_controller.canvas.height / 2 + img.height
      ) {
        return
      }

      translate(pos)
      rotate(transform.dir)
      image(img, -img.width / 2, -img.height / 2)
      rotate(-transform.dir)
      translate(pos.mult(createVector(-1, -1)))

      if (keyIsDown(69)) {
        console.log(img)
        console.log(pos)
      }
    })
    translate(camera_pos.x - game_controller.canvas.width / 2, camera_pos.y - game_controller.canvas.height / 2)

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

      fill(button.color)
      rect(button_transform.pos.x - button.width / 2, button_transform.pos.y - button.height / 2, button.width, button.height, 15)
      fill('black')
      textAlign(CENTER, CENTER)
      textSize(30)
      text(button.text, button_transform.pos.x, button_transform.pos.y)


      const top_left_bound = mouseX > button_transform.pos.x - button.width / 2 && mouseY > button_transform.pos.y - button.height / 2
      const bottom_right_bound = mouseX < button_transform.pos.x + button.width / 2 && mouseY < button_transform.pos.y + button.height / 2

      if (top_left_bound && bottom_right_bound && mouseIsPressed) {
        button.action()
      }
    })

    text_query.forEach((t_c, _) => {
      let text_c = system_get_text(t_c)
      let text_transform = system_get_transform(t_c)

      fill('black')
      textAlign(CENTER, CENTER)
      textSize(30)
      text(text_c.text, text_transform.pos.x, text_transform.pos.y)
    })
  }
}
