/**
 * @param {Vector} a
 * @param {Vector} b
 * @returns {Vector}
 */
function vec_add(a, b) {
  return createVector(a.x + b.x, a.y + b.y, a.z + b.z)
}

/**
 * @param {Vector} a
 * @param {Vector} b
 * @returns {Vector}
 */
function vec_sub(a, b) {
  return createVector(a.x - b.x, a.y - b.y, a.z - b.z)
}

/**
 * @param {Vector} a
 * @returns {Vector}
 */
function vec_normalize(a) {
  let a_new = clone_object(a)
  return a_new.normalize()
}

/**
 * @param {Vector} a
 * @param {Vector} b
 * @returns {Vector}
 */
function vec_mult(a, b) {
  let result = clone_object(a)
  return result.mult(b)
}

/**
 * @param {Vector} a
 * @param {Vector} b
 * @returns {Vector}
 */
function vec_div(a, b) {
  let result = clone_object(a)
  return result.div(b)
}

/**
 * @param {Vector} plane_p
 * @param {Vector} plane_n
 * @param {Vector} line_start
 * @param {Vector} line_end
 */
function vec_plane_intersect(plane_p, plane_n, line_start, line_end) {
  plane_n.normalize()
  let plane_d = plane_n.dot(plane_p)
  let ad = line_start.dot(plane_n)
  let bd = line_end.dot(plane_n)

  let t = (-plane_d - ad) / (bd - ad)
  let line_start_to_end = vec_sub(line_end, line_start)
  let line_to_intersect = vec_mult(line_start_to_end, createVector(t, t, t))
  return vec_add(line_start, line_to_intersect)
}
