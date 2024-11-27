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
        const message = args.length > 0 ? `[Callback] Hello, world! arguments include: ${args.join(', ')}` : '[Callback] Hello, world!';
        player.sendMessage(message);
    },
    /**
     * @param {import('@minecraft/server').ChatSendBeforeEvent} data
     * @param {Aray<String>} args
     */
    (data, args) => {
        const player = data.sender;
        const message = args.length > 0 ? `[CallbackWM] Hello, world! arguments include: ${args.join(', ')}` : '[CallbackWM] Hello, world!';
        player.sendMessage(message);
    }
);