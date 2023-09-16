class Component {
  constructor() {
    /** @type {String} */
    this.name = this.constructor.name
  }
}

class Invincible extends Component {}

class Bullet extends Component {}

class Camera extends Component {}

class Rock extends Component {}

class Player extends Component {
  constructor() {
    super()
    this.health = 3
  }
}

class Enemy extends Component {
  constructor() {
    super()
    this.state = EnemyState.Wander
    this.health = 2
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
  constructor(pos = createVector(), dir = 0, speed = 1) {
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

class Gun extends Component {
  /**
  *  @param {Timer} shot_delay
  */
  constructor(shot_delay = new Timer(0)) {
    super()
    this.shot_delay = shot_delay
  }
}
