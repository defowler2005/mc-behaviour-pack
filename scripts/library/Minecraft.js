import { system, world } from '@minecraft/server';
import { modules } from '../example/commands/other/gui.js';
import { buttonFormData } from './build/classes/buttonFormData.js';
import { commandBuild } from './build/classes/commandBuilder.js';
import { Database } from './build/classes/databaseBuilder.js';
import { inputFormData } from './build/classes/inputFormData.js';
import { playerBuild } from './build/classes/playerBuilder.js';
import { serverBuild } from './build/classes/serverBuilder.js';
import { configurations } from './build/configurations.js';
import { waitMove } from './utils/wait_move.js';

world.beforeEvents.chatSend.subscribe((data) => {
    try {
        const prefix = configurations.cmd_prefix;
        const sender = data.sender;
        const message = data.message;
        const { x, y, z } = data.sender.location;
        const args = message.slice(prefix.length).trim().split(new RegExp(/\s+/));
        const cmd = args.shift();
        const command = commandBuild.commands.find((commands) => commands.name === cmd || commands.aliases.includes(cmd));

        if (!message.startsWith(prefix)) return; data.cancel = true;
        if (!command) return sender.sendMessage({ "rawtext": [{ "text": "§c" }, { "translate": "commands.generic.unknown", "with": [`§f${cmd}§c`] }] });
        if (command.is_staff === true && !playerBuild.hasTag(sender, configurations.staff_tag) && !sender.isOp()) return sender.sendMessage('§cThis command is designed for staff only.');
        if (command.cancel_message === false) data.cancel = false;
        if (Database.get(modules.staff[0].module_id) !== 1 && !playerBuild.hasTag(sender, configurations.staff_tag) && !sender.isOp()) return sender.sendMessage('§cPlayer commands are disabled.');

        system.run(() => {
            command.callback(data, args);
            waitMove(sender, { x, y, z }, () => {
                command.callbackWM(data, args);
            });
        });
    } catch (error) {
        console.warn(`An error occurred while running Minecraft.js at main command center: ${error}\n${error.stack}`);
    }
});

export {
    buttonFormData,
    commandBuild,
    Database,
    inputFormData,
    playerBuild,
    serverBuild
};
