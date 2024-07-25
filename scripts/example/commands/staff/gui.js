import { world, Player, system } from '@minecraft/server';
import { commandBuild, playerBuild, serverBuild, Database, inputFormData, buttonFormData } from '../../../library/Minecraft.js';
import { configurations } from '../../../library/build/configurations.js';
import { scoreTest, setScore } from '../../../library/utils/score_system.js';
import { randomNumber } from '../../../library/utils/randomNumber.js';

/** The default basic toggle values for the GUI. */
export const basic_toggles = ['§4OFF', '§2ON'];

/**
 * @typedef {Object} modules - The GUI modules object, Note 'module' prefix is not required for the moduleId here.
 * @property {string} displayName - The display name of the module.
 * @property {string} moduleId - The ID to be used in the Database.
 * @property {string[]} toggles - The array of toggle options.
 * @property {number} indexId - The index ID in order.
 */
export const modules = {
    /**
     * An array of {@link modules} objects representing GUI modules for staff users.
     */
    staff: [
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
            toggles: ['§4OFF', '§2Self stats', '§3Server stats', '§6Server logo only'],
            index_id: 2
        }
    ],
    /**
    *  An array of {@link modules} objects for GUI modules for non-staff players.
    */
    player: [
        {
            disp_name: 'Display sidebar',
            module_id: 'dsbtoggle',
            toggles: ['§4OFF', '§2Self stats', '§3Server stats', '§6Server logo only'],
            index_id: 0
        }
    ],
    blues: [
        {
            disp_name: 'Anti-Blues',
            module_id: 'abtoggle',
            toggles: ['§4OFF', '§2All combined', '§3Clear items', '§6Prevent placing blocks'],
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
 * @type {(player: Player, module: typeof modules.staff[number], new_value: number) => Function}
 * @returns {Number} - 0 represents no issues arose, 1 represents one or more issues arose.
 */
const setModule = (player, module, new_value) => {
    try {
        const old_value = Number(Database.get(`module:${module.module_id}`));

        if (old_value === new_value) return;
        serverBuild.tellServer(`§bPlayer §c${player.name} §bhas set the module §g${module.disp_name}§b to §r${module.toggles[new_value]}`);
        Database.set(`module:${module.module_id}`, new_value);
    } catch (error) {
        console.warn(`An error occurred while setting modules: ${error}\n${error.stack}`);
        return 1;
    }
};


/**
 * The full GUI scheme.
 */
export const gui = {
    blues: {
        decide_fate: (player) => {
            const decideForm = new inputFormData();
            const abtoggle = Number(Database.get(`module:${modules.blues[0].module_id}`));
            const isBlues = player.name === 'Blues 8s bit';

            decideForm.create(
                {
                    title: isBlues ? `Decide your fate...` : 'Decide his fate',
                    dropdown: [
                        ['Anti-Blues', modules.blues[0].toggles, !!abtoggle]
                    ]
                },
                (formResults) => {
                    const result = formResults.formValues[0];
                    if (result.canceled) {
                        serverBuild.tellSelf(player, 'Anti-Blues > Alright your fate has been auto selected... §2All combined');
                        Database.set(`module:${modules.blues[0].module_id}`, result);
                        return;
                    }
                    if (result === 0) {
                        serverBuild.tellSelf(player.name, 'Anti-Blues > Alright your fate has been auto selected because §4OFF §ris not a valid option§r... §2All combined');
                        Database.set(`module:${modules.blues[0].module_id}`, 1);
                        setModule(player, modules.blues[0], 1);
                    }
                    serverBuild.tellSelf(player, `Anti-Blues > Alright your fate has been set to ${modules.blues[0].toggles[result]}`);
                    Database.set(`module:${modules.blues[0].module_id}`, result);
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
                    player.addTag('welcome');
                    if (player.hasTag(configurations.staff_tag) === true) return gui.staff.main(player);
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
                        ['Stats'],
                        ['TPA options']
                    ]
                }, (result) => {
                    if (result.canceled) return;
                    if (result.selection === 0) gui.player.statsSelection(player);
                    if (result.selection === 1) gui.player.mainTpaMenu(player);
                }
            );
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
                    const target = allPlayers.find((plr) => plr.name === allPlayers[result.formValues[0]].name);
                    console.warn(target.name);
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
            const recipient = world.getPlayers().filter((plr) => scoreTest(plr, 'tpa') === scoreTest(player, 'tpa') && player.name !== plr.name);

            stats.create(
                {
                    title: target.name === player.name ? 'Self stats' : `${target.name}'s stats`,
                    body: [
                        ['§d§lCombat:'],
                        [`§bKills §7:§c${kills} §bDeaths §7:§c${deaths} §bKillstreak §7:§c${killstreak}`],
                        ['\n'],
                        [`§dTPA:`],
                        [`§bCurrent TPA channel: §c${currentTpaChannel ? currentTpaChannel : 'No requests.'}`],
                        [`§bCurrent TPA recipient: §c${recipient.name ? recipient.name : 'No requests.'}`]
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
                        ['Send a TPA request']
                    ]
                }, (result) => {
                    if (result.canceled) return;
                    if (result.selection === 0) gui.player.tpaRequest(player);
                }
            );
        },
        tpaRequest: (player) => {
            const tpaRequest = new inputFormData(player);
            const allPlayers = world.getAllPlayers();

            tpaRequest.create(
                {
                    title: 'Select a player',
                    dropdown: [
                        ['Players', allPlayers.map((plr) => plr.name), 0]
                    ]
                }, (result) => {
                    if (result.canceled) return;
                    const target = allPlayers.find((plr) => plr.name === allPlayers[result.formValues[0]].name);
                    const randomNumberIndex = randomNumber(100, 9999999);
                    setScore(player, 'tpa', randomNumberIndex);
                    setScore(target, 'tpa', randomNumberIndex);
                    target.sendMessage(`Player ${player.name} has sent a TPA request to you.`);
                    player.sendMessage(`Successfully send a TPA request to ${target.name}.`);
                }
            );
        }
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
                        ['Utilities']
                    ]
                }, (result) => {
                    if (result.canceled) return;
                    if (result.selection === 0) gui.staff.utility_modules(player);
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
                            console.warn(modules.staff[b].disp_name)

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

        if (playerBuild.hasTag(player, 'welcome') === false) {
            return gui.welcome.main(player);
        }

        if (playerBuild.hasTag(player, configurations.staff_tag) && player.isOp() && args[0] !== 'nonstaff') {
            return gui.staff.main(player);
        } else {
            gui.player.main(player);
        }
    }
);