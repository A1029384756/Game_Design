class Game {
  /** @type {GameState} */
  state
  /** @type {GameObject[]} */
  objects

  constructor() {
    this.setup_start()
  }

  setup_start() {
    this.state = GameState.Start
    this.objects = [
      new Logo(new Vec2(PANE_WIDTH / 2, 150)),
      new Button(
        new Vec2(PANE_WIDTH / 2, 300),
        new Vec2(200, 75),
        'Start Game',
        this.setup_game.bind(this)
      )
    ]
  }

  /** @callback setup_game */
  setup_game() {
    this.state = GameState.Play
    this.objects = [
      new Player(
        new Vec2(
          PANE_WIDTH / 2,
          350
        )
      )
    ]
  }

  /** @callback setup_lose */
  setup_lose() {
    this.state = GameState.Game_Over
    this.objects = []
  }

  /** @callback setup win */
  setup_win() {
    this.state = GameState.Victory
    this.objects = []
  }
}

function mouseClicked() {
  game.objects.forEach(object => {
    if (object instanceof Button) {
      if (object.collides(new Vec2(mouseX, mouseY))) {
        object.action()
      }
    }
  })
}

/** @type {Game} */
let game


function setup() {
  createCanvas(PANE_HEIGHT, PANE_WIDTH)
  game = new Game()
}

function draw() {
  background(BACKGROUND)

  game.objects.forEach(obj => {
    obj.draw()
    obj.update()
  })

  game.objects = game.objects.filter((obj) => {
    if (obj instanceof Projectile) {
      return obj.lifetime > 0
    } else {
      return true
    }
  })
}
