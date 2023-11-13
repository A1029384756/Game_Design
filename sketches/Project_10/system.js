class System {
  constructor() {
    /** @type {String} */
    this.name = this.constructor.name
    /** @type {Query[]} */
    this.query_set = [new Query([])]
  }

  /**
   * @param {QueryResponse[]} _
  */
  work(_) { }
}

class RenderMeshes extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Mesh(),
        new Transform()
      ], [
        new Wireframe(),
      ]),
      new Query([
        new Camera(),
        new Transform()
      ])
    ]

    let near = 0.1
    let far = 1000.0
    let fov = 90.0
    let aspect_ratio = CANVAS_WIDTH / CANVAS_HEIGHT
    let fov_rad = 1.0 / tan(fov * 0.5 / 180.0 * PI)

    this.projection_matrix = new Matrix4x4()
    this.projection_matrix.m[0][0] = aspect_ratio * fov_rad
    this.projection_matrix.m[1][1] = fov_rad
    this.projection_matrix.m[2][2] = far / (far - near)
    this.projection_matrix.m[3][2] = (-far * near) / (far - near)
    this.projection_matrix.m[2][3] = 1.0
    this.projection_matrix.m[3][3] = 0.0
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let camera_transform = system_get_transform(r[1].values().next().value)

    let mat_rot_z = Matrix4x4.make_rot_z(camera_transform.dir.z)
    let mat_rot_x = Matrix4x4.make_rot_x(camera_transform.dir.x)

    let mat_trans = Matrix4x4.make_translation(createVector(0.0, 0.0, 0.0))

    let mat_world = Matrix4x4.make_identity()
    mat_world = Matrix4x4.multiply_matrix(mat_rot_z, mat_rot_x)
    mat_world = Matrix4x4.multiply_matrix(mat_world, mat_trans)

    let v_up = /** @type {Vector} */ (createVector(0, 1, 0))
    let v_target = /** @type {Vector} */ (createVector(0, 0, 1))

    let mat_cam_rot = Matrix4x4.make_rot_y(camera_transform.dir.y)
    let look_dir = Matrix4x4.multiply_vector(mat_cam_rot, v_target)
    v_target = vec_add(camera_transform.pos, look_dir)
    let mat_camera = Matrix4x4.point_at(camera_transform.pos, v_target, v_up)

    let mat_view = Matrix4x4.quick_invert(mat_camera)

    let tris_to_raster = /** @type {[Tri, Number][]} */ ([])

    r[0].forEach(m => {
      let tris = system_get_mesh(m).tris
      let transform = system_get_transform(m)
      let mesh_rot_z = Matrix4x4.make_rot_z(transform.dir.z)
      let mesh_rot_x = Matrix4x4.make_rot_x(transform.dir.x)
      let mesh_rot_y = Matrix4x4.make_rot_y(transform.dir.y)

      let mesh_mat = Matrix4x4.make_identity()
      mesh_mat = Matrix4x4.multiply_matrix(mesh_rot_z, mesh_rot_x)
      mesh_mat = Matrix4x4.multiply_matrix(mesh_mat, mesh_rot_y)
      mesh_mat = Matrix4x4.multiply_matrix(mesh_mat, mat_world)

      tris.forEach(t => {
        let tri_transformed = new Tri()
        tri_transformed.p1 = Matrix4x4.multiply_vector(mesh_mat, vec_add(t.p1, transform.pos))
        tri_transformed.p2 = Matrix4x4.multiply_vector(mesh_mat, vec_add(t.p2, transform.pos))
        tri_transformed.p3 = Matrix4x4.multiply_vector(mesh_mat, vec_add(t.p3, transform.pos))

        let line_1 = vec_sub(tri_transformed.p2, tri_transformed.p1)
        let line_2 = vec_sub(tri_transformed.p3, tri_transformed.p1)
        let normal = line_1.cross(line_2).normalize()

        if (normal.dot(vec_sub(tri_transformed.p1, camera_transform.pos)) < 0) {
          let light_dir = /** @type {Vector} */ (createVector(0, 0, -1)).normalize()
          let light_dp = light_dir.dot(normal)

          let tri_viewed = new Tri()
          tri_viewed.p1 = Matrix4x4.multiply_vector(mat_view, tri_transformed.p1)
          tri_viewed.p2 = Matrix4x4.multiply_vector(mat_view, tri_transformed.p2)
          tri_viewed.p3 = Matrix4x4.multiply_vector(mat_view, tri_transformed.p3)

          let clipped = [new Tri(), new Tri()]
          let n_clipped_tris = Tri.clip_against_plane(createVector(0, 0, 0.1), createVector(0, 0, 1), tri_viewed, clipped[0], clipped[1])

          for (let n = 0; n < n_clipped_tris; n += 1) {
            let tri_projected = new Tri()
            tri_projected.p1 = Matrix4x4.multiply_vector(this.projection_matrix, clipped[n].p1)
            tri_projected.p2 = Matrix4x4.multiply_vector(this.projection_matrix, clipped[n].p2)
            tri_projected.p3 = Matrix4x4.multiply_vector(this.projection_matrix, clipped[n].p3)

            tri_projected.p1.x *= -1
            tri_projected.p2.x *= -1
            tri_projected.p3.x *= -1
            tri_projected.p1.y *= -1
            tri_projected.p2.y *= -1
            tri_projected.p3.y *= -1

            let offset_view = /** @type {Vector} */ (createVector(1, 1, 0))
            tri_projected.p1 = vec_add(tri_projected.p1, offset_view)
            tri_projected.p2 = vec_add(tri_projected.p2, offset_view)
            tri_projected.p3 = vec_add(tri_projected.p3, offset_view)

            tri_projected.p1.mult(createVector(0.5 * CANVAS_WIDTH, 0.5 * CANVAS_HEIGHT, 1))
            tri_projected.p2.mult(createVector(0.5 * CANVAS_WIDTH, 0.5 * CANVAS_HEIGHT, 1))
            tri_projected.p3.mult(createVector(0.5 * CANVAS_WIDTH, 0.5 * CANVAS_HEIGHT, 1))
            tri_projected.color = t.color

            tris_to_raster.push([tri_projected, light_dp])
          }
        }
      })
    })

    tris_to_raster.sort((a, b) => {
      let z1 = a[0].p1.z + a[0].p2.z + a[0].p3.z
      let z2 = b[0].p1.z + b[0].p2.z + b[0].p3.z
      return z2 - z1
    })

    for (let [tri_to_raster, light_dp] of tris_to_raster) {
      let clipped = [new Tri(), new Tri()]
      let list_tris = /** @type {Tri[]} */ ([])

      list_tris.push(tri_to_raster)
      let new_tris = 1

      for (let p = 0; p < 4; p += 1) {
        let tris_to_add = 0
        while (new_tris > 0) {
          let test = list_tris.shift()
          new_tris -= 1

          switch (p) {
            case 0:
              tris_to_add = Tri.clip_against_plane(createVector(0, 0, 0), createVector(0, 1, 0), test, clipped[0], clipped[1])
              break
            case 1:
              tris_to_add = Tri.clip_against_plane(createVector(0, CANVAS_HEIGHT - 1, 0), createVector(0, -1, 0), test, clipped[0], clipped[1])
              break
            case 2:
              tris_to_add = Tri.clip_against_plane(createVector(0, 0, 0), createVector(1, 0, 0), test, clipped[0], clipped[1])
              break
            case 3:
              tris_to_add = Tri.clip_against_plane(createVector(CANVAS_WIDTH - 1, 0, 0), createVector(-1, 0, 0), test, clipped[0], clipped[1])
              break
          }

          for (let w = 0; w < tris_to_add; w += 1) {
            list_tris.push(clipped[w])
          }
        }
        new_tris = list_tris.length
      }

      for (let tri of list_tris) {
        draw_tri(
          tri.p1.x,
          tri.p1.y,
          tri.p2.x,
          tri.p2.y,
          tri.p3.x,
          tri.p3.y,
          [
            tri.color[0] * light_dp,
            tri.color[1] * light_dp,
            tri.color[2] * light_dp,
          ],
        )
      }
    }
  }
}

