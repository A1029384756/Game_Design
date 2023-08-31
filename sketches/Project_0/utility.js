/**
 * A container class to structure a standard 2d vector
 */
class Vec2 {
  /** @param {Number} x
   *  @param {Number} y 
  */
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

/** 
 * Gets the R, G, and B values from a valid RGB string
 * @param {String} color 
 * */
function get_rgb(color) {
  let [r, g, b] = color.replace('rgb(', '')
    .replace(')', '')
    .replace(' ', '')
    .split(',')
    .map(str => Number(str))

  return { r, g, b }
}

/** 
 * Interpolates between two RGB strings given a 't' parameter
 * @param {String} a
 * @param {String} b
 * @param {Number} t
 */
function interpolate_color(a, b, t) {
  const rgb_a = get_rgb(a)
  const rgb_b = get_rgb(b)

  /** @param {String} prop
    * @param {Number} t
    */
  function color_val(prop, t) {
    return Math.round(rgb_a[prop] * (1 - t) + rgb_b[prop] * t)
  }

  return `rgb(${color_val('r', t)}, ${color_val('g', t)}, ${color_val('b', t)})`
}
