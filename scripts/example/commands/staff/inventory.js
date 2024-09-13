import { ChatSendBeforeEvent, Player, world } from '@minecraft/server';
import { buttonFormData, commandBuild, Database, inputFormData, queryFormData, playerBuild, serverBuild, modules } from '../../../library/Minecraft.js';
import { configurations } from '../../../library/build/configurations.js';
import { randomNumber } from '../../../library/utils/randomNumber.js';
import { scoreTest, setScore } from '../../../library/utils/score_system.js';

commandBuild.create(
    {
        name: 'inventory',
        description: '',
        usage: ['inventory [ @player ] [ view | wipe | clearitem ] [ item_name ]'],
        example: [
            'inventory @defowler2OO5 view',
            'inventory @defowler2OO5 wipe',
            'inventory @defowler2OO5 clearitem'
        ],
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
        const target = world.getPlayers({ name: `${targetString}` });

        if (!targetString) return playerBuild.tellSelf(sender, `§cYou must provide a target.`);
        if (!action) return playerBuild.tellSelf(sender, `§cYou must provide an action.`);
        if (!target.length) playerBuild.tellSelf(sender, `§cA player by the name ${targetString} was not found.`);

        switch (action) {
            case actionList[0]:
                /** @type {Array<String>} */
                const text = [];

                text.join(`§9Helmet: §c`);

                playerBuild.tellSelf(sender, text.join('\n§r'));
                break;
            case actionList[1]:
                console.warn(actionList[1]);
                break;
            case actionList[2]:

                break;
            default:
                playerBuild.tellSelf(sender, `§cInvalid action. Actions include: §f${actionList.join('§c,§r ')}`); // action.charAt(0).toUpperCase() + action.slice(1);
                break;
        }
    },
    /**
     * @param {ChatSendBeforeEvent} data
     * @param {Array<String>} args
     */
    (data, args) => { }
);