class ScoreBoard extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Score(),
        new GameText()
      ])
    ]
  }

  /** 
   * @param {QueryResponse[]} r
   */
  work(r) {
    let score_query = r[0]
    score_query.forEach((s_c, _) => {
      let text = system_get_text(s_c)
      text.text = `Score: ${game_controller.score}`
    })
  }
}
