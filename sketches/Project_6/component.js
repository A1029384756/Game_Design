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
   * @param {Vector} pos
   */
  constructor(img = createImage(0, 0), action = () => {}, pos = createVector()) {
    super()
    this.img = img
    this.action = action
    this.pos = pos
  }
}

class GameText extends Component {
  /** 
   * @param {String} text 
   * @param {Number} size
   * @param {Vector} pos
   * @param {[Number, Number, Number]} color
   */
  constructor(text = '', size = 30, pos = createVector(), color = [0, 0, 0]) {
    super()
    this.text = text
    this.size = size
    this.pos = pos
    this.color = color
  }
}

class Sprite extends Component {
  /** 
   * @param {Image} img 
   * @param {Number} [frame_count=1] 
   */
  constructor(img = createImage(0, 0), frame_count = 1) {
    super()
    this.img = img
    this.frame_count = frame_count
    this.curr_frame = 0
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
