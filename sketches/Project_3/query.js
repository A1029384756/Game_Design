/** @typedef {Component[][]} QueryResult */

class Query {
  /** @param {Component[]} components */
  constructor(components) {
    /** @type {Component[]} */
    this.components = components
    /** @type {QueryResult} */
    this.response = undefined
  }

  /** @param {Registry} registry */
  get_response(registry) {
    if (this.response !== undefined) {
      return this.response
    }

    let selected_components = this.components.map(system_component => {
      return registry.registered_components.get(system_component.name)
    }).filter(c => c !== undefined)

    /** @type {QueryResult} */
    let result = new Array(MAX_ENTITIES)

    for (let i = 0; i < MAX_ENTITIES; i++) {
      if (selected_components.every(entry => entry[i] !== undefined)) {
        result.push(selected_components.map(entry => {
          return entry[i]
        }))
      }
    }

    this.response = result.filter(e => e !== undefined)
    return this.response
  }
}
