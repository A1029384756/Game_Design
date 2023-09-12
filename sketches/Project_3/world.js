class World {
  constructor() {
    /** @type {Registry} */
    this.component_registry = new Registry()
    /** @type {System[]} */
    this.systems = []
  }

  update() {
    this.systems.forEach(s => {
      s.work(s.query_set.map(q => q.response))
    })
  }

  /** @param {System} system */
  register_system(system) {
    this.systems.push(system)
    system.query_set.forEach(q => q.components.forEach(c => {
      this.component_registry.register_component(c)
    }))
  }

  /** @param {Component[]} components */
  spawn_entity(components) {
    let id = this.component_registry.spawn_entity(components)
    this.systems.forEach(s => {
      s.query_set.forEach(q => {
        if (q.components.every(c =>
          components.find(comp => comp.name == c.name) !== undefined
        )) {
          q.response.set(id, components)
        }
      })
    })
  }

  /** @param {Entity} entity */
  despawn_entity(entity) {
    this.component_registry.despawn_entity(entity)
    this.systems.forEach(s =>
      s.query_set.forEach(q => {
        if (q.response.has(entity)) {
          q.response.delete(entity)
        }
      }))
  }
}
