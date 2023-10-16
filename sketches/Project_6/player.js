class Player extends Component {}

const PLAYER_X_VEL = 1

class PlayerControl extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Transform(),
      ])
    ]
  }

  /** 
   * @param {QueryResponse[]} r
   */
  work(r) {
    let player_query = r[0]
    player_query.forEach((e_c, _) => {
    })
  }
}

class PlayerCollision extends System {
  constructor() {
    super()
    this.query_set = [
    ]
  }

  /**
  * @param {QueryResponse[]} r
  */
  work(r) {
  }
}

class PlayerAnimation extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Player(),
        new Transform(),
        new Sprite()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let player_query = r[0]

    player_query.forEach((p_c, _) => {
    })
  }
}
