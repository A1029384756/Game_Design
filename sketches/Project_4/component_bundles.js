/**
  * @param {Number} x
  * @param {Number} y
  * @param {SpriteManager} sprite_manager
  */
const player = (x, y, sprite_manager) => {
  return [
    new Camera(),
    new Player(),
    new Sprite(sprite_manager.get_sprite('player')),
    new Transform(createVector(x, y, 1)),
    new Gun(new Timer(500)),
    new Collider(10)
  ]
}

/**
  * @param {Number} x
  * @param {Number} y
  * @param {SpriteManager} sprite_manager
  */
const enemy = (x, y, sprite_manager) => {
  return [
    new Enemy(),
    new Sprite(sprite_manager.get_sprite('enemy')),
    new Transform(createVector(x, y, 1)),
    new Collider(10)
  ]
}

/**
  * @param {Number} x
  * @param {Number} y
  * @param {SpriteManager} sprite_manager
  */
const rock = (x, y, sprite_manager) => {
  return [
    new Rock(),
    new Sprite(sprite_manager.get_sprite('rock')),
    new Transform(createVector(x, y, 1)),
    new Collider(10)
  ]
}

/**
  * @param {Number} x
  * @param {Number} y
  * @param {SpriteManager} sprite_manager
  */
const border = (x, y, sprite_manager) => {
  return [
    new Rock(),
    new Sprite(sprite_manager.get_sprite('rock')),
    new Transform(createVector(x, y, 1)),
    new Collider(10),
    new Invincible()
  ]
}

