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
    /** @type {Vector} */
    this.player_pos = createVector()
    this.setup_game()
  }

  update() {
    switch (this.game_state) {
      case GameState.Play:
        this.update_play()
        break
    }
  }

  update_play() {
    // Win condition
    if (this.game_objects.filter(obj => obj instanceof Coin).length == 0) {
      this.game_state = GameState.Victory
      this.win_game()
    }

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
        case MessageType.Camera:
          this.player_pos = message.entity.pos
        default:
          reportError(TypeError)
      }
    }
  }

  setup_game() {
    this.game_objects = []
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
    this.game_state = GameState.Play
  }

  /** @param {Message} msg */
  add_message(msg) {
    this.message_queue.push(msg)
  }

  win_game() {
    this.game_state = GameState.GameOver
    this.game_objects = [
      new GameText(
        createVector(this.canvas.width / 2, 100),
        'Game Over!',
        'black'
      ),
      new Button(
        createVector(this.canvas.width / 2, 300),
        createVector(200, 100),
        'Restart',
        this.setup_game.bind(this),
        'green'
      )
    ]
  }

  lose_game() {
    this.game_state = GameState.GameOver
    this.game_objects = [
      new GameText(
        createVector(this.canvas.width / 2, 100),
        'Game Over!',
        'black'
      ),
      new Button(
        createVector(this.canvas.width / 2, 300),
        createVector(200, 100),
        'Restart',
        this.setup_game.bind(this)
      )
    ]
  }

  draw() {
    switch(this.game_state) {
      case GameState.Play:
        this.draw_play()
        break
      default:
        this.draw_generic()
        break
    }
  }

  draw_play() {
    background('tan')
    background(this.background_img.get(this.player_pos.x - this.canvas.width / 2 + 10, this.player_pos.y - this.canvas.height / 2 + 10, this.canvas.width, this.canvas.height))
    translate(-this.player_pos.x + this.canvas.width / 2, -this.player_pos.y + this.canvas.height / 2)
    this.game_objects.forEach(obj => {
      obj.draw()
    })
    translate(this.player_pos.x - this.canvas.width / 2 - 10, this.player_pos.y - this.canvas.height / 2 - 10)
  }

  draw_generic() {
    this.game_objects.forEach(obj => {
      obj.draw()
    })
  }

  /** @param {Vector} pos */
  handle_mouse(pos) {
    this.game_objects.forEach(obj => {
      if (obj instanceof Button) {
        if (obj.collides(pos)) {
          obj.action()
        }
      }
    })
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
  static Camera = new MessageType('camera')

  /** @param {String} name */
  constructor(name) {
    this.name = name
  }
}

function mouseClicked() {
  game_controller.handle_mouse(createVector(mouseX, mouseY))
}
