import { world } from '@minecraft/server';
import { configurations } from '../build/configurations.js';
import { Database, serverBuild } from '../Minecraft.js';

world.beforeEvents.chatSend.subscribe((data) => {
    const message = data.message;
    if (message.startsWith(configurations.cmd_prefix) === true) return; data.cancel = true;

    const sender = data.sender;
    const allTags = sender.getTags().filter((tag) => tag.startsWith('rank:'));
    const isStaff = serverBuild.hasTag(sender, configurations.staff_tag);

    if (allTags.length > 0 && Database.get(`module:${modules.staff[1].module_id}`) === 1) {
        serverBuild.tellServer(`§8<§f${sender.nameTag}§8> [§r${isStaff ? '§aStaff§8,' : ''} §r${allTags.map((tag) => tag.replace('rank:', '')?.replace('_', ' ')).join('§8,§r ')}§8]§r ${message}`);
    } else serverBuild.tellServer(`§8<§f${sender.nameTag}§8> §r${isStaff ? '§8[§aStaff§8]' : ''}§r ${message}`);
});