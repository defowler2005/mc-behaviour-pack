import { system } from '@minecraft/server';
import { commandBuild } from './build/classes/commandBuilder.js';
import { eventBuild } from './build/classes/eventBuilder.js';
import { config } from './build/config.js';
import { waitMove } from './utils/waitMove.js';

eventBuild.addEventListener('chatSend', 'beforeEvent', /** * @param {import('@minecraft/server').ChatSendBeforeEvent} data */(data) => {
    try {
        const message = data.message;
        const sender = data.sender;
        const { x, y, z } = sender.location;
        const prefix = config.cmdChatPrefix;

        if (!message.startsWith(prefix)) return; data.cancel = true;

        const args = message.slice(prefix.length).trim().split(new RegExp(/\s+/g));
        const cmd = args.shift();
        const command = commandBuild.findCommand(cmd);

        if (!command) return sender.sendMessage({ "rawtext": [{ "text": "§c" }, { "translate": "commands.generic.unknown", "with": [`§f${cmd}§c`] }] });
        data.cancel = command.cancel_message;

        if (command.is_staff && !sender.hasTag('test')) return sender.sendMessage('You don\'t have permission to use this command.');

        system.run(() => {
            command.callback(data, args);
            waitMove(sender, x, y, z, () => command.callbackWM(data, args));
        })
    } catch (error) {
        console.warn(`An error occured while running main command center: ${error}\n${error.stack}`);
    };
});

export {
    commandBuild,
    config,
    eventBuild,
    waitMove,
};