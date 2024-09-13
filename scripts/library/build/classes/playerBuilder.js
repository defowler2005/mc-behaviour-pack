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

    /**
     * A functioon to fetch every item a player has.
     * @param {Player} player 
     */
    getInventory(player) {
        const inv = player.getComponent(EntityComponentTypes.Inventory).container;
        const equ = player.getComponent(EntityComponentTypes.Equippable);
        const allEquipmentSlots = [
            'Head',
            'Chest',
            'Legs',
            'Feet',
            'Mainhand',
            'Offhand'
        ];
        let allItems = {};

        for (const type of allEquipmentSlots) {
           allItems += equ.getEquipment(type);
        };

        for (let i = 0; i < inv.size; i++) {
           allItems += inv.getSlot(i);
        }; return allItems;
    };
};

/**
 * A class for running player related functions.
 */
export const playerBuild = new playerBuilder();
