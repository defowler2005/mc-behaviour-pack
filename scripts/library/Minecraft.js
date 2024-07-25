import { world, system, Player } from '@minecraft/server';
import { configurations } from './build/configurations.js'
import { waitMove } from './utils/wait_move.js';
import { Database } from './build/classes/databaseBuilder.js';
import { buttonFormData } from './build/classes/buttonFormData.js';
import { inputFormData } from './build/classes/inputFormData.js';
import { commandBuild } from './build/classes/commandBuilder.js';
import { serverBuild } from './build/classes/serverBuilder.js';
import { playerBuild } from './build/classes/playerBuilder.js';
import { modules } from '../example/commands/staff/gui.js';

world.beforeEvents.chatSend.subscribe((data) => {
    try {
        const prefix = configurations.cmd_prefix;
        const sender = data.sender;
        const message = data.message;
        const { x, y, z } = data.sender.location;
        const args = message.slice(prefix.length).split(new RegExp(/\s+/g));
        const cmd = args.shift();
        const command = commandBuild.commands.find((commands) => commands.name === cmd || commands.aliases.includes(cmd));

        if (message.startsWith(prefix) === false) return; data.cancel = true;
        if (!command) return sender.sendMessage({ "rawtext": [{ "text": "§c" }, { "translate": "commands.generic.unknown", "with": [`§f${cmd}§c`] }] });
        if (command.is_staff === true && playerBuild.hasTag(sender, configurations.staff_tag) === false || sender.isOp() === false) return sender.sendMessage('§cThis command is designed for staff only.');
        if (command.cancel_message === false) data.cancel = false;
        if (Database.get(modules.staff[0].module_id) !== 1 && playerBuild.hasTag(sender, configurations.staff_tag) === false || sender.isOp() === false) return sender.sendMessage('§cPlayer commands are disabled.');

        system.run(() => {
            waitMove(sender, x, y, z, () => {
                command.callbackWM(data, args);
            }); command.callback(data, args);
        })
    } catch (error) {
        console.warn(`An error occured while running Minecraft.js main commmand center: ${error}\n${error.stack}`);
    }
});

export {
    commandBuild,
    buttonFormData,
    inputFormData,
    serverBuild,
    Database,
    playerBuild
};