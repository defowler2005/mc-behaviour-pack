import { world } from '@minecraft/server';
import { commandBuild } from '../../../library/build/classes/commandBuilder.js';
import { ButtonFormData } from '../../../library/build/classes/buttonFormData.js';

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
        main: (player) => {
            const main = new ButtonFormData(player);
            main.create(
                {
                    title: 'Title',
                    body: [
                        ['Body'],
                        ['Body483']
                    ],
                    buttons: [
                        ['Button1', 'textures/ui/gear']
                    ],
                }, (result) => {
                    console.warn('Result1')
                }
            )
        }
    },
    player: {
        main: (player) => {
            console.warn('Player main!');
        }
    },
    welcome: {
        main: (player) => {
            console.warn('Welcome main!');
        }
    }
};

commandBuild.create(
    {
        name: 'gui',
        description: 'The interactive UI',
        is_staff: false
    }, (player) => {
        player.sendMessage('§2Move to show the UI.');
    }, (player) => {
        if (player.hasTag('staff')) gui.staff.main(player);
        else if (!player.hasTag('welcome')) {
            gui.welcome.main(player);
            player.addTag('welcome');
        } else gui.player.main(player);
    }
);