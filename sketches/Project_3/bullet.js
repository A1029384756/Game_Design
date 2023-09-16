class Bullet extends GameObject {
  /** 
   * @param {Image} sprite
   * @param {Vector} pos
   * @param {Number} direction
   */
  constructor(sprite, pos, direction) {
    super(pos)
    /* @type {Image} */
    this.sprite = sprite
    /* @type {Vector} */
    this.pos = pos
    /* @type {Number} */
    this.direction = direction
    /* @type {Collider} */
    this.collider = new Collider(this.pos, this.sprite.width)
    /* @type {Number} */
    this.speed = 5
  }

  update() {
    super.update()
    this.pos.x += this.speed * cos(this.direction)
    this.pos.y += this.speed * sin(this.direction)
  }

  draw() {
    let pos = copy_vector(this.pos)
    translate(pos)
    rotate(this.direction + HALF_PI)
    image(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2)
    rotate(-this.direction - HALF_PI)
    translate(pos.mult(createVector(-1, -1)))
  }
}

const bullet_sprite = () => {
  let buf = createGraphics(8, 8)
  buf.noStroke()
  buf.fill('rgba(0,0,0,255)')
  buf.rect(3, 0, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(4, 0, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(2, 1, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(3, 1, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(4, 1, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(5, 1, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(2, 2, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(3, 2, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(4, 2, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(5, 2, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(1, 3, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(2, 3, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(3, 3, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(4, 3, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(5, 3, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(6, 3, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(1, 4, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(2, 4, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(3, 4, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(4, 4, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(5, 4, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(6, 4, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(0, 5, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(1, 5, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(2, 5, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(3, 5, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(4, 5, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(5, 5, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(6, 5, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(7, 5, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(1, 6, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(2, 6, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(3, 6, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(4, 6, 1, 1)
  buf.fill('rgba(175,153,76,255)')
  buf.rect(5, 6, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(6, 6, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(2, 7, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(3, 7, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(4, 7, 1, 1)
  buf.fill('rgba(0,0,0,255)')
  buf.rect(5, 7, 1, 1)
  return buf.get(0, 0, buf.width, buf.height)
}
