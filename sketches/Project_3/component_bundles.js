/**
  * @param {Number} x
  * @param {Number} y
  * @param {SpriteManager} sprite_manager
  */
const player = (x, y, sprite_manager) => {
  return [
    new Camera(),
    new Player(20),
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
    new Sprite(sprite_manager.get_sprite('enemy_2')),
    new Transform(createVector(x, y, 0)),
    new Collider(10)
  ]
}

/**
  * @param {Number} x
  * @param {Number} y
  * @param {SpriteManager} sprite_manager
  */
const coin = (x, y, sprite_manager) => {
  return [
    new Coin(),
    new Sprite(sprite_manager.get_sprite('coin')),
    new Transform(createVector(x, y, 0)),
    new Collider(10),
    new Obstacle()
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
    new Transform(createVector(x, y, 2)),
    new Collider(10),
    new Obstacle()
  ]
}

/**
  * @param {Number} x
  * @param {Number} y
  * @param {SpriteManager} sprite_manager
  */
const border = (x, y, sprite_manager) => {
  return [
    new Border(),
    new Sprite(sprite_manager.get_sprite('border')),
    new Transform(createVector(x, y, 2)),
    new Collider(10),
    new Obstacle()
  ]
}
