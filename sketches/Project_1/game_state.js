class GameState {
  static Start = new GameState('start')
  static Play = new GameState('play')
  static Game_Over = new GameState('game_over')
  static Victory = new GameState('victory')

  /** @param {String} name */
  constructor(name) {
    /** @type {String} */
    this.name = name
  }
}

/** @param {GameState} new_state */
function update_state(new_state) {
  switch (new_state) {
    case GameState.Start:
    break
    case GameState.Play:
    break
    case GameState.Game_Over:
    break
    case GameState.Victory:
    break
    default:
    console.error('Invalid game state!!!')
  }
}
