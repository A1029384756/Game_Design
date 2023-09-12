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
      if (s.query.response === undefined) {
        s.query.get_response(this.component_registry)
      } else {
        s.work(s.query.response)
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
