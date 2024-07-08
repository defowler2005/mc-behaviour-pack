import { system, world } from "@minecraft/server";
import { Database, inputFormData, playerBuild, serverBuild } from "../library/Minecraft.js";
import { gui, modules } from "./commands/staff/gui.js";
import { waitMove } from "../library/utils/wait_move.js";

const bluesName = 'defowler2OO5'//'Blues 8s bit';
const knownItems = ['minecraft:redstone_block', 'minecraft:dropper', 'minecraft:dispenser'];
system.runInterval(() => {
    try {
        const blues = world.getPlayers({ name: bluesName })[0];
        const abtoggle = Number(Database.get(`module:${modules.staff[1].module_id}`));

        if (abtoggle === 1 || abtoggle === 2) {
            playerBuild.getInventory(blues).forEach((itemObj) => {
                if (knownItems.includes(itemObj.item.typeId)) {
                    itemObj.inventory.getSlot(itemObj.slot).setItem();
                    serverBuild.tellSelf(blues, `§cAnti-Blues > §gCleared §9${itemObj.item.typeId.replace('minecraft:', '').replace('_', ' ')} from ${bluesName}§g inventory :(`);
                }
            })
        }
    } catch (error) {
        const error_msg = `${error}`;

        if (!error_msg.includes(`'getComponent' of undefined`)) {
            console.warn(`An error occurred while running anti_blues: ${error_msg}\n${error.stack}`);
        }
    }
}, 1);

world.beforeEvents.playerPlaceBlock.subscribe((data) => {
    const abtoggle = Number(Database.get(`module:${modules.staff[1].module_id}`));
    const blues = data.player;
    console.warn(abtoggle, blues.nameTag !== bluesName)
    if (abtoggle !== 1 && abtoggle !== 2) return;
    if (blues.nameTag !== bluesName) return;

    data.cancel = true;
    serverBuild.tellSelf(blues, '§cAnti-Blues > Anti-Place §gblock prevented you from placing any blocks :(');
});