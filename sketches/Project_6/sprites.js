/** @returns {Image} */
const player_sprite = () => {
  /** @type {Graphics} */
  let buf = createGraphics(PLAYER_SPRITE_SIZE, PLAYER_SPRITE_SIZE)
  buf.fill('blue')
  buf.ellipse(PLAYER_SPRITE_SIZE / 2, PLAYER_SPRITE_SIZE / 2, buf.width, buf.height)
  return buf.get()
}

/** @returns {Image} */
const alien_sprite = () => {
  let buf = createGraphics(ALIEN_SPRITE_SIZE, ALIEN_SPRITE_SIZE)
  buf.fill('red')
  buf.ellipse(ALIEN_SPRITE_SIZE / 2, ALIEN_SPRITE_SIZE / 2, buf.width, buf.height)
  return buf.get()
}

/** @returns {Image} */
const missile_sprite = () => {
  let buf = createGraphics(MISSILE_SPRITE_SIZE, MISSILE_SPRITE_SIZE)
  buf.fill('gray')
  buf.ellipse(MISSILE_SPRITE_SIZE / 2, MISSILE_SPRITE_SIZE / 2, buf.width, buf.height)
  return buf.get()
}

/** @returns {Image} */
const bullet_sprite = () => {
  let buf = createGraphics(BULLET_SPRITE_SIZE, BULLET_SPRITE_SIZE)
  buf.fill('gray')
  buf.ellipse(BULLET_SPRITE_SIZE / 2, BULLET_SPRITE_SIZE / 2, buf.width, buf.height)
  return buf.get()
}

/** @returns {Image} */
const missile_particle_sprite = () => {
  let buf = createGraphics(5, 5)
  buf.fill('white')
  buf.ellipse(0, 0, buf.width, buf.height)
  return buf.get()
}

/** @returns {Image} */
const background_image = () => {
  let buf = createImage(CANVAS_WIDTH, CANVAS_HEIGHT)
  buf.loadPixels()

  for (let i = 0; i < buf.pixels.length / 4; i++) {
    let is_star = (random() > 0.999)

    buf.pixels[4 * i] = is_star ? 255 : 45
    buf.pixels[4 * i + 1] = is_star ? 255 : 45
    buf.pixels[4 * i + 2] = is_star ? 255 : 45
    buf.pixels[4 * i + 3] = is_star ? 255 : 255
  }

  buf.updatePixels()
  return buf
}

/** @returns {Image} */
const restart_button_sprite = () => {
  let buf = /** @type {Graphics} */ (createGraphics(100, 100))
  buf.fill('green')
  buf.stroke('white')
  buf.rect(0, 0, buf.width, buf.height)
  buf.noStroke()
  buf.fill('black')
  buf.rect(35, 10, 5, 5)
  buf.rect(40, 10, 5, 5)
  buf.rect(45, 10, 5, 5)
  buf.rect(50, 10, 5, 5)
  buf.rect(55, 10, 5, 5)
  buf.rect(60, 10, 5, 5)
  buf.rect(65, 10, 5, 5)
  buf.rect(25, 15, 5, 5)
  buf.rect(30, 15, 5, 5)
  buf.rect(35, 15, 5, 5)
  buf.rect(40, 15, 5, 5)
  buf.rect(45, 15, 5, 5)
  buf.rect(50, 15, 5, 5)
  buf.rect(55, 15, 5, 5)
  buf.rect(60, 15, 5, 5)
  buf.rect(65, 15, 5, 5)
  buf.rect(70, 15, 5, 5)
  buf.rect(80, 15, 5, 5)
  buf.rect(20, 20, 5, 5)
  buf.rect(25, 20, 5, 5)
  buf.rect(30, 20, 5, 5)
  buf.rect(65, 20, 5, 5)
  buf.rect(70, 20, 5, 5)
  buf.rect(75, 20, 5, 5)
  buf.rect(80, 20, 5, 5)
  buf.rect(15, 25, 5, 5)
  buf.rect(20, 25, 5, 5)
  buf.rect(25, 25, 5, 5)
  buf.rect(70, 25, 5, 5)
  buf.rect(75, 25, 5, 5)
  buf.rect(80, 25, 5, 5)
  buf.rect(15, 30, 5, 5)
  buf.rect(20, 30, 5, 5)
  buf.rect(65, 30, 5, 5)
  buf.rect(70, 30, 5, 5)
  buf.rect(75, 30, 5, 5)
  buf.rect(80, 30, 5, 5)
  buf.rect(10, 35, 5, 5)
  buf.rect(15, 35, 5, 5)
  buf.rect(20, 35, 5, 5)
  buf.rect(10, 40, 5, 5)
  buf.rect(15, 40, 5, 5)
  buf.rect(10, 45, 5, 5)
  buf.rect(15, 45, 5, 5)
  buf.rect(10, 50, 5, 5)
  buf.rect(15, 50, 5, 5)
  buf.rect(80, 50, 5, 5)
  buf.rect(10, 55, 5, 5)
  buf.rect(15, 55, 5, 5)
  buf.rect(80, 55, 5, 5)
  buf.rect(10, 60, 5, 5)
  buf.rect(15, 60, 5, 5)
  buf.rect(75, 60, 5, 5)
  buf.rect(80, 60, 5, 5)
  buf.rect(15, 65, 5, 5)
  buf.rect(20, 65, 5, 5)
  buf.rect(70, 65, 5, 5)
  buf.rect(75, 65, 5, 5)
  buf.rect(80, 65, 5, 5)
  buf.rect(15, 70, 5, 5)
  buf.rect(20, 70, 5, 5)
  buf.rect(70, 70, 5, 5)
  buf.rect(75, 70, 5, 5)
  buf.rect(20, 75, 5, 5)
  buf.rect(25, 75, 5, 5)
  buf.rect(30, 75, 5, 5)
  buf.rect(60, 75, 5, 5)
  buf.rect(65, 75, 5, 5)
  buf.rect(70, 75, 5, 5)
  buf.rect(75, 75, 5, 5)
  buf.rect(25, 80, 5, 5)
  buf.rect(30, 80, 5, 5)
  buf.rect(35, 80, 5, 5)
  buf.rect(40, 80, 5, 5)
  buf.rect(45, 80, 5, 5)
  buf.rect(50, 80, 5, 5)
  buf.rect(55, 80, 5, 5)
  buf.rect(60, 80, 5, 5)
  buf.rect(65, 80, 5, 5)
  buf.rect(70, 80, 5, 5)
  buf.rect(30, 85, 5, 5)
  buf.rect(35, 85, 5, 5)
  buf.rect(40, 85, 5, 5)
  buf.rect(45, 85, 5, 5)
  buf.rect(50, 85, 5, 5)
  buf.rect(55, 85, 5, 5)
  buf.rect(60, 85, 5, 5)
  return buf.get(0, 0, buf.width, buf.height)
}
