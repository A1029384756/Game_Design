/** @typedef {Map<String, Sprite>} SpriteTable */

class SpriteManager {
  constructor() {
    /** @type {SpriteTable} */
    this.sprite_table = new Map()
  }

  /** 
   * @param {String} name
   * @param {Image} img 
   * @param {Number} frame_count
   */
  add_sprite(name, img, frame_count = 1) {
    let images = /** @type {Image[]} */ ([])
    for (let i = 0; i < frame_count; i++) {
      images.push(img.get(0, (img.height / frame_count) * i,
        img.width,
        img.height / frame_count))
    }
    this.sprite_table.set(name, new Sprite(images))
  }

  /**
   * @param {String} name 
   * @returns {Sprite}
   */
  get_sprite(name) {
    return this.sprite_table.get(name)
  }
}
