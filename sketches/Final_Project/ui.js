class Button extends Component {
  /** 
   * @param {Image[]} imgs
   * @param {Function} action
   */
  constructor(imgs = [createImage(0, 0)], action = () => { }) {
    super()
    this.imgs = imgs
    this.curr_frame = 0
    this.action = action
  }
}

class UIText extends Component {
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

class UIImage extends Component {
  /**
   * @param {Image[]} imgs
   */
  constructor(imgs = [createImage(0, 0)]) {
    super()
    this.curr_frame = 0
    this.imgs = imgs
    this.frame_count = imgs.length
  }
}

class ButtonHover extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Button(),
        new Transform(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let buttons = r[0]
    buttons.forEach((b_c, _) => {
      let button = system_get_button(b_c)
      let transform = system_get_transform(b_c)
      if (button_hovered(button, transform)) {
        button.curr_frame = 1
      } else {
        button.curr_frame = 0
      }
    })
  }
}

/**
 * @param {Button} button 
 * @param {Transform} button_transform
 */
const button_hovered = (button, button_transform) => {
  let mouse_x = round(mouseX * CANVAS_WIDTH / game_controller.size)
  let mouse_y = round(mouseY * CANVAS_HEIGHT / game_controller.size)
  
  let left = mouse_x > button_transform.pos.x - button.imgs[button.curr_frame].width / 2
  let right = mouse_x < button_transform.pos.x + button.imgs[button.curr_frame].width / 2
  let top = mouse_y > button_transform.pos.y - button.imgs[button.curr_frame].height / 2
  let bottom = mouse_y < button_transform.pos.y + button.imgs[button.curr_frame].height / 2

  return left && right && top && bottom
}

class AnimateUIImage extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new UIImage()
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let images = r[0]
    images.forEach((i_c, _) => {
      let img = system_get_image(i_c)
      if (frameCount % 5 == 0) {
        img.curr_frame += 1
      }
      if (img.curr_frame >= img.frame_count) {
        img.curr_frame = 0
      }
    })
  }
}
