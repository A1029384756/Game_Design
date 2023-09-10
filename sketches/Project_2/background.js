/** @type {String[][]} */
const tilemap = [[]]

const bg_image = () => {
  const tile = bg_tile()
  let background = createGraphics(1000, 1000)
  for (let x = 0; x < background.width; x += 20) {
    for (let y = 0; y < background.height; y += 20) {
      background.image(tile, x, y)
    }
  }
  return background.get(0, 0, background.width, background.height)
}

const bg_tile = () => {
  let tile = createGraphics(20, 20)
  tile.fill('tan')
  tile.rect(0, 0, 20, 20)
  return tile.get(0, 0, tile.width, tile.height)
}
