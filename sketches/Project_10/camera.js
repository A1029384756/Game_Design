class Camera extends Component { }
class Wireframe extends Component { }

class RotateMesh extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Mesh(),
        new Transform(),
      ]),
      new Query([
        new Camera(),
        new Transform(),
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let dx = 0, dy = 0
    if (mouseIsPressed && mouseButton == LEFT) {
      dx = mouseX - pmouseX
      dy = mouseY - pmouseY
      dx /= 40
      dy /= 40
    }

    r[0].forEach(c => {
      let transform = system_get_transform(c)

      transform.dir.y -= dx
    })
    r[1].forEach(c => {
      let transform = system_get_transform(c)
      transform.dir.x -= dy
    })
  }
}

class MeshWireframe extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Mesh(),
        new Transform(),
      ], [
        new Wireframe()
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let dragging = mouseIsPressed && mouseButton == LEFT

    r[0].forEach((_, id) => {
      if (dragging) {
        game_controller.world.add_components(id, [
          new Wireframe()
        ])
      }
    })
  }
}

class MeshSolid extends System {
  constructor() {
    super()
    this.query_set = [
      new Query([
        new Mesh(),
        new Transform(),
        new Wireframe()
      ]),
    ]
  }

  /**
   * @param {QueryResponse[]} r
   */
  work(r) {
    let dragging = mouseIsPressed && mouseButton == LEFT

    r[0].forEach((_, id) => {
      if (!dragging) {
        game_controller.world.remove_components(id, [
          new Wireframe()
        ])
      }
    })
  }
}
