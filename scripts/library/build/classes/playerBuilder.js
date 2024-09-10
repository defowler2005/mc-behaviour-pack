import { system, Player, EntityComponentTypes } from '@minecraft/server';

/**
 * A class for running player related functions.
 */
class playerBuilder {
    constructor() { };

    /**
     * Check if a player has a specific tag.
     * @param {Player} player
     * @param {String} tag
     * @returns {Boolean}
     */
    hasTag(player, tag) {
        return player.hasTag(tag?.trim());
    };

    /**
     * Get all items within a players inventory.
     * @param {Player} player
     * @example
     * playerBuild.getInventory(player).forEach((item) => {
            serverBuild.tellSelf(player, `Items in inv: ${item.typeId}`);
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
        playerBuild.getEquipment(player).forEach((item) => {
            serverBuild.tellSelf(player, `Items in eq: ${item.typeId}`);
        });        
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

            console.warn(`An error occurred while running getEquipment: ${error_msg}\n${error.stack}`);
        }; return allItems;
    };
};

/**
 * A class for running player related functions.
 */
export const playerBuild = new playerBuilder();
