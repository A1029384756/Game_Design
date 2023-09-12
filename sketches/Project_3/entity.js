/**
 * @typedef {String} Entity
 * @typedef {Map<Entity, Component>} Entry
 */

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
    this.entity_count++
  }

  /** @param {Entity} entity */
  despawn_entity(entity) {
    this.registered_components.forEach(entry => {
      entry.delete(entity)
    })
    this.entity_count--
  }
}
