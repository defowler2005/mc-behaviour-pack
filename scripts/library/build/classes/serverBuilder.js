import { Player, system, world } from "@minecraft/server";
import { configurations } from "../configurations";

/**
 * A class for running server related functions.
 */
class serverBuilder {
    constructor() { };
    /**
     * Send a message to all players within the current world.
     * @param {String} message
     */
    tellServer(message) {
        world.getAllPlayers().forEach((player) => {
            player.sendMessage(`${message.trim()}`);
        })
    };

    /**
     * Send a message to all staff players within the current world.
     * @param {String} message
     */
    tellStaff(message) {
        world.getAllPlayers().filter((plr) => plr.hasTag(configurations.staff_tag) === true).forEach((player) => {
            player.sendMessage(`${message.trim()}`);
        })
    };

    /**
     * Send a message to all non staff players within the current world.
     * @param {String} message
     */
    tellNonStaff(message) {
        world.getAllPlayers().filter((plr) => plr.hasTag(configurations.staff_tag) === false).forEach((player) => {
            player.sendMessage(`${message.trim()}`);
        })
    };

    /**
     * Send a message to a specified player.
     * @param {String} message
     */
    tellSelf(player, message) {
        player.sendMessage(message.trim());
    };
};

/**
 * A class for running server related functions.
 */
export const serverBuild = new serverBuilder();