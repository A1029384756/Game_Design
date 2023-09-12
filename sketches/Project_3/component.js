class Component {
  constructor() {
    /** @type {String} */
    this.name = this.constructor.name
  }
}

class Sprite extends Component {
  /** @param {Image} img */
  constructor(img = createImage(0, 0)) {
    super()
    this.img = img
  }
}

class Transform extends Component {
  /** @param {Vector} v */
  constructor(v = createVector()) {
    super()
    this.v = v
  }
}
