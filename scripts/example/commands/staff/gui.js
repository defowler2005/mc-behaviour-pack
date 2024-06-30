import { world, Player, system } from '@minecraft/server';
import { commandBuild } from '../../../library/build/classes/commandBuilder.js';
import { buttonFormData } from '../../../library/build/classes/buttonFormData.js';
//import { Database } from '../../../library/build/classes/databaseBuilder.js';
import { configurations } from '../../../library/build/configurations.js';

/**
 * The full UI scheme.
 */
const gui = {
    /**
     * The screen seen when the player first joined or sees this UI.
     */
    welcome: {
        main: (player) => {
            //console.warn('Welcome!');
            const main_welcome = new buttonFormData(player);

            main_welcome.create(
                {
                    title: 'Welcome UI.',
                    body: [
                        ['Welcome to [some name]!']
                    ],
                    button: [
                        ['Close']
                    ]
                }, (result) => {
                    player.addTag('welcome');
                    console.warn(`After for closed.`)
                    if (player.hasTag(configurations.staff_tag) === true) return gui.staff.main(player);
                    else gui.player.main(player);
                }
            );
        }
    },
    /**
     * The screen used if the player is NOT staff.
     */
    player: {
        main: (player) => {
            //console.warn('Non staff!');
            const main_player = new buttonFormData(player);

            main_player.create(
                {
                    title: 'Non staff UI.',
                    body: [
                        ['Non staff player utility UI.']
                    ],
                    button: [
                        ['Some btn']
                    ]
                }, (result) => {
                    if (!result.result || result.canceled) return;
                    
                }
            )
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

        player.sendMessage('Move to show UI.');
    }, (data, args) => {
        /**
        * @type {Player}
        */
        const player = data.sender;

        if (player.hasTag('welcome') === false) return gui.welcome.main(player);
        if (player.hasTag(configurations.staff_tag) === true) return gui.staff.main(player);
        else gui.player.main(player);
    }
);