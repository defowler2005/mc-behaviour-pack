import { world } from '@minecraft/server';

/**
 * A class for interacting with a database.
 * @class
 */
class databaseBuilder {
  /**
   * Constructs a new databaseBuilder instance.
   * @constructor
   */
  constructor() { }

  /**
   * Sets a dynamic property in the world.
   * @param {String} key - The key for the dynamic property.
   * @param {Number|Boolean|String} value - The value to be stored.
   */
  set(key, value) {
    world.setDynamicProperty(key, value);
  }

  /**
   * Gets the value of a dynamic property from the world.
   * @param {String} key - The key for the dynamic property.
   * @returns {Number|Boolean|String|Null} The value of the dynamic property, or null if it doesn't exist.
   */
  get(key) {
    const dynamicProperty = world.getDynamicProperty(key);
    if (dynamicProperty === undefined) console.warn(`Dynamic property: ${key} does not exist!`);
    return dynamicProperty;
  }

  /**
   * Deletes a dynamic property from the world.
   * @param {String} key - The key for the dynamic property.
   */
  delete(key) {
    if (world.getDynamicProperty(key) === undefined) {
      console.warn(`Dynamic property: ${key} does not exist!`);
    } else world.setDynamicProperty(key, undefined);
  }
}

export const databaseBuild = new databaseBuilder();