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
     * Sets a dynamic property in the Minecraft server world.
     * @param {String} key - The key for the dynamic property.
     * @param {Number|Boolean|String} value - The value to be stored.
     */
    set(key, value) {
        world.setDynamicProperty(`${key}`, value);
    }

    /**
     * Gets the value of a dynamic property from the Minecraft server world.
     * @param {String} key - The key for the dynamic property.
     * @returns {Number|Boolean|String|Null} The value of the dynamic property, or Null if it doesn't exist.
     */
    get(key) {
        if (!world.getDynamicProperty(`${key}`)) {
            //console.warn(`Dynamic property: ${key} does not exist!`);
            return Null;
        } return world.getDynamicProperty(`${key}`);
    }

    /**
     * Deletes a dynamic property from the Minecraft server world.
     * @param {String} key - The key for the dynamic property.
     */
    delete(key) {
        if (!world.getDynamicProperty(`${key}`)) return console.warn(`Dynamic property: ${key} does not exist!`);
        world.setDynamicProperty(`${key}`, undefined);
    }
};

export const databaseBuild = new databaseBuilder();