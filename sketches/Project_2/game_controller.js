class GameController {
  constructor() {
    /** @type {Renderer} */
    this.canvas = createCanvas(400, 400)
    /** @type {Image} */
    this.background_img = bg_image()
    /** @type {GameObject[]} */
    this.game_objects = []
    /** @type {Message[]} */
    this.message_queue = []
    /** @type {GameState} */
    this.game_state = GameState.Play
    /** @type {Image} */
    this.player_sprite = player_sprite()
    /** @type {Image} */
    this.enemy_sprite = enemy_sprite()
    /** @type {Image} */
    this.coin_sprite = coin_sprite()
    /** @type {Image} */
    this.rock_sprite = rock_sprite()
    this.setup_game()
  }

  update() {
    // Win condition
    if (this.game_objects.filter(obj => obj instanceof Coin).length == 0) {
      this.game_state = GameState.Victory
    }

    switch (this.game_state) {
      case GameState.Play:
        this.update_play()
        break
    }
  }

  update_play() {
    this.game_objects.forEach(obj => {
      obj.update()
    })

    for (let i = 0; i < 300; i++) {
      let message = this.message_queue.shift()
      if (message == undefined) { break }

      switch (message.type) {
        case MessageType.Spawn:
          this.game_objects.push(message.entity)
          break
        case MessageType.Delete:
          this.game_objects = this.game_objects.filter(entity => entity !== message.entity)
          break
        case MessageType.Interact:
          this.game_objects.forEach(obj => {
            obj.handle_interaction(message.entity)
          })
          break
        default:
          reportError(TypeError)
      }
    }
  }

  setup_game() {
    let map = get_level()
    map.forEach((row, y) => {
      row.split('').forEach((tile, x) => {
        switch (tile) {
          case 'p':
            this.game_objects.push(
              new Player(
                this.player_sprite,
                createVector(
                  x * this.player_sprite.width,
                  y * this.player_sprite.height
                )
              )
            )
            break
          case 'c':
            this.game_objects.push(
              new Coin(
                this.coin_sprite,
                createVector(
                  x * this.coin_sprite.width,
                  y * this.coin_sprite.height
                )
              )
            )
            break
          case 'e':
            this.game_objects.push(
              new Enemy(
                this.enemy_sprite,
                createVector(
                  x * this.enemy_sprite.width,
                  y * this.enemy_sprite.height
                )
              )
            )
            break
          case 'r':
            this.game_objects.push(
              new Rock(
                this.rock_sprite,
                createVector(
                  x * this.rock_sprite.width,
                  y * this.rock_sprite.height
                )
              )
            )
            break
        }
      })
    })
  }

  /** @param {Message} msg */
  add_message(msg) {
    this.message_queue.push(msg)
  }

  end_game() {
    this.game_state = GameState.GameOver
  }

  draw() {
    background(this.background_img.get(0, 0, this.canvas.width, this.canvas.width))
    this.game_objects.forEach(obj => {
      obj.draw()
    })

    // Debug info
    noStroke()
    fill('black')
    textSize(30)
    textStyle(BOLD)
    textAlign(CENTER, CENTER)
    text(floor(1/(deltaTime / 1000)), 30, 20)
    if (this.game_state == GameState.GameOver) {
      text('Game Over', 200, 350)
    }
  }

  handle_mouse() {
  }
}

class GameState {
  static Play = new GameState('play')
  static GameOver = new GameState('game_over')
  static Victory = new GameState('victory')

  /** @param {String} name */
  constructor(name) {
    this.name = name
  }
}

class Message {
  /**
   * @param {MessageType} type 
   * @param {GameObject} entity 
   */
  constructor(type, entity) {
    this.type = type
    this.entity = entity
  }
}

class MessageType {
  static Spawn = new MessageType('spawn')
  static Delete = new MessageType('delete')
  static Interact = new MessageType('interact')

  /** @param {String} name */
  constructor(name) {
    this.name = name
  }
}

function mouseClicked() {
}
