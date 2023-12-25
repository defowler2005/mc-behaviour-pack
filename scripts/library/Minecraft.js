import { world, system } from '@minecraft/server';
import { waitMove } from './utilities/wiatMove.js';
import { commandBuild } from './build/classes/commandBuilder.js';
import { config } from './build/config.js';

world.beforeEvents.chatSend.subscribe((data) => {
    const prefix = config.prefix;
    const player = data.sender;
    const message = data.message;
    const { x, y, z } = player.location;
    if (!message.startsWith(prefix)) return;
    data.cancel = true;
    const args = message.slice(prefix.length).split(/\s+/g);
    const cmd = args.shift();
    const command = commandBuild.commands.find((cmdName) => cmdName.name === cmd);
    if (!command) return player.sendMessage('Invalid command!');
    if (command.is_staff && !player.hasTag('hosen24576jg')) return player.sendMessage('Invalid permission!')
    system.run(() => command.callback(player, args) || waitMove(player, x, y, z, () => command.callbackWM(player, args)));
});