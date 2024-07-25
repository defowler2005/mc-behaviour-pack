import { ItemStack, Player, system, world } from "@minecraft/server";
import { Database, commandBuild, playerBuild, serverBuild } from "../../library/Minecraft";
import { configurations } from "../../library/build/configurations.js";
import { gui } from './staff/gui.js';

commandBuild.create(
    {
        name: 'help',
        description: 'Help on how to use a specific command or list all registered commands.',
        aliases: [],
        usage: [
            'help [ command_name ] view_code'
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

        if (args.length) {
            const commandFound = commandBuild.findCommand(args[0]);

            if (commandFound) {
                text.push(`§bCommand information:`);
                text.push(`§bName: §c${commandFound.name}`);
                text.push(`§bDescription: §c${commandFound.description}`);
                text.push(`§bAliases: §c${commandFound.aliases}`);
                text.push(`§bUsage: §c${commandFound.usage.length ? commandFound.usage.join(`${prefix} | `) : '§rnone'}`);
                text.push(`§bExample: §c${commandFound.example.length ? commandFound.example.join(' | ') : '§rnone'}`);
                text.push(`§bFor staff only?: §c${commandFound.is_staff ? '§2Yes' : '§cNo'}`);
                text.push(`§bCancel chat message?: §c${commandFound.cancel_message ? '§2Yes' : '§cNo'}`);
                if (args[1] === 'view_code') {
                    text.push(`callback: \n${commandFound.callback.toString()}\n\n`);
                    text.push(`callbackWM: \n${commandFound.callbackWM.toString()}`);
                }
            } else {
                text.push(`§cCommand §f${args[0]}§c not found.`);
            }
        } else {
            text.push(`§pA list of all registered commands: \n§cCustom command prefix§b${prefix}`);
            commandBuild.getAllCommands().forEach((command) => {
                text.push(`§b${command.name}`);
            })
        }; serverBuild.tellSelf(player, `${text.join('\n§r')}`);
    }
);