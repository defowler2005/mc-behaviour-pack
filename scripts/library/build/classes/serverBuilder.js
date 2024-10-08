import { Player, CommandResult, world } from "@minecraft/server";
import { configurations } from "../configurations.js";

/**
 * A class for running server related functions.
 */
class serverBuilder {
    constructor() {
        /** @type {Array<Player>} */
        this.allStaff = world.getPlayers({ tags: [configurations.staff_tag] });
        /** @type {Array<Player>} */
        this.allNonStaff = world.getPlayers({ excludeTags: [configurations.staff_tag] });
        /** @type {Array<Player>} */
        this.allPlayers = world.getAllPlayers();
    };

    /**
     * Send a message to all players within the current world.
     * @param {String} message
     * @param {Player} ignoredSelfPlayer - An optional parameter for ignoring the player who initiated the message.
     */
    tellServer(message, ignoredSelfPlayer) {
        if (ignoredSelfPlayer) {
            this.allPlayers.filter((plr) => plr.name !== ignoredSelfPlayer.name).forEach((player) => {
                player.sendMessage(`${message?.trim()}`);
            })
        } else {
            this.allPlayers.forEach((player) => {
                player.sendMessage(`${message?.trim()}`);
            })
        }
    };

    /**
     * Send a message to all staff players within the current world.
     * @param {String} message
     */
    tellStaff(message) {
        this.allNonStaff.forEach((player) => {
            player.sendMessage(`${message?.trim()}`);
        })
    };

    /**
     * Send a message to all non staff players within the current world.
     * @param {String} message
     */
    tellNonStaff(message) {
        this.allStaff.forEach((player) => {
            player.sendMessage(`${message?.trim()}`);
        })
    };

    /**
     * Execute an array of commands at once.
     * @param {Array<String>} cmds
     * @returns {Promise<CommandResult>}
     */
    executeCommands(cmds) {
        let commandE;
        for (const cmd of cmds) {
            commandE = this.dimensions.runCommandAsync(cmd);
        }; return commandE;
    }
};

/**
 * A class for running server related functions.
 */
export const serverBuild = new serverBuilder();