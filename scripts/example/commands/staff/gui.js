import { Player, world } from '@minecraft/server';
import { commandBuild } from '../../../library/build/classes/commandBuilder.js';
import { configurations } from '../../../library/build/configurations.js';
import { buttonFormData } from '../../../library/build/classes/buttonFormData.js';

/**
 * The gui object containg all UI's.
 */
const gui = {
    staff: {
        main: (player) => { }
    }
};

commandBuild.create(
    {
        name: 'gui',
        description: 'The ease of access utility gui',
        isStaff: false,
        aliases: ['ui'],
        examples: ['gui', 'ui'],
        usage: ['gui', 'ui']
    }, (data, args) => {
        /**
         * @type {Player}
         */
        const player = data.sender;
        player.sendMessage('');
    }, (data, args) => {
        /**
         * @type {Player}
         */
        const player = data.sender;
        if (player.hasTag('welcome')) {
            gui.welcome.main(player);
            return;
        };
        if (player.hasTag(configurations.staffTag)) gui.staff.main(player);
        else return gui.player.main(player)
    }
);