class Component {
  constructor() {
    /** @type {String} */
    this.name = this.constructor.name
  }
}

class Building extends Component {}

class Ball extends Component {}

class Cannon extends Component {
  /** 
   * @param {Vector} initial_vel 
   */
  constructor(initial_vel = createVector()) {
    super()
    this.fired = false
    this.initial_vel = initial_vel
  }
}

class Score extends Component {}

class Button extends Component {
  /** 
   * @param {String} text 
   * @param {Number} width 
   * @param {Number} height
   * @param {String} color
   * @param {Function} action
   */
  constructor(text = '', width = 0, height = 0, color = 'red', action = () => {}) {
    super()
    this.text = text
    this.width = width
    this.height = height
    this.color = color
    this.action = action
  }
}

class GameText extends Component {
  /** @param {String} text */
  constructor(text = '') {
    super()
    this.text = text
  }
}

class Player extends Component {}

class Bird extends Component {
  /** @param {Number} jump_height */
  constructor(jump_height = 0) {
    super()
    this.jump_height = jump_height
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
