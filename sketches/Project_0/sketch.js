/** @type {GameObject[]} */
const objects = []

function setup() {
  createCanvas(PANE_HEIGHT, PANE_WIDTH)
  objects.push(new Logo(PANE_WIDTH / 2, PANE_HEIGHT / 2))
}

function draw() {
  background(BACKGROUND)

  objects.forEach(obj => {
    obj.draw()
    obj.update()
  })
}
