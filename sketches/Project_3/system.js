class System {
  constructor() {
    /** @type {Query} */
    this.query = new Query([])
  }

  /**
   * @param {QueryResult} r
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
   * @param {QueryResult} r
   */
  work(r) {
    r.forEach((c_list, _) => {
      /** @type {Sprite} */
      // @ts-ignore
      let sprite = c_list.find(c => c instanceof Sprite)
      /** @type {Vector} */
      // @ts-ignore
      let transform = c_list.find(c => c instanceof Vector)

      image(sprite.img, transform.x, transform.y)
    })
  }
}
