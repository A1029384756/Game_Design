class World {
  constructor() {
    /** @type {Registry} */
    this.registry = new Registry()
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
    system.query_set.forEach(q => {
      q.components.forEach(c => {
        this.registry.register_component(c)
      })
      q.disallowed_components.forEach(c => {
        this.registry.register_component(c)
      })
    })
  }

  /** @param {String} system_name */
  deregister_system(system_name) {
    this.systems = this.systems.filter((sys) => sys.name !== system_name)
  }

  /** 
   * @param {Component[]} components 
   * @returns {Entity}
   */
  spawn_entity(components) {
    let id = this.registry.spawn_entity(components)
    this.systems.forEach(s => {
      s.query_set.forEach(q => {
        if (q.components.every(c =>
          components.some(comp => comp.name === c.name)
        ) && (q.disallowed_components.every(c =>
          !components.some(d_c => d_c.name === c.name)
        ))) {
          q.response.set(id, components)
        }
      })
    })

    return id
  }

  /** @param {Entity} entity */
  despawn_entity(entity) {
    this.registry.despawn_entity(entity)
    this.systems.forEach(s =>
      s.query_set.forEach(q => {
        if (q.response.has(entity)) {
          q.response.delete(entity)
        }
      }))
  }

  /** 
   * @param {Entity} entity 
   * @param {Component[]} components
   */
  add_components(entity, components) {
    this.registry.add_components(entity, components)
    this.systems.forEach(s =>
      s.query_set.forEach(q => {
        if (q.response.has(entity)) {
          q.response.delete(entity)
        }
      }))

    /** @type {Component[]} */
    let updated_components = []
    this.registry.registry.forEach(e => {
      if (e.has(entity)) {
        updated_components.push(e.get(entity))
      }
    })

    this.systems.forEach(s => {
      s.query_set.forEach(q => {
        if (q.components.every(c =>
          updated_components.some(comp => comp.name === c.name)
        ) && q.disallowed_components.every(c =>
          !updated_components.some(d_c => d_c.name === c.name)
        )) {
          q.response.set(entity, updated_components)
        }
      })
    })
  }

  /** 
   * @param {Entity} entity 
   * @param {Component[]} components
   */
  remove_components(entity, components) {
    this.registry.remove_components(entity, components)
    this.systems.forEach(s =>
      s.query_set.forEach(q => {
        if (q.response.has(entity)) {
          q.response.delete(entity)
        }
      }))

    /** @type {Component[]} */
    let updated_components = []
    this.registry.registry.forEach(e => {
      if (e.has(entity)) {
        updated_components.push(e.get(entity))
      }
    })

    if (updated_components.length == 0) {
      return
    }

    this.systems.forEach(s => {
      s.query_set.forEach(q => {
        if (q.components.every(c =>
          updated_components.some(comp => comp.name === c.name)
        ) && (q.disallowed_components.every(c =>
          !updated_components.some(d_c => d_c.name === c.name)
        ))) {
          q.response.set(entity, updated_components)
        }
      })
    })
  }
}
