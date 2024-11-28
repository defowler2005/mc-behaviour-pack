/**
 * Represents a command builder for managing commands.
 */
class commandBuilder {
    constructor() {
        /**
         * The array to contain all registered commands.
         * @type {Array<Object>}
         */
        this.commands = [];
    };

    /**
     * Creates a new command and adds it to the commands list.
     * @param {Object} info - Information about the command.
     * @param {string} info.name - The name of the command.
     * @param {string} info.description - The description of the command.
     * @param {Array<string>} [info.aliases] - Optional aliases for the command.
     * @param {Array<string>} [info.usage] - Optional usage for the command.
     * @param {Array<string>} [info.example] - Optional example usage for the command.
     * @param {boolean} [info.is_staff] - Optional flag indicating if the command is for staff only.
     * @param {boolean} [info.cancel_message] - Optional boolean to remove the command message from game chat.
     * @param {Function} callback - The callback function to execute when the command is called.
     * @param {Function} callbackWM - The callback function for when the command is called after the player moves.
     */
    create(info, callback, callbackWM) {
        this.commands.push(
            {
                name: info.name,
                description: info.description,
                aliases: info.aliases || [],
                usage: info.usage || [],
                example: info.example || [],
                is_staff: info.is_staff || false,
                cooldown_time: info.cooldown_time || 0,
                cancel_message: info.cancel_message,
                callback: callback || (() => { console.warn('Callback[0] is successfully executed!') }),
                callbackWM: callbackWM || (() => { /** console.warn('CallbakWM[0] is successfully executed!') */ })
            }
        )
    };

    /**
    * Finds a command by its name or alias.
    * @param {String} cmd - The command name or alias to search for.
    * @returns {Object|null} - The command object if found, otherwise null.
    */
    findCommand(cmd) {
        return this.commands.find(
            /**
             * @param {Object} cmdObj - A list of all registered commands.
             * @param {String} [cmdObj.name] - The name of the command.
             * @param {Array<String>} [cmdObj.aliases] - Other names for the command.
             */
            (cmdObj) => cmdObj.name === cmd || (cmdObj.aliases && cmdObj.aliases.includes(cmd))) || null;
    };

    /**
     * Returns all commands that have been registered.
     * @param {boolean} [staffOnly=false] - Indicated wether to return commands for staff members or nonstaff.
     * @returns {Array<Object>} - The array of command objects.
     */
    getAllCommands(staffOnly = false) {
        const commands = this.commands.find(((cmd) => cmd.is_staff === staffOnly));

        return commands;
    };
};

/**
 * @example
 * commandBuild.create(
 *     {
 *         name: 'name',
 *         description: 'A simple description',
 *         usage: ['name [ ...args ]'],
 *         example: ['name', 'names'],
 *         aliases: ['names'],
 *         is_staff: false,
 *         cancel_message: true
 *     },
 *     (data, args) => {
 *         const player = data.sender;
 *         const message = args.length > 0 ? `[Callback] Hello, world! arguments include: ${args.join(', ')}` : '[Callback] Hello, world!';
 *         player.sendMessage(message);
 *     },
 *     (data, args) => {
 *         const player = data.sender;
 *         const message = args.length > 0 ? `[CallbackWM] Hello, world! arguments include: ${args.join(', ')}` : '[CallbackWM] Hello, world!';
 *         player.sendMessage(message);
 *     }
 * );
 */
export const commandBuild = new commandBuilder();