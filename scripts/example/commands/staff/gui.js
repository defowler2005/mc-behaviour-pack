import { world } from '@minecraft/server';
import { commandBuild } from '../../../library/build/classes/commandBuilder.js';

/**
 * Array of modules for both staff and players.
 * @type {Array<Object>}
 * @property {String} displayName - The string that the player will see.
 * @property {String} moduleId - The string to be used for the dynamic property.
 * @property {Number} indexId - The number for the index of the module.
 */
export const staffModulesList = [
    {
        displayName: 'Chat commands',
        moduleId: 'module:chat_commands',
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

export const gui = {
    staff: {
        main: (player) => { }
    },
    player: {
        main: (player) => { }
    },
    welcome: {
        main: (player) => { }
    }
};

commandBuild.create(
    {
        name: 'gui',
        description: 'The interactive UI',
        is_staff: false
    }, (player) => {
        player.sendMessage('§2Move to show the UI.')
    }, (player) => {
        if (player.hasTag('staff')) return gui.staff.main(player);
        else if (player.hasTag('welcome')) return gui.welcome.main(player);
        else gui.player.main(player);
    }
);