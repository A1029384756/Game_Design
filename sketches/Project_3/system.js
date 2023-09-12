class System {
  constructor() {
    /** @type {Query} */
    this.query = new Query([])
  }

  /**
   * @param {QueryResponse} r
  */
  work(r) {}
}

class Render extends System {
  constructor() {
    super()
    this.query = new Query([
      new Sprite(),
      new Transform()
    ])
  }

  /**
   * @param {QueryResponse} r
   */
  work(r) {
    r.forEach((c_list, _) => {
      /** @type {Sprite} */
      // @ts-ignore
      let sprite = c_list.find(c => c instanceof Sprite)
      /** @type {Transform} */
      // @ts-ignore
      let transform = c_list.find(c => c instanceof Transform)

      image(sprite.img, transform.v.x, transform.v.y)
    })
  }
}

class Gravity extends System {
  constructor() {
    super()
    this.query = new Query([
      new Transform(),
      new Player()
    ])
  }

  /**
   * @param {QueryResponse} r
   */
  work(r) {
    r.forEach((c_list, _) => {
      /** @type {Transform} */
      // @ts-ignore
      let transform = c_list.find(c => c instanceof Transform)
      transform.v.y += 10
    })
  }
}


class Wrapping extends System {
  constructor() {
    super()
    this.query = new Query([
      new Transform(),
      new Player()
    ])
  }

  /**
   * @param {QueryResponse} r
   */
  work(r) {
    r.forEach((c_list, _) => {
      /** @type {Transform} */
      // @ts-ignore
      let transform = c_list.find(c => c instanceof Transform)
      if (transform.v.y > 410) {
        transform.v.y = -10
      }
    })
  }
}
