/**
 * @typedef {String} Entity
 * @typedef {Map<String, Component>} Entry
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
      s.work(s.query.get_response(this.component_registry))
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
}

class Registry {
  constructor() {
    /** @type {Map<String, Entry>} */
    this.registered_components = new Map()
    /** @type {Number} */
    this.entity_count = 0
    /** @type {IdGenerator} */
    this.id_generator = new IdGenerator()
  }

  /** @param {Component} c */
  register_component(c) {
    if (!this.registered_components.has(c.name)) {
      this.registered_components.set(c.name, new Map())
    }
  }

  /** @param {Component[]} components */
  spawn_entity(components) {
    let entity_id = this.id_generator.create_id()
    components.forEach(c => {
      this.registered_components
        .get(c.name)
        .set(entity_id, c)
    })
  }

  /** @param {Entity} entity */
  despawn_entity(entity) {
    this.registered_components.forEach((c, e) => {
      if (e === entity) {
        c.delete(e)
      }
    })
  }
}
