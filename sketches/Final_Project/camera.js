class Background extends Component { }

class FollowPlayer extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Camera(),
        new Transform(),
      ]),
      new Query([
        new Background(),
        new Transform(),
      ]),
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
    let cameras = r[0]
    let backgrounds = r[1]
    let players = r[2]

    cameras.forEach((c_c, _) => {
      let camera_transform = system_get_transform(c_c)
      players.forEach((p_c, _) => {
        let player_transform = system_get_transform(p_c)
        camera_transform.pos.x = player_transform.pos.x
        camera_transform.pos.y = player_transform.pos.y
      })
    })
    backgrounds.forEach((b_c, _) => {
      let bg_transform = system_get_transform(b_c)
      players.forEach((p_c, _) => {
        let player_transform = system_get_transform(p_c)
        bg_transform.pos.x = player_transform.pos.x
        bg_transform.pos.y = player_transform.pos.y
      })
    })
  }
}
