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
    (data, args) => {
        const sender = data.sender;
        const targetString = args[0];
        const target = world.getPlayers({ name: targetString});

        if (target) {
            
        } else return serverBuild.tellSelf(sender, `§cThe player by the name ${targetString} was not found.`);
    },
    /**
     * @param {ChatSendBeforeEvent} data
     * @param {Array<String>} args
     */
    (data, args) => { }
);