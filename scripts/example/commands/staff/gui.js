import { world } from '@minecraft/server';
import { commandBuilder } from '../../../library/build/classes/commandBuilder.js';

/**
 * Array of modules for both staff and players.
 * @type {Array<Object>}
 * @property {String} displayName - The string that the player will see.
 * @property {String} moduleId - The string to be used for the dynamic property.
 * @property {Number} indexId - The number for the index of the module.
 * @property {String} role - The role to indicate what modle is for who.
 */
export const modulesList = [
    {
        displayName: 'Chat ranks',
        moduleId: 'chat_ranks',
        role: 'staff',
        indexId: 0,
    }
];

/**
 * The GUI object containing all menus.
 * @type {Object}
 * @property {Object} staff - The staff menu object.
 * @property {Object} player - The player menu object.
 * @property {Object} welcome - The welcome menu object.
 */
const gui = {
    staff: {},
    player: {},
    welcome: {}
};