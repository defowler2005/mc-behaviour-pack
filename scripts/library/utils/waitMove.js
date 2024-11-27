import { Player, system } from '@minecraft/server';

/**
 * Waits for the player to move and then executes a callback function.
 * @param {Player} target - The target player to monitor for movement.
 * @param {Number} x - The initial X-coordinate of the target player.
 * @param {Number} y - The initial Y-coordinate of the target player.
 * @param {Number} z - The initial Z-coordinate of the target player.
 * @example
 * waitMove(world.getAllPlayers[0], 0, 90, 0, () => { console.warn('Hello, world!') });
 * @param {Function} callback - The callback function to execute after the player moves.
 */

export function waitMove(target, x, y, z, callback) {
    const map1 = new Map();
    map1.set(target, [x, y, z]);
    system.runInterval(() => {
        for (const [target, [xOld, yOld, zOld]] of map1) {
            const { x: xc, y: yc, z: zc } = target.location;
            if (xOld !== xc || yOld !== yc || zOld !== zc) system.run(() => { map1.delete(target); callback() });
        }
    }, 2);
};