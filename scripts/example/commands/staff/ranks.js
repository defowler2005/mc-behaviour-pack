import { world, Player, system } from '@minecraft/server';
import { commandBuild, playerBuild, serverBuild, Database, inputFormData, buttonFormData } from '../../../library/Minecraft.js';
import { configurations } from '../../../library/build/configurations.js';

commandBuild.create(
    {
        name: 'ranks',
        description: 'Command to manage players rank tags',
        usage: ['ranks [ @player ] [ add | remove | list ] [ rank_name ]'],
        example: [
          'ranks @defowler2005 add Owner',
          'ranks @defowler2005 remove Owner',
          'ranks @defowler2OO5 list'
        ],
        aliases: ['rank'],
        is_staff: true,
        cancel_message: true
    }, (data, args) => {
        /**
        * @type {Player}
        */
        const player = data.sender;

      
    }, (data, args) => {}
);
