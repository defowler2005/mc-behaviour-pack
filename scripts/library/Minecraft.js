import { world, system, Player } from '@minecraft/server';
import { configurations } from './build/configurations.js'
import { waitMove } from './utils/wait_move.js';
import { commandBuild } from './build/classes/commandBuilder.js';
//import { Database } from './build/classes/databaseBuilder.js';

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
        if (command.is_staff === true && sender.hasTag(configurations.staff_tag)) return sender.sendMessage('§cThis command is designed for staff only.');
        if (command.cancel_message === false) data.cancel = false;
        //if (Database.get('module:apctoggle') !== true) return sender.sendMessage('§cPlayer commands are disabled.')
        system.run(() => {
            waitMove(sender, x, y, z, () => {
                command.callbackWM(data, args);
            }); command.callback(data, args);
        })
    } catch (error) {
        console.warn(`An error occured while running Minecraft.js: ${error}\n${error.stack}`)
    }
});