import { ItemStack, Player, system, world } from "@minecraft/server";
import { Database, commandBuild, playerBuild, serverBuild } from "../../library/Minecraft";
import { configurations } from "../../library/build/configurations.js";
import { gui } from './other/gui.js';

commandBuild.create(
    {
        name: 'help',
        description: 'Help on how to use a specific command or list all registered commands.',
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
    }, (data, args) => {
        /**
        * @type {Player}
        */
        const player = data.sender;
        const prefix = configurations.cmd_prefix;
        let text = [];

        if (args.length > 0) {
            const commandFound = commandBuild.findCommand(args[0]);

            if (commandFound) {
                text.push(`§bCommand Information:`);
                text.push(`§9Name: §c${commandFound.name}`);
                text.push(`§9Description: §c${commandFound.description}`);
                text.push(`§9Aliases: §c${commandFound.aliases.join(', ') || 'None'}`);
                text.push(`§9Usage: §c${commandFound.usage.join(' §8|§r ') || 'None'}`);
                text.push(`§9Example: §c${commandFound.example.join(' §8|§r ') || 'None'}`);
                text.push(`§9For Staff Only?: §c${commandFound.is_staff ? '§2Yes' : '§4No'}`);
                text.push(`§9Cancel Chat Message?: §c${commandFound.cancel_message ? '§2Yes' : '§4No'}`);

                //if (playerBuild.hasTag(configurations.staff_tag) === false) return serverBuild.tellSelf(player, '§cCouldn\'t view the source code as you are not staff.')
                if (args[1] === 'view_code') {
                    text.push(`§9Callback: \n§r${commandFound.callback.toString()}\n`);
                    text.push(`§9CallbackWM: \n§r${commandFound.callbackWM.toString()}`);
                }
            } else text.push(`§cCommand §f${args[0]}§c not found.`);
        } else {
            text.push(`§bList of All Registered Commands:`);
            text.push(`§9Custom Command Prefix: §b${prefix}`);
            commandBuild.getAllCommands().forEach((command) => {
                text.push(`§9${command.name}`);
            });
        }; serverBuild.tellSelf(player, text.join('\n'));
    }
);