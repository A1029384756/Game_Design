class Projectile extends GameObject {
  /** @param {Vec2} pos
   *  @param {Vec2} dir 
   *  @param sprite
   *  @param {Number} speed
   *  @param {Number} accel
   */
  constructor(pos, dir, sprite = createImage(0, 0), speed = 10, accel = 0) {
    super(pos)
    this.dir = dir
    this.sprite = sprite
    this.speed = speed
    this.accel = accel
    this.lifetime = PANE_HEIGHT / speed + 20
    this.collider = new Collider(pos, 16)
  }

  update() {
    super.update()
    this.collider.pos = this.pos
    this.pos.x += this.speed * this.dir.x
    this.pos.y += this.speed * this.dir.y
    this.speed += this.accel
    this.lifetime--
  }

  draw() {
    super.draw()
    image(this.sprite, this.pos.x - this.sprite.width / 2, this.pos.y - this.sprite.height / 2)
  }
}

class Bullet extends Projectile {
  /** @param {Vec2} pos
   *  @param {Vec2} dir 
   *  @param sprite
   *  @param {Number} speed
   *  @param {Number} accel
   */
  constructor(pos, dir, sprite = createImage(0, 0), speed = 10, accel = 0) {
    super(pos, dir, sprite, speed, accel)
    this.collider = new Collider(pos, 8)
  }
}

function create_bullet_sprite() {
  const bullet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 175, 153, 76, 255, 175, 153, 76, 255, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 175, 153, 76, 255, 175, 153, 76, 255, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 175, 153, 76, 255, 175, 153, 76, 255, 175, 153, 76, 255, 175, 153, 76, 255, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 175, 153, 76, 255, 175, 153, 76, 255, 175, 153, 76, 255, 175, 153, 76, 255, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 255, 175, 153, 76, 255, 175, 153, 76, 255, 175, 153, 76, 255, 175, 153, 76, 255, 175, 153, 76, 255, 175, 153, 76, 255, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 255, 175, 153, 76, 255, 175, 153, 76, 255, 175, 153, 76, 255, 175, 153, 76, 255, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0]

  let buf = createImage(8, 8)
  buf.loadPixels()
  for (let i = 0; i < buf.pixels.length; i += 4) {
    buf.pixels[i] = bullet[i]
    buf.pixels[i + 1] = bullet[i + 1]
    buf.pixels[i + 2] = bullet[i + 2]
    buf.pixels[i + 3] = bullet[i + 3]
  }
  buf.updatePixels()
  return buf.get(0, 0, buf.width, buf.height)
}

class Bomb extends Projectile {
  /** @param {Vec2} pos
   *  @param {Vec2} dir 
   *  @param sprite
   *  @param {Number} speed
   *  @param {Number} accel
   */
  constructor(pos, dir, sprite = createImage(0, 0), speed = 10, accel = 0.1) {
    super(pos, dir, sprite, speed, accel)
  }
}

function create_bomb_sprite() {
  const bomb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 116, 88, 191, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 96, 76, 60, 191, 96, 76, 60, 191, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 12, 14, 19, 255, 52, 25, 11, 255, 141, 78, 44, 255, 141, 78, 44, 255, 52, 25, 11, 255, 12, 14, 19, 255, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 12, 191, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 12, 14, 19, 255, 12, 14, 19, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 8, 9, 12, 191, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 12, 191, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 8, 9, 12, 191, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 18, 21, 28, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 18, 21, 28, 255, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 0, 54, 4, 9, 255, 6, 7, 9, 255, 12, 14, 19, 255, 12, 14, 19, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 12, 14, 19, 255, 12, 14, 19, 255, 54, 4, 9, 255, 54, 4, 9, 255, 0, 0, 0, 0, 0, 0, 0, 0, 108, 8, 19, 255, 217, 16, 38, 255, 217, 16, 38, 255, 162, 12, 28, 255, 108, 8, 19, 255, 108, 8, 19, 255, 108, 8, 19, 255, 108, 8, 19, 255, 108, 8, 19, 255, 108, 8, 19, 255, 162, 12, 28, 255, 217, 16, 38, 255, 217, 16, 38, 255, 108, 8, 19, 255, 0, 0, 0, 0, 0, 0, 0, 0, 108, 8, 19, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 108, 8, 19, 255, 0, 0, 0, 0, 0, 0, 0, 0, 72, 5, 12, 191, 162, 12, 28, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 162, 12, 28, 255, 72, 5, 12, 191, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 12, 14, 19, 255, 60, 11, 19, 255, 108, 8, 19, 255, 108, 8, 19, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 217, 16, 38, 255, 108, 8, 19, 255, 54, 4, 9, 255, 12, 14, 19, 255, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 14, 19, 255, 25, 29, 38, 255, 25, 29, 38, 255, 18, 21, 28, 255, 12, 14, 19, 255, 12, 14, 19, 255, 12, 14, 19, 255, 12, 14, 19, 255, 12, 14, 19, 255, 18, 21, 28, 255, 25, 29, 38, 255, 12, 14, 19, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 18, 21, 28, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 18, 21, 28, 255, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 12, 14, 19, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 25, 29, 38, 255, 12, 14, 19, 255, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 12, 14, 19, 255, 12, 14, 19, 255, 12, 14, 19, 255, 12, 14, 19, 255, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  let buf = createImage(16, 16)
  buf.loadPixels()
  for (let i = 0; i < buf.pixels.length; i += 4) {
    buf.pixels[i] = bomb[i]
    buf.pixels[i + 1] = bomb[i + 1]
    buf.pixels[i + 2] = bomb[i + 2]
    buf.pixels[i + 3] = bomb[i + 3]
  }
  buf.updatePixels()
  return buf.get(0, 0, buf.width, buf.height)
}