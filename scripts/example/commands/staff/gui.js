import { world, Player, system } from '@minecraft/server';
import { commandBuild } from '../../../library/build/classes/commandBuilder';
//import { Database } from '../../../library/build/classes/databaseBuilder.js';
import { configurations } from '../../../library/build/configurations';

/**
 * The full UI scheme.
 */
const gui = {
    /**
     * The screen seen when the player first joined or sees this UI.
     */
    welcome: {
        main: (player) => {
            console.warn('Welcome!');
        }
    },
    /**
     * The screen used if the player is NOT staff.
     */
    player: {
        main: (player) => {
            console.warn('Non staff!');
        }
    },
    /**
     * The screen used if the player is staff.
     */
    staff: {
        main: (player) => {
            console.warn('Staff!');
        }
    }
};

commandBuild.create(
    {
        name: 'gui',
        description: 'The utility UI for easy usage',
        aliases: ['ui'],
        is_staff: false,
        cancel_message: true

    }, (data, args) => {
        /**
         * @type {Player}
         */
        const player = data.sender;
        if (player.hasTag('welcome') === false) return gui.welcome.main(player);
        else if (player.hasTag(configurations.staff_tag) === true) return gui.staff.main(player);
        else gui.player.main(player);
    }
);