/**
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x3
 * @param {Number} y3
 * @param {[Number, Number, Number]} color
 */
const draw_tri = (x1, y1, x2, y2, x3, y3, color = [255, 255, 255]) => {
  game_controller.game_buffer.stroke(color)
  game_controller.game_buffer.strokeWeight(1)
  game_controller.game_buffer.fill(color)
  game_controller.game_buffer.triangle(x1, y1, x2, y2, x3, y3)
}


class RenderWireFrames extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Mesh(),
        new Transform(),
        new Wireframe(),
      ]),
      new Query([
        new Camera(),
        new Transform()
      ])
    ]

    let near = 0.1
    let far = 1000.0
    let fov = 90.0
    let aspect_ratio = CANVAS_WIDTH / CANVAS_HEIGHT
    let fov_rad = 1.0 / tan(fov * 0.5 / 180.0 * PI)

    this.projection_matrix = new Matrix4x4()
    this.projection_matrix.m[0][0] = aspect_ratio * fov_rad
    this.projection_matrix.m[1][1] = fov_rad
    this.projection_matrix.m[2][2] = far / (far - near)
    this.projection_matrix.m[3][2] = (-far * near) / (far - near)
    this.projection_matrix.m[2][3] = 1.0
    this.projection_matrix.m[3][3] = 0.0
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let camera_transform = system_get_transform(r[1].values().next().value)

    let mat_rot_z = Matrix4x4.make_rot_z(camera_transform.dir.z)
    let mat_rot_x = Matrix4x4.make_rot_x(camera_transform.dir.x)

    let mat_trans = Matrix4x4.make_translation(createVector(0.0, 0.0, 0.0))

    let mat_world = Matrix4x4.make_identity()
    mat_world = Matrix4x4.multiply_matrix(mat_rot_z, mat_rot_x)
    mat_world = Matrix4x4.multiply_matrix(mat_world, mat_trans)

    let v_up = /** @type {Vector} */ (createVector(0, 1, 0))
    let v_target = /** @type {Vector} */ (createVector(0, 0, 1))

    let mat_cam_rot = Matrix4x4.make_rot_y(camera_transform.dir.y)
    let look_dir = Matrix4x4.multiply_vector(mat_cam_rot, v_target)
    v_target = vec_add(camera_transform.pos, look_dir)
    let mat_camera = Matrix4x4.point_at(camera_transform.pos, v_target, v_up)

    let mat_view = Matrix4x4.quick_invert(mat_camera)

    r[0].forEach(m => {
      let tris = system_get_mesh(m).tris
      let transform = system_get_transform(m)
      let mesh_rot_z = Matrix4x4.make_rot_z(transform.dir.z)
      let mesh_rot_x = Matrix4x4.make_rot_x(transform.dir.x)
      let mesh_rot_y = Matrix4x4.make_rot_y(transform.dir.y)

      let mesh_mat = Matrix4x4.make_identity()
      mesh_mat = Matrix4x4.multiply_matrix(mesh_rot_z, mesh_rot_x)
      mesh_mat = Matrix4x4.multiply_matrix(mesh_mat, mesh_rot_y)
      mesh_mat = Matrix4x4.multiply_matrix(mesh_mat, mat_world)

      tris.forEach(t => {
        let tri_transformed = new Tri()
        tri_transformed.p1 = Matrix4x4.multiply_vector(mesh_mat, vec_add(t.p1, transform.pos))
        tri_transformed.p2 = Matrix4x4.multiply_vector(mesh_mat, vec_add(t.p2, transform.pos))
        tri_transformed.p3 = Matrix4x4.multiply_vector(mesh_mat, vec_add(t.p3, transform.pos))

        let tri_viewed = new Tri()
        tri_viewed.p1 = Matrix4x4.multiply_vector(mat_view, tri_transformed.p1)
        tri_viewed.p2 = Matrix4x4.multiply_vector(mat_view, tri_transformed.p2)
        tri_viewed.p3 = Matrix4x4.multiply_vector(mat_view, tri_transformed.p3)

        let clipped = [new Tri(), new Tri()]
        let n_clipped_tris = Tri.clip_against_plane(createVector(0, 0, 0.1), createVector(0, 0, 1), tri_viewed, clipped[0], clipped[1])

        for (let n = 0; n < n_clipped_tris; n += 1) {
          let tri_projected = new Tri()
          tri_projected.p1 = Matrix4x4.multiply_vector(this.projection_matrix, clipped[n].p1)
          tri_projected.p2 = Matrix4x4.multiply_vector(this.projection_matrix, clipped[n].p2)
          tri_projected.p3 = Matrix4x4.multiply_vector(this.projection_matrix, clipped[n].p3)

          tri_projected.p1.x *= -1
          tri_projected.p2.x *= -1
          tri_projected.p3.x *= -1
          tri_projected.p1.y *= -1
          tri_projected.p2.y *= -1
          tri_projected.p3.y *= -1

          let offset_view = /** @type {Vector} */ (createVector(1, 1, 0))
          tri_projected.p1 = vec_add(tri_projected.p1, offset_view)
          tri_projected.p2 = vec_add(tri_projected.p2, offset_view)
          tri_projected.p3 = vec_add(tri_projected.p3, offset_view)

          tri_projected.p1.mult(createVector(0.5 * CANVAS_WIDTH, 0.5 * CANVAS_HEIGHT, 1))
          tri_projected.p2.mult(createVector(0.5 * CANVAS_WIDTH, 0.5 * CANVAS_HEIGHT, 1))
          tri_projected.p3.mult(createVector(0.5 * CANVAS_WIDTH, 0.5 * CANVAS_HEIGHT, 1))

          draw_wireframe_tri(
            tri_projected.p1.x,
            tri_projected.p1.y,
            tri_projected.p2.x,
            tri_projected.p2.y,
            tri_projected.p3.x,
            tri_projected.p3.y,
          )
        }
      })
    })
  }
}

/**
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x3
 * @param {Number} y3
 */
const draw_wireframe_tri = (x1, y1, x2, y2, x3, y3) => {
  game_controller.game_buffer.stroke('black')
  game_controller.game_buffer.strokeWeight(1)
  game_controller.game_buffer.noFill()
  game_controller.game_buffer.triangle(x1, y1, x2, y2, x3, y3)
}

