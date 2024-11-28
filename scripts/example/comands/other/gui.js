import { world, Player, system } from '@minecraft/server';
import { commandBuild } from '../../../library/Minecraft.js';
import { buttonFormData } from '../../../library/build/classes/buttonFormData.js';

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
     * @param {Array<String>} args
     */
    (data, args) => {
        const player = data.sender;

        player.sendMessage('§aMove to show the UI.');
    },
    /**
     * @param {import('@minecraft/server').ChatSendBeforeEvent} data
     * @param {Array<String>} args
     */
    (data, args) => {
        const player = data.sender;

        /**
         * The gui Scheme
         */
        const guiScheme = {

            /**
             * The staff UI.
             */
            staff: {

                /**
                 * The main menu for staff players.
                 * @param {import('@minecraft/server').Player} sender 
                 */
                main: (sender) => {
                    const mainForm = new buttonFormData(sender);

                    mainForm.create(
                        {
                            title: 'Main staff menu',
                            body: [
                                ['']
                            ]
                        }
                    )
                }
            },
            nonstaff: {
                main: (sender) => {

                }
            },
            welcome: {
                main: (sender) => {

                }
            }
        };
    }
);
