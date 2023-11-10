class SerialSprite {
  /** @type {Number} */
  tile
  /** @type {Number} */
  dir
  /** @type {Number} */
  alpha
  /** @type {Number} */
  depth
}

class WorldTile {
  /** @type {[Number, Number]} */
  rel_pos = [0, 0]
  /** @type {String} */
  tile_type = ''
  /** @type {Boolean} */
  has_collider = false
  /** @type {SerialSprite} */
  sprite = new SerialSprite()
}

class SerializedEntity {
  /** @type {String} */
  type = ''
  /** @type {[Number, Number]} */
  rel_pos = [0, 0]
}

class Level {
  /** @type {Boolean} */
  top = false
  /** @type {Boolean} */
  left = false
  /** @type {Boolean} */
  right = false
  /** @type {Boolean} */
  bottom = false
  /** @type {WorldTile[]} */
  tiles = []
  /** @type {SerializedEntity[]} */
  entities = []
  /** @type {String} */
  id
}

class Ground extends Component { }
class Bridge extends Component { }

const LEVEL_SIZE = 160

/**
 * @param {Number} x
 * @param {Number} y
 * @param {Level} level
 * @returns {Component[][]}
 */
const get_serialized_level = (x, y, level) => {
  let result = /** @type {Component[][]} */ ([])
  let lvl_imgs = sprite_manager.get_sprite_imgs(level.id)
  let foreground = lvl_imgs[0]
  let ground = lvl_imgs[1]
  let background = lvl_imgs[2]

  level.tiles.forEach((tile) => {
    let tile_bundle = /** @type {Component[]} */ ([])
    if (tile.has_collider) {
      tile_bundle.push(new Collider(TILE_SIZE, TILE_SIZE))
    }

    if (tile.tile_type == 'Ground') {
      tile_bundle.push(new Ground())
    } else if (tile.tile_type == 'Bridge') {
      tile_bundle.push(new Bridge())
    }

    tile_bundle.push(
      new Transform(
        createVector(
          x + tile.rel_pos[0] + TILE_SIZE / 2,
          y + tile.rel_pos[1] + TILE_SIZE / 2,
          tile.sprite.depth
        )
      )
    )
    result.push(tile_bundle)
  })

  level.entities.forEach(e => {
    let entity_bundle = /** @type {Component[]} */ ([])
    if (e.type == 'Goblin') {
      entity_bundle.push(sprite_manager.get_sprite('Goblin_idle'))
      entity_bundle.push(
        new Transform(
          createVector(
            x + e.rel_pos[0] + TILE_SIZE,
            y + e.rel_pos[1] + TILE_SIZE,
          )
        )
      )
      entity_bundle.push(
        new Collider(TILE_SIZE, 2 * TILE_SIZE),
      )
    } else if (e.type == 'Exit') {
      entity_bundle.push(sprite_manager.get_sprite('exit_door'))
      entity_bundle.push(
        new Transform(
          createVector(
            x + e.rel_pos[0] + TILE_SIZE / 2,
            y + e.rel_pos[1] + TILE_SIZE,
          )
        )
      )
      entity_bundle.push(
        new Collider(TILE_SIZE, 2 * TILE_SIZE),
      )
      entity_bundle.push(new Exit())
    }

    result.push(entity_bundle)
  })

  result.push([
    new Sprite([foreground.get()]),
    new Transform(
      createVector(x + LEVEL_SIZE / 2, y + LEVEL_SIZE / 2, 1)
    )
  ])
  result.push([
    new Sprite([ground.get()]),
    new Transform(
      createVector(x + LEVEL_SIZE / 2, y + LEVEL_SIZE / 2, -1)
    )
  ])
  result.push([
    new Sprite([background.get()]),
    new Transform(
      createVector(x + LEVEL_SIZE / 2, y + LEVEL_SIZE / 2, -5)
    )
  ])
  return result
}

/**
 * @param {Level} level
 * @returns {Image[]}
 */
const create_level_sprite = (level) => {
  let foreground = /** @type {Graphics} */ (createGraphics(LEVEL_SIZE, LEVEL_SIZE))
  let ground = /** @type {Graphics} */ (createGraphics(LEVEL_SIZE, LEVEL_SIZE))
  let background = /** @type {Graphics} */ (createGraphics(LEVEL_SIZE, LEVEL_SIZE))
  let buf = /** @type {Graphics} */ (createGraphics(TILE_SIZE, TILE_SIZE))
  let tilemap = sprite_manager.get_sprite('tilemap')
  level.tiles.forEach((tile) => {
    let tile_bundle = /** @type {Component[]} */ ([])
    if (tile.has_collider) {
      tile_bundle.push(new Collider(TILE_SIZE, TILE_SIZE))
    }
    buf.clear(0, 0, 0, 0)
    buf.push()
    if (tile.sprite.dir == 1) {
      buf.scale(-1, 1)
      buf.image(tilemap.imgs[tile.sprite.tile], -TILE_SIZE, 0)
    } else if (tile.sprite.dir == 2) {
      buf.scale(1, -1)
      buf.image(tilemap.imgs[tile.sprite.tile], 0, -TILE_SIZE)
    } else if (tile.sprite.dir == 3) {
      buf.scale(-1, -1)
      buf.image(tilemap.imgs[tile.sprite.tile], -TILE_SIZE, -TILE_SIZE)
    } else {
      buf.image(tilemap.imgs[tile.sprite.tile], 0, 0)
    }
    buf.pop()

    if (tile.tile_type == 'Ground') {
      tile_bundle.push(new Ground())
      ground.image(buf.get(), tile.rel_pos[0], tile.rel_pos[1])
    } else if (tile.tile_type == 'Bridge') {
      tile_bundle.push(new Bridge())
      ground.image(buf.get(), tile.rel_pos[0], tile.rel_pos[1])
    } else if (tile.tile_type == 'Water') {
      foreground.image(buf.get(), tile.rel_pos[0], tile.rel_pos[1])
    } else if (tile.tile_type == 'Props') {
      foreground.image(buf.get(), tile.rel_pos[0], tile.rel_pos[1])
    } else if (tile.tile_type == 'Background_Props') {
      background.image(buf.get(), tile.rel_pos[0], tile.rel_pos[1])
    } else if (tile.tile_type == 'Background') {
      background.image(buf.get(), tile.rel_pos[0], tile.rel_pos[1])
    }
  })

  return [foreground.get(), ground.get(), background.get()]
}
