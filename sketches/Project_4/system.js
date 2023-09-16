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

class Render extends System {
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
        sprite: c_list.find(c => c instanceof Sprite),
        transform: c_list.find(c => c instanceof Transform)
      })
    })

    camera_query.forEach((c_list, _) => {
      this.sprite_transforms.push({
        sprite: c_list.find(c => c instanceof Sprite),
        transform: c_list.find(c => c instanceof Transform)
      })

      // @ts-ignore
      camera_pos = c_list.find(c => c instanceof Transform).pos
    })

    translate(-camera_pos.x + game_controller.canvas.width / 2, -camera_pos.y + game_controller.canvas.height / 2)
    this.sprite_transforms.sort((a, b) => a.transform.pos.z - b.transform.pos.z).forEach(st => {
      /** @type {Transform} */
      let transform = st.transform
      /** @type {Vector} */
      let pos = copy_vector(transform.pos)
      /** @type {Image} */
      let img = st.sprite.img

      translate(pos)
      rotate(transform.dir)
      image(img, -img.width / 2, -img.height / 2)
      rotate(-transform.dir)
      translate(pos.mult(createVector(-1, -1)))
    })
    translate(camera_pos.x - game_controller.canvas.width / 2, camera_pos.y - game_controller.canvas.height / 2)

    this.sprite_transforms.length = 0
  }
}
