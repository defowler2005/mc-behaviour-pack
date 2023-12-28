import { world, system } from '@minecraft/server';
import { waitMove } from './utilities/waitMove.js';
import { commandBuild } from './build/classes/commandBuilder.js';
import { config } from './build/config.js';
import { staffModulesList } from '../example/commands/staff/gui.js';
import { databaseBuild } from './build/classes/databaseBuilder.js';

world.beforeEvents.chatSend.subscribe((data) => {
    databaseBuild.set(staffModulesList[0].moduleId, true)
    const prefix = config.prefix;
    const player = data.sender;
    const message = data.message;
    const chat_commands = databaseBuild.get(staffModulesList[0].moduleId);
    const { x, y, z } = player.location;
    if (!message.startsWith(prefix)) return;
    data.cancel = true;
    const args = message.slice(prefix.length).split(/\s+/g);
    const cmd = args.shift().toLowerCase();
    const command = commandBuild.commands.find((cmdName) => cmdName.name === cmd);
    if (chat_commands === false && !player.hasTag('staff')) return player.sendMessage('Player chat commands have been turned off.')
    if (!command) return player.sendMessage('Invalid command!');
    if (command.is_staff && !player.hasTag('hosen24576jg')) return player.sendMessage('Invalid permission!')
    system.run(() => command.callback(player, args) || waitMove(player, x, y, z, () => command.callbackWM(player, args)));
});