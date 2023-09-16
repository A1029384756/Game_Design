/** @typedef {Map<Entity, Component[]>} QueryResponse */

class Query {
  /** 
   * @param {Component[]} components 
   * @param {Component[]} [disallowed_components=[]] 
   */
  constructor(components, disallowed_components = []) {
    /** @type {Component[]} */
    this.components = components
    /** @type {Component[]} */
    this.disallowed_components = disallowed_components
    /** @type {QueryResponse} */
    this.response = new Map() 
  }
}
