import { Player, ChatSendBeforeEvent } from '@minecraft/server';
import { commandBuild, playerBuild, serverBuild } from '../../library/Minecraft.js';
import { configurations } from '../../library/build/configurations.js';

commandBuild.create(
    {
        name: 'help',
        description: 'Provides help on a specified command or lists all available commands.',
        aliases: [],
        usage: [
            'help [ command_name ] [ view_code ]'
        ],
        example: [
            'help',
            'help gui',
            'help gui view_code'
        ],
        is_staff: false,
        cancel_message: true
    },
    /**
     * @param {ChatSendBeforeEvent} data
     * @param {Array<String>} args
     */
    (data, args) => {
        /**
         * @type {Player}
         */
        const player = data.sender;
        const prefix = configurations.cmd_prefix;
        let text = [];

        if (args.length > 0) {
            const commandFound = commandBuild.findCommand(args[0]);

            if (commandFound) {
                //text.push(`§9Custom Command Prefix: §b${prefix}`);
                text.push(`§bCommand Information:`);
                text.push(`§9Name: §c${commandFound.name}`);
                text.push(`§9Description: §c${commandFound.description}`);
                text.push(`§9Aliases: §c${commandFound.aliases.length > 0 ? commandFound.aliases.join(', ') : 'None'}`);
                text.push(`§9Usage: §c${commandFound.usage.length > 0 ? commandFound.usage.join(' §8|§r ') : 'None'}`);
                text.push(`§9Example: §c${commandFound.example.length > 0 ? commandFound.example.join(' §8|§r ') : 'None'}`);
                text.push(`§9For Staff Only?: §c${commandFound.is_staff ? '§2Yes' : '§4No'}`);
                text.push(`§9Cancel Chat Message?: §c${commandFound.cancel_message ? '§2Yes' : '§4No'}`);

                //if (playerBuild.hasTag(configurations.staff_tag) === false || player.isOp() === false) return playerBuild.tellSelf(player, '§cCouldn\'t view the source code as you are not staff.');
                if (args[1] === 'view_code') {
                    text.push(`\n§9Callback: \n§r${commandFound.callback.toString()}\n`);
                    text.push(`§9CallbackWM: \n§r${commandFound.callbackWM.toString()}`);
                }
            } else text.push(`§cCommand §f${args[0]}§c not found.`);
        } else {
            text.push(`§bList of All Registered Commands:`);
            text.push(`§9Custom Command Prefix: §b${prefix}`);
            commandBuild.getAllCommands().forEach((command) => text.push(`§9${command.name}`));
        }; playerBuild.tellSelf(player, text.join('\n'));
    }
);
