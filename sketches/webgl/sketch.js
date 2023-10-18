let sprite

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  let v = createGraphics(10, 10)
  v.rect(0, 0, 10, 10)
  sprite = v.get()
}

function draw() {
  background(51)

  for (let i = 0; i < 500; i++) {
    translate(createVector(10, 10))
    rotate(0.5)
    image(sprite, ((-width / 2) + i * 10) % width, ((-height / 2) + i * 10) % height)
    rotate(-0.5)
    translate(createVector(-10, -10))
  }
}
