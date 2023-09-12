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

    let selected_entries = this.components.map(system_component =>
      registry.registered_components.get(system_component.name)
    )

    /** @type {Entity[]} */
    let entities = selected_entries.reduce((accum, id) => [...accum, ...id.keys()], [])

    let result = new Map()
    entities.forEach(e => {
      if (selected_entries.every(entry => entry.has(e))) {
        result.set(e, selected_entries.map(entry => entry.get(e)))
      }
    })

    this.response = result
    return this.response
  }
}
