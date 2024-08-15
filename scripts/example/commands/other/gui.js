import { ChatSendBeforeEvent, Player, system, world } from '@minecraft/server';
import { buttonFormData, commandBuild, Database, inputFormData, queryFormData, playerBuild, serverBuild } from '../../../library/Minecraft.js';
import { configurations } from '../../../library/build/configurations.js';
import { randomNumber } from '../../../library/utils/randomNumber.js';
import { scoreTest, setScore } from '../../../library/utils/score_system.js';
import { ActionFormResponse, MessageFormResponse, ModalFormResponse } from '@minecraft/server-ui';

/** - The default basic toggle values for the GUI. */
export const basic_toggles = ['§4OFF', '§2ON'];

/**
 * @typedef {Object} modules - The GUI modules object, Note the 'module:' prefix is not required for the moduleId here.
 * @property {String} displayName - The display name of the module.
 * @property {String} moduleId - The ID to be used in the Database.
 * @property {String[]} toggles - The array of toggle options.
 * @property {Number} indexId - The index ID in order.
 */
export const modules = {
    /**
     * An array of {@link modules} objects representing GUI modules for staff users.
     */
    staff: [ // Staff members modules.
        {
            disp_name: 'Player commands',
            module_id: 'apctoggle',
            toggles: basic_toggles,
            index_id: 0
        },
        {
            disp_name: 'Chat Ranks',
            module_id: 'crtoggle',
            toggles: basic_toggles,
            index_id: 1
        },
        {
            disp_name: 'Display sidebar',
            module_id: 'dsbtoggle',
            toggles: [basic_toggles[0], '§2Self stats', '§3Server stats'],
            index_id: 2
        }
    ],
    /**
     *  An array of {@link modules} objects for GUI modules for non-staff players.
     */
    player: [ // Non staff modules.
        {
            disp_name: 'Display sidebar',
            module_id: 'dsbtoggle',
            toggles: [basic_toggles[0], '§2Self stats', '§3Server stats'],
            index_id: 0
        }
    ],
    blues: [ // Modules designed for Blues 8s bit.
        {
            disp_name: 'Anti-Blues',
            module_id: 'abtoggle',
            toggles: [basic_toggles[0], '§2All combined', '§3Clear items', '§6Prevent placing/breaking blocks'],
            index_id: 0
        }
    ]
};

/**
 * Sets the module value for a player or nonstaff player.
 * @param {Player} player - The player object.
 * @param {typeof modules.staff[Number]} module - The module object.
 * @param {Number} newValue - The new value to set for the module.
 * @param {Player} [nonstaffPlayer] - Optional nonstaff player object.
 * @returns {Number} - 0 if successful, 1 if an error occurred.
 */
const setModule = (player, module, newValue, nonstaffPlayer = undefined) => {
    try {
        const moduleKey = `module:${module.module_id}`;
        const oldValue = nonstaffPlayer ? Number(Database.get(moduleKey, nonstaffPlayer)) : Number(Database.get(moduleKey));

        if (oldValue === newValue) return 0;

        const message = `§b${nonstaffPlayer ? 'Successfully set the module' : `Player §c${player.name} §bhas set the module`} §g${module.disp_name}§b to §r${module.toggles[newValue]}`;

        if (nonstaffPlayer) {
            serverBuild.tellSelf(nonstaffPlayer, message);
            Database.set(moduleKey, newValue, nonstaffPlayer);
        } else {
            serverBuild.tellServer(message);
            Database.set(moduleKey, newValue);
        }
        return 0;
    } catch (error) {
        console.warn(`An error occurred while setting modules ${nonstaffPlayer ? `for ${nonstaffPlayer.name}` : ''}: ${error}\n${error.stack}`);
        return 1;
    }
};

/**
 * - The full GUI scheme, supported for staff and nonstaff.
 */
