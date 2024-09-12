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
    }

    /**
     * Get all items within a players inventory.
     * @param {Player} player
     * @example
     * playerBuild.getInventory(player).forEach((item) => {
            playerBuild.tellSelf(player, `Items in inventory: ${item.typeId}`);
        });
     */
    getInventory(player) {
        const inventory = player.getComponent(EntityComponentTypes.Inventory).container;

        let allItems = [];

        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i);

            if (!item) continue;

            allItems.push({ item, slot: i, inventory });
        }; return allItems;
    };

    /**
     * Get all items within a players equipment slots.
     * @param {Player} player
     * @example
     *  playerBuild.getEquipment(player).forEach((item) => {
     *      playerBuild.tellSelf(player, `Items in eq: ${item.typeId}`);
     *  });        
     */
    getEquipment(player) {
        let allItems = [];

        try {
            const allSlots = [
                'Chest',
                'Feet',
                'Head',
                'Legs',
                'Mainhand',
                'Offhand',
            ];

            const equipment = player.getComponent(EntityComponentTypes.Equippable);

            for (const slot of allSlots) {
                const item = equipment.getEquipmentSlot(slot);

                if (!item.hasItem()) continue;

                allItems.push(item);
            };
        } catch (error) {
            const error_msg = `${error}`;

            //if (error_msg.includes('')) return;

            console.warn(`An error occurred while running getEquipment in playerBuilder class: ${error_msg}\n${error.stack}`);
        }; return allItems;
    };
};

/**
 * A class for running player related functions.
 */
export const playerBuild = new playerBuilder();
