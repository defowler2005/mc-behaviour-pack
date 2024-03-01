import { system, world } from '@minecraft/server';
import { commandBuild } from './build/classes/commandBuilder.js';
import { configurations } from './build/configurations.js';
import '../example/commands/staff/gui.js'
import { waitMove } from './utils/wait_move.js';

world.beforeEvents.chatSend.subscribe((data) => {
    const prefix = commandBuild.prefix;
    const sender = data.sender;
    const message = data.message;
    if (!message.startsWith(prefix)) return; data.cancel = true;
    const { x, y, z } = data.sender.location;
    const args = message.toLowerCase().slice(prefix.length).split(/\s+/g);
    const cmd = args.shift();
    const command = commandBuild.commands.find((commandObj) => commandObj.name === cmd);
    if (!command) return sender.sendMessage({ text: '§c', translate: 'commands.generic.unknown', text: '§c', with: [`§f${cmd}§c`] });
    if (command.isStaff === true && sender.hasTag(configurations.staffTag) === false) return sender.sendMessage(`This command is for staff only!`);
    system.run(() => {
        command.callback(data, args);
        waitMove(sender, { x, y, z }, () => command.callbackWM(data, args));
    })
});