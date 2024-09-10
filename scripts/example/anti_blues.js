import { EquipmentSlot, ItemStack, system, world } from "@minecraft/server";
import { Database, playerBuild, serverBuild, modules } from "../library/Minecraft.js";

const bluesName = 'Blues 8s bit';
const knownItems = ['minecraft:redstone_block', 'minecraft:dropper', 'minecraft:dispenser', 'minecraft:carved_pumpkin'];

system.runInterval(() => {
    try {
        const blues = world.getAllPlayers().find((plr) => plr.name === bluesName);

        const abtoggle = Number(Database.get(`module:${modules.blues[0].module_id}`));

        if (!blues) return;
        if (abtoggle !== 1 || abtoggle !== 2 && blues.nameTag !== bluesName) return;
        const inventoryItems = playerBuild.getInventory(blues);
        inventoryItems.forEach((itemObj) => {
            if (knownItems.includes(itemObj.item.typeId)) {
                const pumpkin = new ItemStack('minecraft:carved_pumpkin', 1);
                blues.getComponent('minecraft:equippable').setEquipment(EquipmentSlot.Head, pumpkin);
                itemObj.inventory.getSlot(itemObj.slot).setItem();
                serverBuild.tellSelf(blues, `§cAnti-Blues > §gCleared §9${itemObj.item.typeId.replace('minecraft:', '').replace('_', ' ')} from ${bluesName}§g inventory :(`);
            }
        });
    } catch (error) {
        const error_msg = `${error}`;

        console.warn(`An error occurred while running anti_blues: ${error_msg}\n${error.stack}`);
    }
}, 1);

world.beforeEvents.playerPlaceBlock.subscribe((data) => {
    const abtoggle = Number(Database.get(`module:${modules.blues[0].module_id}`));
    const blues = data.player;

    if (abtoggle !== 1 || abtoggle !== 3 && blues.nameTag !== bluesName) return;

    data.cancel = true;
    serverBuild.tellSelf(blues, '§cAnti-Blues > §bAnti-Place §gblock prevented you from placing any blocks.');
});

world.beforeEvents.playerBreakBlock.subscribe((data) => {
    const abtoggle = Number(Database.get(`module:${modules.blues[0].module_id}`));
    const blues = data.player;

    if (abtoggle !== 1 || abtoggle !== 3 && blues.nameTag !== bluesName) return;

    data.cancel = true;
    serverBuild.tellSelf(blues, '§cAnti-Blues > §bAnti-Break §gblock prevented you from breaking any blocks.');
});