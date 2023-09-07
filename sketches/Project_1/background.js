function create_background_image() {
  let buf = createImage(PANE_WIDTH, PANE_HEIGHT)
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
