import { ChatSendBeforeEvent, Player, world } from '@minecraft/server';
import { buttonFormData, commandBuild, Database, inputFormData, queryFormData, playerBuild, serverBuild, modules } from '../../../library/Minecraft.js';
import { configurations } from '../../../library/build/configurations.js';
import { randomNumber } from '../../../library/utils/randomNumber.js';
import { scoreTest, setScore } from '../../../library/utils/score_system.js';

commandBuild.create(
    {
        name: 'inventory',
        description: '',
        usage: ['inventory'],
        example: ['inventory', 'inv'],
        aliases: ['inv'],
        is_staff: true,
        cancel_message: true
    },
    /**
     * @param {ChatSendBeforeEvent} data
     * @param {Array<String>} args
     */
    (data, args) => { // Incomplete.
        const sender = data.sender;
        const targetString = args[0]?.replace('@', '');
        const action = args[1];
        const actionList = ['view', 'wipe', 'clearitem'];
        const target = world.getPlayers({ name: `${targetString}`});

        if (!targetString) return playerBuild.tellSelf(sender, `§cYou must provide a target.`);
        if (!action) return playerBuild.tellSelf(sender, `§c.You must provide an action.`);
        if (!actionList.includes(action)) return playerBuild.tellSelf(sender, `§cInvalid action. Actions include: §f${actionList.join('§c,§r ')}`); // action.charAt(0).toUpperCase() + action.slice(1)
        if (target.length) {

        } else return playerBuild.tellSelf(sender, `§cThe player by the name ${targetString} was not found.`);
    },
    /**
     * @param {ChatSendBeforeEvent} data
     * @param {Array<String>} args
     */
    (data, args) => { }
);