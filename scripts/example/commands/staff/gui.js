import { Player, system, world } from '@minecraft/server';
import { buttonFormData, commandBuild, Database, inputFormData, playerBuild, serverBuild } from '../../../library/Minecraft.js';
import { queryFormData } from '../../../library/build/classes/queryFormData.js';
import { configurations } from '../../../library/build/configurations.js';
import { randomNumber } from '../../../library/utils/randomNumber.js';
import { scoreTest, setScore } from '../../../library/utils/score_system.js';

/** - The default basic toggle values for the GUI. */
export const basic_toggles = ['§4OFF', '§2ON'];

/**
 * @typedef {Object} modules - The GUI modules object, Note the 'module:' prefix is not required for the moduleId here.
 * @property {string} displayName - The display name of the module.
 * @property {string} moduleId - The ID to be used in the Database.
 * @property {string[]} toggles - The array of toggle options.
 * @property {number} indexId - The index ID in order.
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
 * The function to set the modules within the world.
 * @param {Player} player - The player object.
 * @param {typeof modules.player[number]} module - The module object.
 * @param {String} module_type - Indicates wether a module was designed for staff or non staff, 
 * @param {Number} new_value - The new value to set for the module.
 * @param {Number} old_value - The old value of the module before the update.
 * @type {(module: typeof modules.staff[Number], new_value: Number, player: Player, nonstaff_player: Player) => Function}
 * @returns {Number} - 0 represents no issues arose, 1 represents one or more issues arose.
 */
const setModule = (player, module, new_value, nonstaff_player = undefined) => {
    try {
        if (!nonstaff_player) {
            const old_value = Number(Database.get(`module:${module.module_id}`));

            if (old_value === new_value) return;
            serverBuild.tellServer(`§bPlayer §c${player.name} §bhas set the module §g${module.disp_name}§b to §r${module.toggles[new_value]}`);
            Database.set(`module:${module.module_id}`, new_value);
        } else {
            const player_old_value = Number(Database.get(`module:${module.module_id}`, nonstaff_player));

            if (player_old_value === new_value) return;
            serverBuild.tellSelf(nonstaff_player, `§bSuccessfully set the module §g${module.disp_name}§b to §r${module.toggles[new_value]}`);
            Database.set(`module:${module.module_id}`, new_value, nonstaff_player);
        }
    } catch (error) {
        console.warn(`An error occurred while setting modules ${nonstaff_player ? `for ${nonstaff_player.name}` : ''}: ${error}\n${error.stack}`);
        return 1;
    }
};

/**
 * - The full GUI scheme, supported for staff and nonstaff.
 */
export const gui = {
    blues: {
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
                    if (result.canceled) return;


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
                    if (server.hasTag(configurations.staff_tag) === true) return gui.staff.main(player);
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
                    if (result.canceled) return;
                    if (result.selection === 0) gui.player.modules(player);
                    if (result.selection === 1) gui.player.statsSelection(player);
                    if (result.selection === 2) gui.player.mainTpaMenu(player);
                }
            );
        },
        modules: (player) => {
            try {
                const utility_modules = new inputFormData(player);

                let allPlayerModuleToggles = [];
                let allPlayerModuleDropdowns = [];

                for (let module of modules.player) {
                    const current_value = Number(Database.get(`module:${module.module_id}`, player));
                    if (module.toggles.length === 2) {
                        allPlayerModuleToggles.push([module.disp_name, !!current_value]);
                    } else {
                        allPlayerModuleDropdowns.push([module.disp_name, module.toggles, current_value]);
                    }
                };

                utility_modules.create(
                    {
                        title: 'Toggle utilities.',
                        dropdown: allPlayerModuleDropdowns,
                        toggle: allPlayerModuleToggles
                    }, (result) => {
                        if (result.canceled) return;
                        result.formValues?.forEach((a, b) => {
                            setModule(player, modules.player[b], Number(a), player);
                        })
                    }
                );
            } catch (error) {
                console.error(error)
            };
        },
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
                }, (result) => {
                    if (result.canceled) return;
                    if (result.selection === 0) gui.player.stats(player);
                    if (result.selection === 1) gui.player.otherStatsSelection(player);
                }
            );
        },
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
                    if (result.canceled) return;
                    const target = allPlayers.find((plr) => allPlayers[result.formValues[0]].name === plr.name);
                    gui.player.stats(player, target);
                }
            );
        },
        /**
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
                }, (result) => {
                    if (result.canceled) return;
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
                }, (result) => {
                    if (result.canceled) return;
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
                        ['Players', allPlayers.length > 0 ? allPlayers.map((plr) => plr.name) : ['§8No players§r'], 0]
                    ]
                }, (result) => {
                    if (result.canceled) return;
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
                        ['Otherwise, if no, cancel and delete this request.']
                    ],
                    button0: ['§4No'],
                    button1: ['§2Yes']
                }, (result) => {
                    if (result.canceled) return;
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
                }, (result) => {
                    if (result.canceled) return;
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
                }, (result) => {
                    if (result.canceled) return;
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
                    }, (result) => {
                        if (result.canceled) return;
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
        example: ['gui', 'gui'],
        aliases: ['ui'],
        is_staff: false,
        cancel_message: true
    }, (data, args) => {
        /**
        * @type {Player}
        */
        const player = data.sender;

        serverBuild.tellSelf(player, '§aMove to show UI.');
    }, (data, args) => {
        /**
        * @type {Player}
        */
        const player = data.sender;

        try {
            if (playerBuild.hasTag(player, 'welcome') === false) {
                return gui.welcome.main(player);
            }

            if (playerBuild.hasTag(player, configurations.staff_tag) && player.isOp() && args[0] !== 'nonstaff') {
                return gui.staff.main(player);
            } else {
                gui.player.main(player);
            }
        } catch (error) {
            console.warn(`An error occured while running gui: ${error}\n${error.stack}`);
        }
    }
);