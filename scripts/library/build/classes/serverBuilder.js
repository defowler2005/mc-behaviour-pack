import { Player, system, world } from "@minecraft/server";
import { configurations } from "../configurations";

/**
 * A class for running server related functions.
 */
class serverBuilder {
    constructor() {
        /** @type {Player} */
        this.allStaff = world.getPlayers({ tags: [configurations.staff_tag] });
        /** @type {Player} */
        this.allNonStaff = world.getPlayers({ excludeTags: [configurations.staff_tag] });
        /** @type {Player} */
        this.allPlayers = world.getPlayers();
    };

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
        this.allNonStaff.forEach((player) => {
            player.sendMessage(`${message.trim()}`);
        })
    };

    /**
     * Send a message to all non staff players within the current world.
     * @param {String} message
     */
    tellNonStaff(message) {
        this.allStaff.forEach((player) => {
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