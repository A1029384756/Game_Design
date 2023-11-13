class Matrix4x4 {
  constructor() {
    this.m = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  }

  /**
   * @param {Matrix4x4} m 
   * @param {Vector} i
   * @returns {Vector}
   */
  static multiply_vector(m, i) {
    let x = i.x * m.m[0][0] + i.y * m.m[1][0] + i.z * m.m[2][0] + m.m[3][0]
    let y = i.x * m.m[0][1] + i.y * m.m[1][1] + i.z * m.m[2][1] + m.m[3][1]
    let z = i.x * m.m[0][2] + i.y * m.m[1][2] + i.z * m.m[2][2] + m.m[3][2]
    let w = i.x * m.m[0][3] + i.y * m.m[1][3] + i.z * m.m[2][3] + m.m[3][3]

    if (w != 0.0) {
      x /= w
      y /= w
      z /= w
    }

    return createVector(x, y, z)
  }

  /** @returns {Matrix4x4} */
  static make_identity() {
    let m = new Matrix4x4()
    m.m[0][0] = 1.0
    m.m[1][1] = 1.0
    m.m[2][2] = 1.0
    m.m[3][3] = 1.0
    return m
  }

  /** 
   * @param {Number} angle
   * @returns {Matrix4x4} 
   */
  static make_rot_x(angle) {
    let m = new Matrix4x4()
    m.m[0][0] = 1.0
    m.m[1][1] = cos(angle)
    m.m[1][2] = sin(angle)
    m.m[2][1] = -sin(angle)
    m.m[2][2] = cos(angle)
    m.m[3][3] = 1.0
    return m
  }

  /** 
   * @param {Number} angle
   * @returns {Matrix4x4} 
   */
  static make_rot_y(angle) {
    let m = new Matrix4x4()
    m.m[0][0] = cos(angle)
    m.m[0][2] = sin(angle)
    m.m[2][0] = -sin(angle)
    m.m[1][1] = 1.0
    m.m[2][2] = cos(angle)
    m.m[3][3] = 1.0
    return m
  }

  /** 
   * @param {Number} angle
   * @returns {Matrix4x4} 
   */
  static make_rot_z(angle) {
    let m = new Matrix4x4()
    m.m[0][0] = cos(angle)
    m.m[0][1] = sin(angle)
    m.m[1][0] = -sin(angle)
    m.m[1][1] = cos(angle)
    m.m[2][2] = 1.0
    m.m[3][3] = 1.0
    return m
  }

  /** 
   * @param {Vector} t 
   * @returns {Matrix4x4} 
   */
  static make_translation(t) {
    let m = new Matrix4x4()
    m.m[0][0] = 1.0
    m.m[1][1] = 1.0
    m.m[2][2] = 1.0
    m.m[3][3] = 1.0
    m.m[3][0] = t.x
    m.m[3][1] = t.y
    m.m[3][2] = t.z
    return m
  }

  /** 
   * @param {Vector} pos 
   * @param {Vector} target 
   * @param {Vector} up 
   * @returns {Matrix4x4} 
   */
  static point_at(pos, target, up) {
    let forward = vec_sub(target, pos).normalize()
    let updated_up = vec_sub(up, clone_object(forward).mult(forward.dot(up))).normalize()
    let right = updated_up.cross(forward)

    let m = new Matrix4x4()
    m.m[0][0] = right.x
    m.m[0][1] = right.y
    m.m[0][2] = right.z
    m.m[1][0] = updated_up.x
    m.m[1][1] = updated_up.y
    m.m[1][2] = updated_up.z
    m.m[2][0] = forward.x
    m.m[2][1] = forward.y
    m.m[2][2] = forward.z
    m.m[3][0] = pos.x
    m.m[3][1] = pos.y
    m.m[3][2] = pos.z
    return m
  }

  /** 
   * @param {Matrix4x4} m 
   * @returns {Matrix4x4} 
   */
  static quick_invert(m) {
    let matrix = new Matrix4x4()
    matrix.m[0][0] = m.m[0][0]
    matrix.m[0][1] = m.m[1][0]
    matrix.m[0][2] = m.m[2][0]
    matrix.m[0][3] = 0.0
    matrix.m[1][0] = m.m[0][1]
    matrix.m[1][1] = m.m[1][1]
    matrix.m[1][2] = m.m[2][1]
    matrix.m[1][3] = 0.0
    matrix.m[2][0] = m.m[0][2]
    matrix.m[2][1] = m.m[1][2]
    matrix.m[2][2] = m.m[2][2]
    matrix.m[2][3] = 0.0
    matrix.m[3][0] = -(m.m[3][0] * matrix.m[0][0] + matrix.m[3][1] * m.m[1][0] + m.m[3][2] * matrix.m[2][0])
    matrix.m[3][1] = -(m.m[3][0] * matrix.m[0][1] + matrix.m[3][1] * m.m[1][1] + m.m[3][2] * matrix.m[2][1])
    matrix.m[3][2] = -(m.m[3][0] * matrix.m[0][2] + matrix.m[3][1] * m.m[1][2] + m.m[3][2] * matrix.m[2][2])
    matrix.m[3][3] = 1.0
    return matrix
  }

  /**
   * @param {Matrix4x4} m1
   * @param {Matrix4x4} m2
   * @returns {Matrix4x4}
   */
  static multiply_matrix(m1, m2) {
    let matrix = new Matrix4x4()
    for (let c = 0; c < 4; c += 1) {
      for (let r = 0; r < 4; r += 1) {
        matrix.m[r][c] = m1.m[r][0] * m2.m[0][c] + m1.m[r][1] * m2.m[1][c] + m1.m[r][2] * m2.m[2][c] + m1.m[r][3] * m2.m[3][c]
      }
    }
    return matrix
  }
}
