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
      if (selected_components.every(entry => entry.has(e))) {
        result.set(e, selected_components.map(entry => entry.get(e)))
      }
    })

    this.response = result
    return this.response
  }
}
