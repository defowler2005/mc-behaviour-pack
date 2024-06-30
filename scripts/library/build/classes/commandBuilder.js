/**
 * The commandBuilder class for managing commands.
 */
class commandBuilder {
    constructor() {
        this.commands = [];
    }

    /**
     * Creates a new command and adds it to the commands list.
     * @param {Object} info - Information about the command.
     * @param {string} info.name - The name of the command.
     * @param {string} info.description - The description of the command.
     * @param {Array<string>} [info.aliases] - Optional aliases for the command.
     * @param {boolean} [info.is_staff] - Optional flag indicating if the command is for staff only.
     * @param {boolean} [info.cancel_message] - Optional boolean to remove the command's message from game chat.
     * @param {Function} callback - The callback function to execute when the command is called.
     * @param {Function} callbackWM - The callback function for when the command is called with moderation.
     */
    create(info, callback, callbackWM) {
        const command = {
            name: info.name,
            description: info.description,
            aliases: info.aliases || [],
            is_staff: info.is_staff || false,
            cancel_message: info.cancel_message !== undefined ? info.cancel_message : true, // Default to true if not specified
            callback: callback,
            callbackWM: callbackWM
        };
        this.commands.push(command);
    }

    /**
     * Finds a command by its name or alias.
     * @param {string} cmd - The command name or alias to search for.
     * @returns {Object|null} - The command object if found, otherwise null.
     */
    findCommand(cmd) {
        return this.commands.find(cmdObj => cmdObj.name.includes(cmd) || cmdObj.aliases.includes(cmd)) || null;
    }
}

export const commandBuild = new commandBuilder();