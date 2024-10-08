import { ChatSendBeforeEvent } from "@minecraft/server";
import { commandBuild, Database, serverBuild, modules } from "../../../library/Minecraft.js";

commandBuild.create(
    {
        name: 'bluesfate',
        description: 'Set the fate for blues',
        example: [
            'bluesfate 0',
            'bluesfate 1',
            'bluesfate 2',
            'bluesfate 3'
        ],
        is_staff: false,
        usage: [
            'bluesfate [ 0 | 1 | 2 | 3 ]'
        ]
    },
    /**
     * @param {ChatSendBeforeEvent} data
     * @param {Array<String>} args
     */
    (data, args) => {
        const player = data.sender;
        const options = [
            '0',
            '1',
            '2',
            '3',
        ];

        if (options.includes(args[0])) {
            serverBuild.tellServer(`Player ${player.name} has set Blues 8s bit's fate to ${modules.blues[0].toggles[args[0]]}`, );
            Database.set(`module:${modules.blues[0].module_id}`, args[0]);
        } else {
            playerBuild.tellSelf(player, `Invalid option or no arguments provided. Valid options include: \n${options.join(', ')}`);
        }
    }
);