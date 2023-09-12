/**
 * @typedef {Number} Entity
 */

class World {
  constructor() {
    /** @type {Registry} */
    this.component_registry = new Registry()
    /** @type {System[]} */
    this.systems = []
  }

  update() {
    this.systems.forEach(s => {
      if (s.response !== undefined) {
        s.work(s.response)
      } else {
        let query = s.query.get_response(this.component_registry)
        s.response = query
        s.work(s.response)
      }
    })
  }

  /** @param {System} system */
  register_system(system) {
    this.systems.push(system)
    system.query.components.forEach(c => {
      this.component_registry.register_component(c)
    })
  }

  /** @param {Component[]} components */
  spawn_entity(components) {
    this.component_registry.spawn_entity(components)
  }

  /** @param {Entity} entity */
  despawn_entity(entity) {
    this.component_registry.despawn_entity(entity)
  }
}
