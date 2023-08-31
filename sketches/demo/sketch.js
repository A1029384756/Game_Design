class Plane {
  /** @param {Number} x
   *  @param {Number} y
   */
  constructor(x, y) {
    this.#x = x
    this.#y = y
  }

  /** @description draws the plane to the screen
   */
  draw() {
    ellipse(this.#x, this.#y, 20, 20)
  }

  /** @description updates the position of the plane
   */
  update() {
    this.#x += 20
    this.#y += 20

    if (this.#x > 420) {
      this.#x = -20
    }
    if (this.#y > 420) {
      this.#y = -20
    }
  }

  /** @type Number 
   *  @description the x-coordinate of the plane
   */
  #x

  /** @type Number 
   *  @description the y-coordinate of the plane
   */
  #y
}

/** @type Plane[] */
const planes = []

function setup () {
  createCanvas(PANE_WIDTH, PANE_HEIGHT)
  Array(21).fill(0).map((_, i) => {
    planes.push(new Plane(i * 20, i * 20))
  })
}

function draw () {
  background(100)

  planes.forEach(plane => {
    plane.draw()
    plane.update()
  })
}
