class BulletDynamics extends System {
  constructor() {
    super()
    /** @type {Query[]} */
    this.query_set = [
      new Query([
        new Transform(),
        new Bullet(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
  */
  work(r) {
    let bullet_query = r[0]
    bullet_query.forEach((bullet_components, _) => {
      /** @type {Transform} */
      // @ts-ignore
      let transform = bullet_components.find(c => c instanceof Transform)

      transform.pos.add(transform.speed * cos(transform.dir), transform.speed * sin(transform.dir))
    })
  }
}
