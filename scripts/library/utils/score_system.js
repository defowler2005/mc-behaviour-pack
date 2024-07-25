import { Player, world } from "@minecraft/server";

/**
 * Get the value of a players scoreboard.
 * @param {Player} player
 * @param {String} objective
 */
export function scoreTest(player, objective) {
    const obj = world.scoreboard.getObjective(objective);

    const score = (obj ? obj.getScore(player) : 0);
    return score;
};