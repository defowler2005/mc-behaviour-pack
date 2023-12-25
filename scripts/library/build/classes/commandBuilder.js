/**
 * A class for regestering commands.
 * @class
 */

class commandBuilder {
    /**
    * Create a new instance of the commandBuilder class.
    * @constructor
    */

    constructor() {
        /**
         * Array to store all registered commands.
         * @type {Array}
         */
        this.commands = [];
    }

    /**
     * Create a new command with provided information and callbacks.
     *
     * @param {Object} info - Information about the command.
     * @param {string} info.name - The name of the command.
     * @param {string} [info.description] - The description of the command.
     * @param {boolean} [info.is_staff=false] - Indicates if the command requires staff privileges.
     * @param {Function} callback - The callback function for the command.
     * @param {Function} callbackWM - The callback function for delayed code execution until the player moves after using the command.
     */
    create(info, callback, callbackWM) {
        const command = {
            name: info.name.split(' ')[0],
            description: info.description || '',
            is_staff: info.is_staff || false,
            callback,
            callbackWM,
        };
        this.commands.push(command);
    }

    /**
     * Get a list of all commands based on whether they require staff privileges or not.
     * @param {boolean} staff - If true, Retrieves staff-only commands. If false, Retrieves non-staff commands. If undefined, retrieves all commands.
     * @returns {Array} - An array of commands that match the staff requirement.
     */
    getAllCommands(staff = false) {
        return this.commands.filter(cmd => cmd.is_staff === staff);
    }
};

export const commandBuild = new commandBuilder();