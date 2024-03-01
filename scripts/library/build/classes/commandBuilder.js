import { configurations } from '../configurations.js';

/**
 * A class for creating and registering commands.
 * @class
 */
class commandBuilder {
    constructor() {
        /**
         * The array to store all commands.
         * @type {Array<Object>}
         */
        this.commands = [];
        this.prefix = configurations.commandPrefix
    }

    /**
     * Creates a new command and adds it to the list of commands.
     * @param {Object} info - The command information.
     * @param {String} info.name - The name of the command.
     * @param {String} info.description - The description of the command.
     * @param {Boolean} info.isStaff - Set's the permission for staff players.
     * @param {Array<String>} info.aliases - Like a 2nd command name for the command.
     * @param {Array<String>} info.usage - An array of strings describing different usages of the command.
     * @param {Array<String>} info.examples - An array of strings providing usage examples for the command.
     * @param {Function} callback - The callback function to execute when the command is invoked.
     * @param {Function} callbackWM - The callback function to execute when the command is invoked without permission.
     */
    create(info, callback, callbackWM) {
        const command = {
            name: info.name.split(' ')[0],
            description: info.description,
            isStaff: info.isStaff || false,
            aliases: info.aliases,
            usage: info.usage,
            examples: info.examples,
            callback,
            callbackWM
        };
        this.commands.push(command);
    }
    /**
     * Gets the list of commands.
     * @param {Boolean} isStaffOption - A parameter to filter commands based on staff/non-staff.
     * @returns {Array<Object>} - The list of commands.
     */
    getCommands(isStaffOption = false) {
        if (isStaffOption) {
            return this.commands.filter((command) => command.isStaff);
        } else {
            return this.commands.filter((command) => !command.isStaff);
        }
    }
};

export const commandBuild = new commandBuilder();