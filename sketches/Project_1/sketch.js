class GameManager {
  /** @type {GameState} */
  state
  /** @type {GameObject[]} */
  objects

  constructor() {
    this.setup_start()
    this.player_sprite = create_player_sprite()
    this.enemy_sprite = create_enemy_sprite()
    this.bullet_sprite = create_bullet_sprite()
    this.bomb_sprite = create_bomb_sprite()
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
          365
        ),
        this.player_sprite
      )
    ]

    Array(5).fill(0).map((_, i) => {
      this.objects.push(
        new Enemy(
          new Vec2(i * 50 + 50, 40),
          this.enemy_sprite
        )
      )
    })
  }

  /** @callback setup_lose */
  setup_lose() {
    this.state = GameState.Game_Over
    this.objects = [
      new GameText(
        new Vec2(PANE_WIDTH / 2, 100),
        'You Lose!',
        ACCENT_1
      ),
      new Button(
        new Vec2(100, 300),
        new Vec2(175, 75),
        'Restart',
        this.setup_game.bind(this)
      ),
      new Button(
        new Vec2(300, 300),
        new Vec2(175, 75),
        'Title Screen',
        this.setup_start.bind(this)
      )
    ]
  }

  /** @callback setup_win */
  setup_win() {
    this.state = GameState.Victory
    this.objects = [
      new GameText(
        new Vec2(PANE_WIDTH / 2, 100),
        'Victory!',
        ACCENT_1
      ),
      new Button(
        new Vec2(100, 300),
        new Vec2(175, 75),
        'Restart',
        this.setup_game.bind(this)
      ),
      new Button(
        new Vec2(300, 300),
        new Vec2(175, 75),
        'Title Screen',
        this.setup_start.bind(this)
      )
    ]
  }

  frame() {
    switch (this.state) {
      case GameState.Start:
        background(BACKGROUND)
        this.objects.forEach(obj => {
          obj.draw()
          obj.update()
        })
        break
      case GameState.Play:
        background(bg)
        this.objects.forEach(obj => {
          obj.draw()
          obj.update()

          if (obj instanceof Player) {
            this.objects.forEach(obj_other => {
              if (obj_other instanceof Bomb || obj_other instanceof Enemy) {
                if (obj.collider.collides(obj_other.collider)) {
                  this.setup_lose()
                }
              }
            })
          } else if (obj instanceof Enemy) {
            this.objects.forEach(obj_other => {
              if (obj_other instanceof Bullet) {
                if (obj.collider.collides(obj_other.collider)) {
                  game.objects = game.objects.filter(o => {
                    return (o !== obj) && (o !== obj_other)
                  })
                }
              } else if (obj_other instanceof Bomb) {
                if (obj.collider.collides(obj_other.collider)) {
                  game.objects = game.objects.filter(o => {
                    return (o !== obj_other)
                  })
                }
              }
            })
          }
        })

        this.objects = this.objects.filter(obj => {
          if (obj instanceof Projectile) {
            return obj.lifetime > 0
          } else {
            return true
          }
        })

        if (this.objects.filter(obj => obj instanceof Enemy).length == 0) {
          this.setup_win()
        }
        break
      default:
        this.objects.forEach(obj => {
          obj.draw()
          obj.update()
        })
        break
    }
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

/** @type {GameManager} */
let game

let bg

function setup() {
  createCanvas(PANE_WIDTH, PANE_HEIGHT)
  game = new GameManager()
  bg = create_background_image()
}

function draw() {
  background(bg)
  game.frame()
}
