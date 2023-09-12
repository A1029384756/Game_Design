/**
 * @typedef {Component[]} Entry
 */

const MAX_ENTITIES = 10000

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
      this.registered_components.set(c.name, new Array(MAX_ENTITIES).fill(undefined))
    }
  }

  /** @param {Component[]} components */
  spawn_entity(components) {
    let entity_id = this.id_generator.create_id()
    components.forEach(c => {
      this.registered_components
        .get(c.name)[entity_id] = c
    })
    this.entity_count++
  }

  /** @param {Entity} entity */
  despawn_entity(entity) {
    this.registered_components.forEach(entry => {
      entry.forEach((_, e) => {
        if (e === entity) {
          entry[e] = undefined
        }
      })
    })
    this.entity_count--
  }
}
