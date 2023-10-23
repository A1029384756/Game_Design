class Component {
  constructor() {
    /** @type {String} */
    this.name = this.constructor.name
  }
}

class Button extends Component {
  /** 
   * @param {Image} img
   * @param {Function} action
   */
  constructor(img = createImage(0, 0), action = () => { }) {
    super()
    this.img = img
    this.action = action
  }
}

class GameText extends Component {
  /** 
   * @param {String} text 
   * @param {Number} size
   * @param {[Number, Number, Number]} color
   */
  constructor(text = '', size = 30, color = [0, 0, 0]) {
    super()
    this.text = text
    this.size = size
    this.color = color
  }
}

class Sprite extends Component {
  /** 
   * @param {Image[]} imgs
   */
  constructor(imgs = [createImage(0, 0)]) {
    super()
    this.imgs = imgs
    this.curr_frame = 0
    this.frame_count = imgs.length
    this.facing_right = true
  }
}

class Transform extends Component {
  /** 
   * @param {Vector} pos 
   * @param {Vector} vel 
   * @param {Number} dir 
   */
  constructor(pos = createVector(), vel = createVector(), dir = 0) {
    super()
    this.pos = pos
    this.vel = vel
    this.dir = dir
    this.x_remainder = 0
    this.y_remainder = 0
  }
}

class Collider extends Component {
  /** 
   * @param {Number} w 
   * @param {Number} h 
   */
  constructor(w = 0, h = 0) {
    super()
    this.w = w
    this.h = h
  }
}

class Sensor extends Collider {
  /**
   * @param {Number} x_offset
   * @param {Number} y_offset
   */
  constructor(x_offset = 0, y_offset = 0) {
    super()
    this.x_offset = x_offset
    this.y_offset = y_offset
  }
}

class Health extends Component {
  /**
   * @param {Number} health
   */
  constructor(health = 0) {
    super()
    this.health = health
  }
}
