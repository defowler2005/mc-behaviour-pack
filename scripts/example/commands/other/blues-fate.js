import { Player, world } from "@minecraft/server";
import { commandBuild, Database, serverBuild } from "../../../library/Minecraft.js";
import { modules } from "../staff/gui.js";

commandBuild.create(
    {
        name: 'bluesfate',
        description: 'Set the fate for blues',
        example: [
            'bluesfate 0',
            'bluesfate 1',
            'bluesfate 2'
        ],
        usage: [
            'bluesfate [ Option: Number ]'
        ]
    },
    (data, args) => {
        /**
         * @type {Player}
         */
        const player = data.sender;
        const options = [
            '0',
            '1',
            '2',
            '3',
        ];
        const optionsString = ['§4OFF', '§2All combined', '§3Clear items', '§6Prevent placing blocks'];

        if (options.includes(args[0])) {
            serverBuild.tellServer(`Player ${player.name} has set Blues 8s bit's fate to ${optionsString[args[0]]}`);
            Database.set(`module:${modules.blues[0].module_id}`, args[0]);
        } else {
            serverBuild.tellSelf(player, `Invalid option or no arguments provided. Valid options include: \n\n${options.join(', ')}`);
        }
    }
);