export const gui = {
    blues: {
        /**
         * A menu for selecting Blues 8s bit's fate.
         * @param {Player} player
         */
        decide_fate: (player) => {
            const decideForm = new inputFormData(player);
            const abtoggle = Number(Database.get(`module:${modules.blues[0].module_id}`));
            const isBlues = player.name === 'Blues 8s bit';

            decideForm.create(
                {
                    title: isBlues ? `Decide your fate...` : 'Decide his fate',
                    dropdown: [
                        ['Anti-Blues', modules.blues[0].toggles, !!abtoggle]
                    ]
                },
                (result) => {

                }
            )
        }
    },
    /**
     * The screen seen when the player first joined or sees this UI.
     */
    welcome: {
        /** * @param {Player} player */
        main: (player) => {
            //console.warn('Welcome!');
            const main_welcome = new buttonFormData(player);

            main_welcome.create(
                {
                    title: 'Welcome UI.',
                    body: [
                        [`Welcome to §cdefowler2005's world!`]
                    ],
                    button: [
                        ['Close']
                    ]
                }, (result) => {
                    serverBuild.addTag(player, 'welcome');
                    if (serverBuild.hasTag(configurations.staff_tag) === true) return gui.staff.main(player);
                    else gui.player.main(player);
                }
            );
        }
    },
    /**
     * The screen used if the player is NOT staff.
     */
    player: {
        /**
         * @param {Player} player
         */
        main: (player) => {
            const main_player = new buttonFormData(player);

            main_player.create(
                {
                    title: 'Non staff UI.',
                    body: [
                        ['Non staff player utility UI.']
                    ],
                    button: [
                        ['Modules'],
                        ['Stats'],
                        ['TPA options']
                    ]
                }, (result) => {
                    if (result.selection === 0) gui.player.modules(player);
                    if (result.selection === 1) gui.player.statsSelection(player);
                    if (result.selection === 2) gui.player.mainTpaMenu(player);
                }
            );
        },
        /**
         * A menu for nonstaff, modifying self modules.
         * @param {Player} player 
         */
        modules: (player) => {
            try {
                const utility_modules = new inputFormData(player);

                let allPlayerModuleToggles = [];
                let allPlayerModuleDropdowns = [];

                for (let module of modules.player) {
                    const current_value = Number(Database.get(`module:${module.module_id}`, player));
                    if (module.toggles.length === 2) {
                        allPlayerModuleToggles.push([module.disp_name, !!current_value]); // Push single on off toggles.
                    } else {
                        allPlayerModuleDropdowns.push([module.disp_name, module.toggles, current_value]); // Push dropdown toggles.
                    }
                };

                utility_modules.create(
                    {
                        title: 'Toggle utilities.',
                        dropdown: allPlayerModuleDropdowns,
                        toggle: allPlayerModuleToggles
                    }, (result) => {
                        result.formValues?.forEach((a, b) => {
                            setModule(player, modules.player[b], Number(a), player);
                        })
                    }
                );
            } catch (error) {
                console.error(error)
            };
        },

        /**
         * A menu for selecting your stats or another player's stats.
         * @param {Player} player 
         */
        statsSelection: (player) => {
            const statsSelection = new buttonFormData(player);

            statsSelection.create(
                {
                    title: 'Stats selection',
                    body: [
                        ['Select an option.']
                    ],
                    button: [
                        ['Self stats'],
                        ['Other stats']
                    ]
                },
                /** @param {ActionFormResponse} result */
                (result) => {
                    if (result.selection === 0) gui.player.stats(player);
                    if (result.selection === 1) gui.player.otherStatsSelection(player);
                }
            );
        },
        /**
         * A menu for selecting another player to view all there possible stats.
         * @param {Player} player
         */
        otherStatsSelection: (player) => {
            const statsSelection = new inputFormData(player);
            const allPlayers = world.getAllPlayers();

            statsSelection.create(
                {
                    title: 'Select a player',
                    dropdown: [
                        ['Players', allPlayers.map((plr) => plr.name), 0]
                    ]
                }, (result) => {
                    const target = allPlayers.find((plr) => allPlayers[result.formValues[0]].name === plr.name);
                    gui.player.stats(player, target);
                }
            );
        },
        /**
         * A menu for viewng all possible stats of a player.
         * @param {Player} player
         * @param {Player} target
         */
        stats: (player, target = player) => {
            const stats = new buttonFormData(player);
            const kills = scoreTest(target, 'kills');
            const deaths = scoreTest(target, 'deaths');
            const killstreak = scoreTest(target, 'killstreak');
            const currentTpaChannel = scoreTest(player, 'tpa');
            const recipient = world.getPlayers().filter((plr) => scoreTest(plr, 'tpa') === currentTpaChannel && player.name !== plr.name)[0];
            console.warn(currentTpaChannel);
            stats.create(
                {
                    title: target.name === player.name ? 'Self stats' : `${target.name}'s stats`,
                    body: [
                        ['§d§lCombat:'],
                        [`§bKills §7:§c${kills} §bDeaths §7:§c${deaths} §bKillstreak §7:§c${killstreak}`],
                        ['\n'],
                        [`§dTPA:`],
                        [`§bCurrent TPA channel: §c${currentTpaChannel ? currentTpaChannel : 'No requests.'}`],
                        [`§bCurrent TPA recipient: §c${recipient ? recipient.name : 'No requests.'}`]
                    ],
                    button: [
                        ['Back']
                    ]
                },
                /** @param {ActionFormResponse} result */
                (result) => {
                    if (result.selection === 0) gui.player.main(player);
                }
            );
        },
        mainTpaMenu: (player) => {
            const mainTpaMenu = new buttonFormData(player);

            mainTpaMenu.create(
                {
                    title: 'Main TPA menu',
                    body: [
                        ['Select an option']
                    ],
                    button: [
                        ['Send a TPA request'],
                        ['Manage a request']
                    ]
                },
                /** @param {ActionFormResponse} result */
                (result) => {
                    if (result.selection === 0) gui.player.tpaRequest(player);
                    if (result.selection === 1) gui.player.manageRequest(player);
                }
            );
        },
        /**
         * @param {Player} player
         */
        tpaRequest: (player) => {
            const tpaRequest = new inputFormData(player);
            const allPlayers = world.getPlayers().filter((plr) => plr.name !== player.name);

            tpaRequest.create(
                {
                    title: 'Select a player',
                    dropdown: [
                        ['Players', allPlayers.length > 1 ? allPlayers.map((plr) => plr.name) : ['§8No players§r'], 0]
                    ]
                },
                /** @param {ActionFormResponse} result */
                (result) => {
                    const target = allPlayers[result.formValues[0]];

                    if (target) {
                        const randomNumberIndex = randomNumber(100, 9999999);
                        setScore(player, 'tpa', randomNumberIndex);
                        setScore(target, 'tpa', randomNumberIndex);
                        serverBuild.tellSelf(target, `Player ${player.name} has sent a TPA request to you.`);
                        serverBuild.tellSelf(player, `Successfully sent a TPA request to ${target.name}.`);
                    } else {
                        // serverBuild.tellSelf(player, '§4No other players in the world.');
                        return;
                    }
                }
            );
        },
        /**
         * @param {Player} player
         */
        manageRequest: (player) => {
            const manageRequest = new queryFormData(player);

            manageRequest.create(
                {
                    title: 'Request management',
                    body: [
                        ['Do you wish to accept this request?'],
                        ['If no, cancel and delete this request.']
                    ],
                    button0: ['§4No'],
                    button1: ['§2Yes']
                },
                /** @param {MessageFormResponse} result */
                (result) => {
                    const currentTpaChannel = scoreTest(player, 'tpa');
                    const recipient = world.getPlayers().filter((plr) => scoreTest(plr, 'tpa') === currentTpaChannel && player.name !== plr.name)[0];

                    if (result.selection === 1) {
                        serverBuild.tellSelf(recipient, `Your TPA request has been accepted by ${player.name}.`);
                        serverBuild.tellSelf(player, `You have accepted the TPA request from ${recipient.name}.`);
                    } else if (result.selection === 0) {
                        setScore(player, 'tpa', 0);
                        setScore(recipient, 'tpa', 0);
                        serverBuild.tellSelf(recipient, `Your TPA request has been declined by ${player.name}.`);
                        serverBuild.tellSelf(player, `You have declined the TPA request from ${recipient.name}.`);
                    }
                }
            )
        },
    },
    /**
     * The screen used if the player is staff.
     */
    staff: {
        /** * @param {Player} player */
        main: (player) => {
            //console.warn('Staff!');
            const main_staff = new buttonFormData(player);

            main_staff.create(
                {
                    title: 'Staff UI.',
                    body: [
                        ['Staff utility UI.']
                    ],
                    button: [
                        ['Modules']
                    ]
                },
                /** @param {ActionFormResponse} result */
                (result) => {
                    if (result.selection === 0) gui.staff.modules(player);
                }
            );
        },
        /** * @param {Player} player */
        modules: (player) => {
            const main_modules = new buttonFormData(player);

            main_modules.create(
                {
                    title: 'Module',
                    body: [
                        ['Staff utility UI.']
                    ],
                    button: [
                        ['Utilities'],
                        ['Blues 8s bit options']
                    ]
                },
                /** @param {ActionFormResponse} result */
                (result) => {
                    if (result.selection === 0) gui.staff.utility_modules(player);
                    if (result.selection === 1) gui.blues.decide_fate(player);
                }
            );
        },
        /** * @param {Player} player */
        utility_modules: (player) => {
            try {
                const utility_modules = new inputFormData(player);

                let allStaffModuleToggles = [];
                let allStaffModuleDropdowns = [];

                for (let module of modules.staff) {
                    const current_value = Number(Database.get(`module:${module.module_id}`));
                    if (module.toggles.length === 2) {
                        allStaffModuleToggles.push([module.disp_name, !!current_value]);
                    } else {
                        allStaffModuleDropdowns.push([module.disp_name, module.toggles, current_value]);
                    }
                };

                utility_modules.create(
                    {
                        title: 'Toggle utilities.',
                        dropdown: allStaffModuleDropdowns,
                        toggle: allStaffModuleToggles
                    },
                    /** @param {ModalFormResponse} result */
                    (result) => {
                        result.formValues?.forEach((a, b) => {
                            setModule(player, modules.staff[b], Number(a));
                        })
                    }
                );
            } catch (error) {
                console.error(error)
            };
        }
    }
};

commandBuild.create(
    {
        name: 'gui',
        description: 'The utility UI for easy usage',
        usage: ['gui [ nonstaff ]'],
        example: ['gui', 'gui nonstaff'],
        aliases: ['ui'],
        is_staff: false,
        cancel_message: true
    }, (data, args) => {
        /**
        * @type {Player}
        */
        const player = data.sender;

        serverBuild.tellSelf(player, '§aMove to show UI.');
    },
    /**
     * @param {ChatSendBeforeEvent} data
     * @param {Array<String>} args
     */
    (data, args) => {
        const player = data.sender;

        try {
            if (playerBuild.hasTag(player, 'welcome') === false) return gui.welcome.main(player);
            if (playerBuild.hasTag(player, configurations.staff_tag) && player.isOp() && args[0] !== 'nonstaff') return gui.staff.main(player);
            else gui.player.main(player);
        } catch (error) {
            console.warn(`An error occured while running gui: ${error}\n${error.stack}`);
        }
    }
);