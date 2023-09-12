/** @typedef {Map<Entity, Component[]>} QueryResponse */

class Query {
  /** @param {Component[]} components */
  constructor(components) {
    /** @type {Component[]} */
    this.components = components
    /** @type {QueryResponse} */
    this.response = undefined
  }

  /** 
   * @param {Registry} registry 
   * @returns QueryResponse
   */
  get_response(registry) {
    if (this.response !== undefined) {
      return this.response
    }

    let selected_components = this.components.map(system_component => {
      return registry.registered_components.get(system_component.name)
    }).filter(c => c !== undefined)

    /** @type {Entity[]} */
    let entities = selected_components.reduce((accum, id) => [...accum, ...id.keys()], [])

    let result = new Map()
    entities.forEach(e => {
      let components = []
      for (let i = 0; i < selected_components.length; i++) {
        if (selected_components[i].has(e)) {
          components.push(selected_components[i].get(e))
        } else {
          return
        }
      }
      result.set(e, components)
    })

    this.response = result
    return this.response
  }
}
