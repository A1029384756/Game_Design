class Component {
  constructor() {
    /** @type {String} */
    this.name = this.constructor.name
  }
}

class Border extends Component {}

class Bullet extends Component {}

class Coin extends Component {}

class Rock extends Component {}

class Camera extends Component {}

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

class Player extends Component {
  /** @param {Number} remaining_goals */
  constructor(remaining_goals = 1) {
    super()
    this.health = 3
    this.remaining_goals = remaining_goals
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
