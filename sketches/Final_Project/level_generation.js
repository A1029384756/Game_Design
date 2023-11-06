const level_generation = () => {
  let generated_levels = /** @type {Map<String, [Vector, Level]>} */ (new Map())
  let fringe = /** @type {Vector[]} */ ([])

  /** @param {Vector} pos */
  const hash_vec = (pos) => `${round(pos.x)},${round(pos.y)}`
  const random_bool = () => random() > 0.5

  /** @param {Vector} pos */
  const generate_level = (pos) => {
    if (generated_levels.has(hash_vec(pos))) {
      return
    }

    let left_open = generated_levels.has(hash_vec(createVector(pos.x - LEVEL_SIZE, pos.y))) ? generated_levels.get(hash_vec(createVector(pos.x - LEVEL_SIZE, pos.y)))[1].right : random_bool()
    let right_open = generated_levels.has(hash_vec(createVector(pos.x + LEVEL_SIZE, pos.y))) ? generated_levels.get(hash_vec(createVector(pos.x + LEVEL_SIZE, pos.y)))[1].left : random_bool()
    let up_open = generated_levels.has(hash_vec(createVector(pos.x, pos.y - LEVEL_SIZE))) ? generated_levels.get(hash_vec(createVector(pos.x, pos.y - LEVEL_SIZE)))[1].bottom : random_bool()
    let down_open = generated_levels.has(hash_vec(createVector(pos.x, pos.y + LEVEL_SIZE))) ? generated_levels.get(hash_vec(createVector(pos.x, pos.y + LEVEL_SIZE)))[1].top : random_bool()

    let new_level = levels.find(lvl => {
      return (
        lvl.left == left_open &&
        lvl.right == right_open &&
        lvl.top == up_open &&
        lvl.bottom == down_open
      )
    })

    generated_levels.set(hash_vec(pos), [pos, new_level])
    if (new_level.left) {
      fringe.push(createVector(pos.x - LEVEL_SIZE, pos.y))
    }
    if (new_level.right) {
      fringe.push(createVector(pos.x + LEVEL_SIZE, pos.y))
    }
    if (new_level.top) {
      fringe.push(createVector(pos.x, pos.y - LEVEL_SIZE))
    }
    if (new_level.bottom) {
      fringe.push(createVector(pos.x, pos.y + LEVEL_SIZE))
    }

    shuffle_array(levels)
  }

  generated_levels.set(hash_vec(createVector(0, 0)), [createVector(0, 0), levels[0]])
  fringe.push(createVector(-LEVEL_SIZE, 0))
  fringe.push(createVector(LEVEL_SIZE, 0))
  fringe.push(createVector(0, -LEVEL_SIZE))
  for (let i = 0; i < 500; i++) {
    if (fringe.length == 0) {
      break
    }
    let curr_pos = fringe.shift()
    generate_level(curr_pos)
  }
    
  fringe.forEach(pos => {
    let left_open = generated_levels.has(hash_vec(createVector(pos.x - LEVEL_SIZE, pos.y))) ? generated_levels.get(hash_vec(createVector(pos.x - LEVEL_SIZE, pos.y)))[1].right : false
    let right_open = generated_levels.has(hash_vec(createVector(pos.x + LEVEL_SIZE, pos.y))) ? generated_levels.get(hash_vec(createVector(pos.x + LEVEL_SIZE, pos.y)))[1].left : false
    let up_open = generated_levels.has(hash_vec(createVector(pos.x, pos.y - LEVEL_SIZE))) ? generated_levels.get(hash_vec(createVector(pos.x, pos.y - LEVEL_SIZE)))[1].bottom : false
    let down_open = generated_levels.has(hash_vec(createVector(pos.x, pos.y + LEVEL_SIZE))) ? generated_levels.get(hash_vec(createVector(pos.x, pos.y + LEVEL_SIZE)))[1].top : false
  })

  generated_levels.forEach(lvl_pos => {
    get_serialized_level(lvl_pos[0].x, lvl_pos[0].y, lvl_pos[1]).forEach((bundle) => {
      game_controller.spawn_entity(bundle)
    })
  })
}

/** @param {Array} array */
const shuffle_array = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
