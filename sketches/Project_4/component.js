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
  /** 
   * @param {Vector} pos 
   * @param {Number} dir
   * @param {Number} speed 
   */
  constructor(pos = createVector(), dir = 0, speed = 0) {
    super()
    this.pos = pos
    this.dir = dir
    this.speed = speed
  }
}

class Collider extends Component {
  /** @param {Number} radius */
  constructor(radius = 0) {
    super()
    this.radius = radius
  }
}

class Player extends Component {}

class Enemy extends Component {}

class Bullet extends Component {}

class Camera extends Component {}

class Gun extends Component {
  /**
  *  @param {Timer} shot_delay
  */
  constructor(shot_delay = new Timer(0)) {
    super()
    this.shot_delay = shot_delay
  }
}
