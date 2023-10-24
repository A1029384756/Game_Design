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
      images.push(img.get(
        (img.width / frame_count) * i, 0,
        img.width / frame_count,
        img.height)
      )
    }
    this.sprite_table.set(name, new Sprite(images))
  }

  /**
   * @param {String} name
   * @param {Image[]} imgs
   */
  add_spritesheet(name, imgs) {
    this.sprite_table.set(name, new Sprite(imgs))
  }

  /**
   * @param {String} name 
   * @returns {Sprite}
   */
  get_sprite(name) {
    return this.sprite_table.get(name)
  }

  /**
   * @param {String} name
   * @returns {Image[]}
   */
  get_sprite_imgs(name) {
    return this.sprite_table.get(name).imgs
  }
}
