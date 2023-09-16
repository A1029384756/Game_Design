/**
 * @param {Vector} [v=createVector()] 
 */
function copy_vector(v = createVector()) {
  return createVector(v.x, v.y, v.z)
}
