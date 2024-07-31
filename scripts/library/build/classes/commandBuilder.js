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
    }

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
     * @param {Function} callbackWM - The callback function for when the command is called with moderation.
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
                cancel_message: info.cancel_message || true,
                callback: callback || (() => { console.warn('Callback[0] is successfully executed!') }),
                callbackWM: callbackWM || (() => { })
            }
        )
    }

    /**
     * Finds a command by its name or alias.
     * @param {string} cmd - The command name or alias to search for.
     * @returns {Object|null} - The command object if found, otherwise null.
     */
    findCommand(cmd) {
        return this.commands.find((cmdObj) => cmdObj.name.includes(cmd) || (cmdObj.aliases && cmdObj.aliases.includes(cmd))) || null;
    }

    /**
     * Returns all commands that have been registered.
     * @returns {Array<Object>} - An array containing all registered commands.
     */
    getAllCommands() {
        return this.commands.length > 0 ? this.commands : 0;
    }
};

/**
 * Instance of commandBuilder used for managing commands.
 */
export const commandBuild = new commandBuilder();