import { system, world } from "@minecraft/server";

class serverBuilder {
    constructor() {
        /** @type {Array<Player>} */
        this.allStaff = world.getPlayers({ tags: [configurations.staff_tag] });
        /** @type {Array<Player>} */
        this.allNonStaff = world.getPlayers({ excludeTags: [configurations.staff_tag] });
        /** @type {Array<Player>} */
        this.allPlayers = world.getAllPlayers();
    };

    /**
     * Check if the world is ready.
     * @returns {Boolean} Returns true if the world is ready to run scripts, returns false if the world has not be loaded yet.
     */
    isLoaded() {
        let worldLoaded = false;

        const run = system.runInterval(() => {
            const overworld = world.getDimension('overworld');
            const isReady = overworld.runCommand('testfor @a').successCount !== 0;

            if (!worldLoaded && isReady) {
                worldLoaded = true;
                console.warn('World ready!');
                system.clearRun(run);
            } else if (!isReady) console.warn('World not ready!');
        }); return worldLoaded;
    };

    /**
     * Send a message to all players within the current world.
     * @param {String} message
     * @param {Player} ignoredSelfPlayer - An optional parameter for ignoring the player who initiated the message.
     */
    tellServer(message, ignoredSelfPlayer) {
        if (ignoredSelfPlayer) {
            this.allPlayers.filter((plr) => plr.name !== ignoredSelfPlayer.name).forEach((player) => {
                player.sendMessage(`${message?.trim()}`);
            })
        } else {
            this.allPlayers.forEach((player) => {
                player.sendMessage(`${message?.trim()}`);
            })
        }
    };

    /**
     * Send a message to all staff players within the current world.
     * @param {String} message
     */
    tellStaff(message) {
        this.allNonStaff.forEach((player) => {
            player.sendMessage(`${message?.trim()}`);
        })
    };

    /**
     * Send a message to all non staff players within the current world.
     * @param {String} message
     */
    tellNonStaff(message) {
        this.allStaff.forEach((player) => {
            player.sendMessage(`${message?.trim()}`);
        })
    };

    /**
     * Execute an array of commands at once.
     * @param {Array<String>} cmds
     * @returns {Promise<CommandResult>}
     */
    executeCommands(cmds) {
        let commandE;
        for (const cmd of cmds) {
            commandE = this.dimensions.runCommandAsync(cmd);
        }; return commandE;
    };
};

export const serverBuild = new serverBuilder();