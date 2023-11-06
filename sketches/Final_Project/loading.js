class LoadingBar extends Component {
  /** @param {Function} on_finished */
  constructor(on_finished = () => { }) {
    super()
    this.progress = 0
    this.on_finished = on_finished
  }
}

class UpdateLoadingBar extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new LoadingBar(),
        new UIImage(),
      ])
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let loading_bars = r[0]

    loading_bars.forEach(c => {
      let bar = system_get_loading_bar(c)
      let img = system_get_image(c).imgs[0]

      let buf = /** @type {Graphics} */ (createGraphics(img.width, img.height))
      buf.fill('white')
      buf.rect(0, 0, buf.width * bar.progress, buf.height)

      system_get_image(c).imgs = [ buf.get() ]

      if (bar.progress >= 1) {
        bar.on_finished()
      }
    })
  }
}

class LoadingLevel extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new LoadingBar(),
      ])
    ]
    this.levels_loaded = 0
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let loading_bars = r[0]

    loading_bars.forEach(c => {
      let bar = system_get_loading_bar(c)

      if (this.levels_loaded < levels.length) {
        sprite_manager.add_imgs(levels[this.levels_loaded].id, create_level_sprite(levels[this.levels_loaded]))
      }
      this.levels_loaded += 1

      bar.progress = this.levels_loaded / levels.length
    })
  }
}
