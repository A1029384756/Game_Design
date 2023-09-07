/**
 * A container class to structure a standard 2d vector
 */
class Vec2 {
  /** @param {Number} x
   *  @param {Number} y 
  */
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

/** 
 * Gets the R, G, B, and A values from a valid RGBA string
 * @param {String} color 
 * */
function get_rgba(color) {
  let [r, g, b, a] = color.replace('rgba(', '')
    .replace(')', '')
    .replace(' ', '')
    .split(',')
    .map(str => Number(str))

  return { r, g, b, a }
}

/** 
 * Interpolates between two RGB strings given a 't' parameter
 * @param {String} a
 * @param {String} b
 * @param {Number} t
 */
function interpolate_color(a, b, t) {
  const rgba_a = get_rgba(a)
  const rgba_b = get_rgba(b)

  /** @param {String} prop
    * @param {Number} t
    */
  function color_val(prop, t) {
    return Math.round(rgba_a[prop] * (1 - t) + rgba_b[prop] * t)
  }

  return `rgba(${color_val('r', t)}, ${color_val('g', t)}, ${color_val('b', t)}, ${color_val('a', t)})`
}
