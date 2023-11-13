class Tri {
  /**
   * @param {Vector} p1 
   * @param {Vector} p2 
   * @param {Vector} p3 
   * @param {[Number, Number, Number]} color
  */
  constructor(p1 = createVector(), p2 = createVector(), p3 = createVector(), color = [255, 255, 255]) {
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this.color = color
  }

  /**
   * @param {Vector} plane_p 
   * @param {Vector} plane_n 
   * @param {Tri} in_tri 
   * @param {Tri} out_tri1
   * @param {Tri} out_tri2
   * @returns {Number}
   */
  static clip_against_plane(plane_p, plane_n, in_tri, out_tri1, out_tri2) {
    plane_n.normalize()

    /** 
     * @param {Vector} p
     * @returns {Number}
     */
    const plane_dist = (p) => {
      return (plane_n.x * p.x + plane_n.y * p.y + plane_n.z * p.z - plane_n.dot(plane_p))
    }

    let inside_pts = /** @type {Vector[]} */ ([])
    let outside_pts = /** @type {Vector[]} */ ([])

    let d0 = plane_dist(in_tri.p1)
    let d1 = plane_dist(in_tri.p2)
    let d2 = plane_dist(in_tri.p3)

    if (d0 >= 0) { inside_pts.push(in_tri.p1) }
    else { outside_pts.push(in_tri.p1) }
    if (d1 >= 0) { inside_pts.push(in_tri.p2) }
    else { outside_pts.push(in_tri.p2) }
    if (d2 >= 0) { inside_pts.push(in_tri.p3) }
    else { outside_pts.push(in_tri.p3) }

    if (inside_pts.length == 0) {
      return 0
    } else if (inside_pts.length == 3) {
      out_tri1.p1 = in_tri.p1
      out_tri1.p2 = in_tri.p2
      out_tri1.p3 = in_tri.p3
      out_tri1.color = in_tri.color
      return 1
    } else if (inside_pts.length == 1 && outside_pts.length == 2) {
      out_tri1.p1 = inside_pts[0]
      out_tri1.p2 = vec_plane_intersect(plane_p, plane_n, inside_pts[0], outside_pts[0])
      out_tri1.p3 = vec_plane_intersect(plane_p, plane_n, inside_pts[0], outside_pts[1])
      out_tri1.color = in_tri.color
      return 1
    } else if (inside_pts.length == 2 && outside_pts.length == 1) {
      out_tri1.p1 = inside_pts[0]
      out_tri1.p2 = inside_pts[1]
      out_tri1.p3 = vec_plane_intersect(plane_p, plane_n, inside_pts[0], outside_pts[0])
      out_tri1.color = in_tri.color

      out_tri2.p1 = inside_pts[1]
      out_tri2.p2 = out_tri1.p3
      out_tri2.p3 = vec_plane_intersect(plane_p, plane_n, inside_pts[1], outside_pts[0])
      out_tri2.color = in_tri.color
      return 2
    }
  }
}

class Mesh extends Component {
  /**
  * @param {Tri[]} tris
  * @param {[Number, Number, Number]} color
  */
  constructor(tris = [], color = [255, 255, 255]) {
    super()
    this.tris = tris.map(t => new Tri(t.p1, t.p2, t.p3, color))
  }
}
