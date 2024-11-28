import { world, Player, system } from '@minecraft/server';
import { commandBuild } from '../../../library/Minecraft.js';

commandBuild.create(
    {
        name: 'gui',
        description: 'Ease of use UI',
        usage: [
            'gui [ nonstaff ]',
            'ui [ nonstaff ]'
        ],
        example: ['gui', 'ui'],
        aliases: ['ui'],
        is_staff: false,
        cancel_message: true
    },
    /**
     * @param {import('@minecraft/server').ChatSendBeforeEvent} data
     * @param {Aray<String>} args
     */
    (data, args) => {
        const player = data.sender;

        player.sendMessage('§aMove to show the UI.');
    },
    /**
     * @param {import('@minecraft/server').ChatSendBeforeEvent} data
     * @param {Aray<String>} args
     */
    (data, args) => {
        const player = data.sender;

        /**
         * The gui Scheme
         */
        const guiScheme = {
            staff: {
                main: (sender) => {
                    
                }
            },
            nonstaff: {
                
            },
            welcome: {

            }
        };
    }
);
