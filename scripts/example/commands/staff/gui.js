import { world } from "@minecraft/server";
import { commandBuild } from "../../../library/build/classes/commandBuilder.js";

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
        console.warn('Command')
    }, (data, args) => {
        player.sendMessage('')

    }
);