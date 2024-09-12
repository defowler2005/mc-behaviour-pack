import { Player, world } from '@minecraft/server';

/**
 * A class for interacting with Dynamic properties in a database-like system.
 */
class DatabaseBuilder {
    /**
     * Constructs a new databaseBuilder instance.
     */
    constructor() { };

    /**
     * Sets a dynamic property in the world or player.
     * @param {string} key - The key for the dynamic property.
     * @param {number | boolean | string} value - The value to be stored.
     * @param {Player} [player] - The player to set the dynamic property for.
     */
    set(key, value, player) {
        try {
            if (player) {
                player.setDynamicProperty(key, value ?? 0);
            } else {
                world.setDynamicProperty(key, value ?? 0);
            }
            // console.warn(`Set module ${key} to ${value}`);
        } catch (error) {
            //console.warn(`An error occurred while setting dynamic property '${key}' in database: ${error}`);
        }
    };

    /**
     * Gets the value of a dynamic property from the world or player.
     * @param {string} key - The key for the dynamic property.
     * @param {Player} [player] - The player to get the dynamic property from.
     * @returns {number | boolean | string | null} The value of the dynamic property, or null if it doesn't exist.
     */
    get(key, player) {
        let value = 0;
        if (player) {
            value = player.getDynamicProperty(key);
        } else {
            value = world.getDynamicProperty(key);
        }

        if (!value) {
            //console.warn(`Dynamic property '${key}' does not exist!`);
            this.set(key, 0, player);
            return 0;
        }; return value;
    };

    /**
     * Deletes a dynamic property from the world or player.
     * @param {string} key - The key for the dynamic property.
     * @param {Player} [player] - The player to delete the dynamic property from.
     */
    delete(key, player) {
        if (player) {
            if (!player.getDynamicProperty(key)) {
                //console.warn(`Dynamic property '${key}' does not exist!`);
                return;
            } else {
                player.setDynamicProperty(key, null);
            }
        } else {
            if (!world.getDynamicProperty(key)) {
                //console.warn(`Dynamic property '${key}' does not exist!`);
                return;
            } else {
                world.setDynamicProperty(key, null);
            }
        }
    }
};

/**
 * A class for interacting with Dynamic properties in a database-like system.
 */
export const Database = new DatabaseBuilder();