/** @typedef {Map<Entity, Component[]>} QueryResponse */

class Query {
  /** @param {Component[]} components */
  constructor(components) {
    /** @type {Component[]} */
    this.components = components
    /** @type {QueryResponse} */
    this.response = new Map() 
  }
}
