import { system, world } from "@minecraft/server";
import { Database, inputFormData, playerBuild, serverBuild } from "../library/Minecraft.js";
import { gui, modules } from "./commands/staff/gui.js";
import { waitMove } from "../library/utils/wait_move.js";

const bluesName = 'defowler2OO5';

system.runInterval(() => {
    try {
        const blues = world.getPlayers({ name: bluesName })[0];
        const abtoggle = Database.get(`module:${modules.staff[1].module_id}`);

        if (abtoggle === 1 || abtoggle === 2) {
            playerBuild.getInventory(blues).forEach((itemObj) => {
                if (['minecraft:redstone_block', 'minecraft:dropper', 'minecraft:dispenser'].includes(itemObj.item)) {
                    itemObj.inventory?.clearAll();
                    serverBuild.tellSelf(blues, `Anti-Blues > Cleared ${itemObj.item.replace('minecraft:', '').replace('_', ' ')} inventory :(`);
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
    const abtoggle = Database.get(`module:${modules.staff[1].module_id}`);
    const blues = data.player;

    if (abtoggle !== 1 && abtoggle !== 2) return;
    if (blues.nameTag !== bluesName) return;

    data.cancel = true;
    serverBuild.tellSelf(blues, 'Anti-Blues > Anti-Place block prevented you from placing any blocks :(');
});

world.afterEvents.playerSpawn.subscribe((data) => {
    //Errorful.
    const abtoggle = Database.get(`module:${modules.staff[1].module_id}`);
    const blues = world.getPlayers({ name: data.player.nameTag })[0];
    if (abtoggle === 0) return;

    if (blues.nameTag === bluesName) {
        world.sendMessage((`${typeof blues} \nabtoggle: ${abtoggle}`));

        waitMove(blues, blues.location.x, blues.location.y, blues.location.z, () => {
            gui.blues.decide_fate(blues);
        });
    }
});