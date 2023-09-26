/** @typedef {Map<String, Image[]>} SpriteTable */

class SpriteManager {
  constructor() {
    /** @type {SpriteTable} */
    this.sprite_table = new Map()
  }

  /** 
   * @param {String} name
   * @param {Image[]} imgs
   */
  add_sprite(name, imgs) {
    this.sprite_table.set(name, imgs)
  }

  /**
   * @param {String} name 
   * @param {Number} [frame=0] 
   * @returns {Image}
   */
  get_sprite(name, frame = 0) {
    return this.sprite_table.get(name)[frame]
  }
}
