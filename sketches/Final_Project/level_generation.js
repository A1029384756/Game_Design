class GeneratingLevel extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new LoadingBar(),
      ])
    ]
    this.levels_generated = 0
    this.levels = /** @type {Level[]} */ ([])
    this.generated_levels = /** @type {Map<String, [Vector, Level]>} */ (new Map())
    this.fringe = /** @type {Vector[]} */ ([])
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let loading_bars = r[0]

    /** @param {Vector} pos */
    const hash_vec = (pos) => `${round(pos.x)},${round(pos.y)}`
    const random_bool = () => random() > 0.5

    if (this.levels_generated == 0) {
      game_controller.game_world = new World()
      this.generated_levels.clear()
      this.fringe.length = 0

      this.levels = loaded_levels.map(lvl => clone_object(lvl))
      this.generated_levels.set(hash_vec(createVector(0, 0)), [createVector(0, 0), this.levels[0]])
      this.fringe.push(createVector(-LEVEL_SIZE, 0))
      this.fringe.push(createVector(LEVEL_SIZE, 0))
      this.fringe.push(createVector(0, -LEVEL_SIZE))
    }

    loading_bars.forEach(c => {
      let bar = system_get_loading_bar(c)
      /** @param {Vector} pos */
      const generate_level = (pos) => {
        if (this.generated_levels.has(hash_vec(pos))) {
          return
        }

        let left_open = this.generated_levels.has(hash_vec(createVector(pos.x - LEVEL_SIZE, pos.y))) ? this.generated_levels.get(hash_vec(createVector(pos.x - LEVEL_SIZE, pos.y)))[1].right : random_bool()
        let right_open = this.generated_levels.has(hash_vec(createVector(pos.x + LEVEL_SIZE, pos.y))) ? this.generated_levels.get(hash_vec(createVector(pos.x + LEVEL_SIZE, pos.y)))[1].left : random_bool()
        let up_open = this.generated_levels.has(hash_vec(createVector(pos.x, pos.y - LEVEL_SIZE))) ? this.generated_levels.get(hash_vec(createVector(pos.x, pos.y - LEVEL_SIZE)))[1].bottom : random_bool()
        let down_open = this.generated_levels.has(hash_vec(createVector(pos.x, pos.y + LEVEL_SIZE))) ? this.generated_levels.get(hash_vec(createVector(pos.x, pos.y + LEVEL_SIZE)))[1].top : random_bool()

        let new_level = this.levels.find(lvl => {
          return (
            lvl.left == left_open &&
            lvl.right == right_open &&
            lvl.top == up_open &&
            lvl.bottom == down_open
          )
        })

        this.generated_levels.set(hash_vec(pos), [pos, new_level])
        if (new_level.left) {
          this.fringe.push(createVector(pos.x - LEVEL_SIZE, pos.y))
        }
        if (new_level.right) {
          this.fringe.push(createVector(pos.x + LEVEL_SIZE, pos.y))
        }
        if (new_level.top) {
          this.fringe.push(createVector(pos.x, pos.y - LEVEL_SIZE))
        }
        if (new_level.bottom) {
          this.fringe.push(createVector(pos.x, pos.y + LEVEL_SIZE))
        }

        shuffle_array(this.levels)
      }

      if (this.fringe.length > 0 && this.levels_generated < 479) {
        for (let i = 0; i < 20; i++) {
          if (this.fringe.length == 0) {
            break
          }
          generate_level(this.fringe.shift())
          this.levels_generated += 1
        }
      } else {
        // Deduplicate fringe
        this.fringe = this.fringe.filter((pos, idx) =>
          this.fringe.indexOf(pos) === idx
        )

        this.fringe.forEach(pos => {
          let left_open = this.generated_levels.has(hash_vec(createVector(pos.x - LEVEL_SIZE, pos.y))) ? this.generated_levels.get(hash_vec(createVector(pos.x - LEVEL_SIZE, pos.y)))[1].right : false
          let right_open = this.generated_levels.has(hash_vec(createVector(pos.x + LEVEL_SIZE, pos.y))) ? this.generated_levels.get(hash_vec(createVector(pos.x + LEVEL_SIZE, pos.y)))[1].left : false
          let up_open = this.generated_levels.has(hash_vec(createVector(pos.x, pos.y - LEVEL_SIZE))) ? this.generated_levels.get(hash_vec(createVector(pos.x, pos.y - LEVEL_SIZE)))[1].bottom : false
          let down_open = this.generated_levels.has(hash_vec(createVector(pos.x, pos.y + LEVEL_SIZE))) ? this.generated_levels.get(hash_vec(createVector(pos.x, pos.y + LEVEL_SIZE)))[1].top : false
          let new_level = this.levels.find(lvl => {
            return (
              lvl.left == left_open &&
              lvl.right == right_open &&
              lvl.top == up_open &&
              lvl.bottom == down_open
            )
          })
          this.generated_levels.set(hash_vec(pos), [pos, new_level])
        })

        let min_x = Infinity
        let max_x = -Infinity
        let min_y = Infinity
        let max_y = -Infinity

        this.generated_levels.forEach(pos => {
          min_x = pos[0].x < min_x ? pos[0].x : min_x
          max_x = pos[0].x > max_x ? pos[0].x : max_x
          min_y = pos[0].y < min_y ? pos[0].y : min_y
          max_y = pos[0].y > max_y ? pos[0].y : max_y
        })

        for (let y = min_y - LEVEL_SIZE; y < max_y + LEVEL_SIZE; y += LEVEL_SIZE) {
          for (let x = min_x - LEVEL_SIZE; x < max_x + LEVEL_SIZE; x += LEVEL_SIZE) {
            if (!this.generated_levels.has(hash_vec(createVector(x, y)))) {
              let new_level = this.levels.find(lvl => {
                return (
                  lvl.left == false &&
                  lvl.right == false &&
                  lvl.top == false &&
                  lvl.bottom == false
                )
              })
              this.generated_levels.set(hash_vec(createVector(x, y)), [createVector(x, y), new_level])
            }
          }
        }

        particle_plugin(game_controller.game_world)
        player_plugin(game_controller.game_world)
        render_plugin(game_controller.game_world)
        this.generated_levels.forEach(lvl_pos => {
          get_serialized_level(lvl_pos[0].x, lvl_pos[0].y, lvl_pos[1]).forEach((bundle) => {
            game_controller.game_world.spawn_entity(bundle)
          })
        })
        this.levels_generated = 500
      }
      bar.progress = this.levels_generated / 500
    })
  }
}

/** @param {Array} array */
const shuffle_array = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
