/**
 * @typedef {String} Entity
 * @typedef {Map<Entity, Component>} Entry
 */

class Registry {
  constructor() {
    /** @type {Map<String, Entry>} */
    this.registry = new Map()
    /** @type {Number} */
    this.entity_count = 0
    /** @type {IdGenerator} */
    this.id_generator = new IdGenerator()
  }

  /** @param {Component} c */
  register_component(c) {
    if (!this.registry.has(c.name)) {
      this.registry.set(c.name, new Map())
    }
  }

  /** 
   * @param {Component[]} components 
   * @returns {Entity} the id of the newly created entity
   */
  spawn_entity(components) {
    let entity_id = this.id_generator.create_id()
    components.forEach(c => {
      if (this.registry.get(c.name) !== undefined) {
        this.registry
          .get(c.name)
          .set(entity_id, c)
      }
    })
    this.entity_count++
    return entity_id
  }

  /** @param {Entity} entity */
  despawn_entity(entity) {
    this.registry.forEach(entry => {
      entry.delete(entity)
    })
    this.entity_count--
  }

  /** 
   * @param {Entity} entity 
   * @param {Component[]} components
   */
  add_components(entity, components) {
    components.forEach(c => {
      if (this.registry.get(c.name) !== undefined) {
        this.registry.get(c.name).set(entity, c)
      }
    })
  }

  /** 
   * @param {Entity} entity 
   * @param {Component[]} components
   */
  remove_components(entity, components) {
    components.forEach(c => {
      if (this.registry.get(c.name)) {
        this.registry.get(c.name).delete(entity)
      }
    })
  }
}
