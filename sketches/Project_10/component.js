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
   * @param {[Number, Number, Number, Number]} tint
   */
  constructor(imgs = [createImage(0, 0)], tint = [255, 255, 255, 255]) {
    super()
    this.imgs = imgs
    this.curr_frame = 0
    this.frame_count = imgs.length
    this.tint = tint
  }
}

class Transform extends Component {
  /** 
   * @param {Vector} pos 
   * @param {Vector} dir 
   * @param {Vector} vel 
   */
  constructor(pos = createVector(), dir = createVector(), vel = createVector()) {
    super()
    this.pos = pos
    this.dir = dir
    this.vel = vel
  }
}
