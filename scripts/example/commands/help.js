import { ItemStack, Player, system, world } from "@minecraft/server";
import { Database, commandBuild, playerBuild, serverBuild } from "../../library/Minecraft";
import { configurations } from "../../library/build/configurations.js";
import { gui } from './staff/gui.js'


commandBuild.create(
    {
        name: 'help',
        description: 'Help on how to use a specific command or list all registered commands.',
        aliases: [],
        usage: [
            'help [ command name ] view_code'
        ],
        example: [
            'help',
            'help gui',
            'help gui view_code'
        ],
        is_staff: false,
        cancel_message: true
    }, (data, args) => {
        /**
        * @type {Player}
        */
        const player = data.sender;
        let text = [];

        if (args.length) { // Check if arguments were used.
            const commandFound = commandBuild.findCommand(args[0]);

            if (commandFound) {
                text.push(`Command information:`);
                text.push(`name: ${commandFound.name}`);
                text.push(`description: ${commandFound.description}`);
                text.push(`aliases: ${commandFound.aliases}`);
                text.push(`usage: ${commandFound.usage.join(' | ')}`);
                text.push(`example: ${commandFound.example.join(' | ')}`);
                text.push(`is_staff: ${commandFound.is_staff ? 'Yes' : 'No'}`);
                text.push(`cancel_message: ${commandFound.cancel_message ? 'Yes' : 'No'}`);
                if (args[1] === 'view_code') {
                    text.push(`callback[0]: ${commandFound.callback.toString()}\n\n`);
                    text.push(`callbackWM[0]: ${commandFound.callbackWM.toString()}`);
                }
            } else {
                text.push(`§cCommand §f${args[0]}§c not found.`);
            };
        } else {
            text.push(`A list of all registered commands:`);
            commandBuild.getAllCommands().forEach((command) => {
                text.push(command.name);
            })
        }; serverBuild.tellSelf(player, `${text.join('\n§r')}`);
    }
);