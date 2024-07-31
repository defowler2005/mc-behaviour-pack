import { ItemStack, system, world } from "@minecraft/server";
import { Database, playerBuild, serverBuild } from "../library/Minecraft.js";
import { gui, modules } from "./commands/staff/gui.js";

const bluesName = 'defowler2OO5'//'Blues 8s bit';
const knownItems = ['minecraft:redstone_block', 'minecraft:dropper', 'minecraft:dispenser', 'minecraft:carved_pumpkin'];

system.runInterval(() => {
    try {
        const blues = world.getPlayers({ name: bluesName })[0];
        const abtoggle = Number(Database.get(`module:${modules.blues[0].module_id}`));
        let hasItem = 0;

        if (abtoggle === 1 || abtoggle === 2) {
            playerBuild.getInventory(blues).forEach((itemObj) => {
                if (knownItems.includes(itemObj.item.typeId)) {
                    hasItem = 1;
                    itemObj.inventory.getSlot(itemObj.slot).setItem();
                    serverBuild.tellSelf(blues, `§cAnti-Blues > §gCleared §9${itemObj.item.typeId.replace('minecraft:', '').replace('_', ' ')} from ${bluesName}§g inventory :(`);
                }
                const pumpkin = new ItemStack('minecraft:carved_pumpkin', 1);
                blues.getComponent('minecraft:equippable').setEquipment(0, pumpkin);
            })
        }
    } catch (error) {
        const error_msg = `${error}`;
        const includesUselessError = error_msg.includes(`'getComponent' of undefined`);

        if (includesUselessError) return console.warn(`An error occurred while running anti_blues: ${error_msg}\n${error.stack}`);
    }
}, 1);

world.beforeEvents.playerPlaceBlock.subscribe((data) => {
    const abtoggle = Number(Database.get(`module:${modules.blues[0].module_id}`));
    const blues = data.player;

    if (abtoggle !== 1 && abtoggle !== 2 && blues.nameTag !== bluesName) return;

    data.cancel = true;
    serverBuild.tellSelf(blues, '§cAnti-Blues > Anti-Place §gblock prevented you from placing any blocks.');
});

world.beforeEvents.playerBreakBlock.subscribe((data) => {
    const abtoggle = Number(Database.get(`module:${modules.blues[0].module_id}`));
    const blues = data.player;

    if (abtoggle !== 1 && abtoggle !== 2 && blues.nameTag !== bluesName) return;
    data.cancel = true;
    serverBuild.tellSelf(blues, '§cAnti-Blues > Anti-Break §gblock prevented you from breaking any blocks.');
});