import { system, Player, EntityComponentTypes, ItemStack } from '@minecraft/server';

/**
 * A class for running player related functions.
 */
class playerBuilder {
    constructor() { };

    /**
     * Send a message to a specified player.
     * @param {String} message
     * @param {Player} player
     */
    tellSelf(player, message) {
        player.sendMessage(message?.trim());
    };

    /**
     * @param {Player} player
     * @param {String} tag
     */
    addTag(player, tag) {
        return player.addTag(tag?.trim());
    };

    /**
     * @param {Player} player
     * @param {String} tag
     */
    hasTag(player, tag) {
        return player.hasTag(tag?.trim());
    }

    /**
     * @param {Player} player
     * @param {String} tag
     */
    removeTag(player, tag) {
        return player.removeTag(tag?.trim());
    };

    /**
     * @param {Player} player
     * @param {String} tag
     */
    addRank(player, tag) {
        return player.addTag(tag.replace('rank:')?.trim());
    };

    /**
     * @param {Player} player
     * @param {String} tag
     */
    removeRank(player, tag) {
        return player.removeTag(tag.replace('rank:')?.trim());
    };
};

/**
 * A class for running player related functions.
 */
export const playerBuild = new playerBuilder();
