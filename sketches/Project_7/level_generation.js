const TILEMAP = [
  'wwwwwwwwwww-w-wwwwww',
  'w++++E++p+--w+++-++w',
  'w-wwwww+www-wwwwww+w',
  'w+++++w+++w-+++++w+w',
  'w+wwwwwww+ww--ww-w+w',
  'w+++++-+++wE--Ew+w-w',
  'w-wwwww+w-wwwwww-w+w',
  '--++++++w----p---+--',
  'www-www-ww-wwwww-w-w',
  'w-------ww+++++++w-w',
  'w+w+www-ww+wwwww+w-w',
  'w+w+++w-M--w---w+--w',
  'w+w+w+wwwwww-w+++www',
  '--w+++-+++w--w-w+w--',
  'w-p-www+w-+-ww-w+w+w',
  'wwwww+++wwwww--w+++w',
  '-+++++w-w+++++wwwwE-',
  'w-wwwww-w-wwwwwwww-w',
  'wE++++++++++-++++++w',
  'wwwwwwwwwww-w-wwwwww',
]

class Wall extends Component { }

/** @returns {Component[][]} */
const create_level = () => {
  let result = /** @type {Component[][]} */ ([])
  let agent_start_time = 0
  let wall_img = /** @type {Graphics} */ (createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT))
  TILEMAP.forEach((row, y) => {
    row.split('').forEach((tile, x) => {
      if (tile !== 'w') {
        let navcell = new NavCell(createVector(x, y))
        // If cells wrap
        if (x == 0 || x == 19) {
          navcell.push(createVector(x == 0 ? 19 : 0, y))
          navcell.push(createVector(x == 0 ? 1 : 18, y))
        } else if (y == 0 || y == 19) {
          navcell.push(createVector(x, y == 0 ? 19 : 0))
          navcell.push(createVector(x, y == 0 ? 1 : 18))
        } else {
          // Check above, below, left, right
          let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
          directions.forEach(dir => {
            if (TILEMAP[y + dir[0]][x + dir[1]] !== 'w') {
              navcell.push(createVector(x + dir[1], y + dir[0]))
            }
          })
        }

        game_controller.navmap.items.push(navcell)
      }

      let tile_components = /** @type {Component[]} */ ([])
      switch (tile) {
        case 'w':
          tile_components.push(
            new Wall(),
            new Collider(20, 20),
            new Transform(createVector(20 * x, 20 * y, 2)),
          )
          wall_img.image(wall_sprite, 20 * x, 20 * y)
          break
        case 'M':
          tile_components.push(
            new Player(),
            new Transform(
              createVector(
                20 * x,
                20 * y,
                1,
              )
            ),
            new Collider(19, 19),
            new Sprite([player_sprite], [255, 255, 0, 255]),
          )
          break
        case 'E':
          tile_components.push(
            new Enemy(
              30,
              agent_start_time,
            ),
            new Transform(
              createVector(
                20 * x,
                20 * y,
                0,
              )
            ),
            new Collider(19, 19),
            new Sprite([enemy_sprite], [255, 0, 0, 255]),
          )
          agent_start_time += 5
          break
        case 'p':
          tile_components.push(
            new Pellet(),
            new PowerPellet(),
            new Transform(
              createVector(
                20 * x,
                20 * y,
                -1,
              )
            ),
            new Collider(5, 5),
            new Sprite([power_pellet_sprite]),
          )
          break
        case '+':
          tile_components.push(
            new Pellet(),
            new Transform(
              createVector(
                20 * x,
                20 * y,
                -1,
              )
            ),
            new Collider(5, 5),
            new Sprite([pellet_sprite]),
          )
          break
      }
      result.push(tile_components)
    })
  })

  result.push([
    new Sprite([wall_img.get()]),
    new Transform(createVector(190, 190, -1)),
  ])

  return result
}
