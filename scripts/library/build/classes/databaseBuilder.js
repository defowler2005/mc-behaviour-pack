import { world } from '@minecraft/server';

/**
 * A class for interacting with Dynamic properties in a database-like system.
 */
class DatabaseBuilder {
    /**
     * Constructs a new DatabaseBuilder instance.
     */
    constructor() { }

    /**
     * Sets a dynamic property in the world.
     * @param {string} key - The key for the dynamic property.
     * @param {number | boolean | string} value - The value to be stored.
     */
    set(key, value) {
        try {
            world.setDynamicProperty(key, value ?? 0);
           console.warn(`Set module ${key} to ${value}`);
        } catch (error) {
            //console.warn(`An error occurred while setting dynamic property '${key}' in database: ${error}`);
        }
    }

    /**
     * Gets the value of a dynamic property from the world.
     * @param {string} key - The key for the dynamic property.
     * @returns {number | boolean | string | null} The value of the dynamic property, or null if it doesn't exist.
     */
    get(key) {
        let value = world.getDynamicProperty(key);
        if (value === undefined || value === null) {
            //console.warn(`Dynamic property '${key}' does not exist!`);
            this.set(key, 0);
            return 0;
        }
        return value;
    };

    /**
     * Deletes a dynamic property from the world.
     * @param {string} key - The key for the dynamic property.
     */
    delete(key) {
        if (!world.getDynamicProperty(key)) {
            //console.warn(`Dynamic property '${key}' does not exist!`);
            return;
        }
    };
};

export const Database = new DatabaseBuilder();