import { world, Player, system } from '@minecraft/server';
import { commandBuild } from '../../../library/build/classes/commandBuilder.js';
import { buttonFormData } from '../../../library/build/classes/buttonFormData.js';
import { inputFormData } from '../../../library/build/classes/inputFormData.js';
import { Database } from '../../../library/build/classes/databaseBuilder.js';
import { configurations } from '../../../library/build/configurations.js';
import { serverBuild } from '../../../library/build/classes/serverBuilder.js';

/** The default basic toggle values for the GUI. */
const toggle_modes = ['§2ON', '§4OFF'];

/**
 * @typedef {Object} modules - The GUI modules object.
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
            toggles: ['§4OFF', '§2ON'],
            index_id: 0
        },
        {
            disp_name: 'Test',
            module_id: 'test',
            toggles: ['§4OFF', '§2ON', 'Another option'],
            index_id: 1
        }
    ],
    /**
    *  An array of {@link modules} objects for GUI modules for non-staff players.
    */
    player: [
        {
            disp_name: '',
            module_id: '',
            toggles: ['§2ON', '§4OFF'],
            index_id: 0
        }
    ]
};

/**
 * The function to set the modules within the world.
 * @param {Player} player - The player object.
 * @param {typeof modules.player[number]} module - The module object.
 * @param {number} new_value - The new value to set for the module.
 * @param {number} old_value - The old value of the module before the update.
 * @type {(player: Player, module: typeof modules.player[number], new_value: number, old_value: number) => Function}
 */
const setModule = (player, module, new_value) => {
    const old_value = Number(Database.get(module.module_id));

    if (old_value !== new_value) {
        //Somewhat errorful on setting DB.
        console.warn(`old_value: ${old_value}\nnew_value: ${new_value}`);
        serverBuild.tellServer(`§bPlayer §c${player.name} §bhas set the module §g${module.disp_name}§b to §r${module.toggles[new_value]}`);
        Database.set(`module:${module.module_id}`, new_value);
    }
};

/**
 * The full GUI scheme.
 */
const gui = {
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
        /** * @param {Player} player */
        main: (player) => {
            //console.warn('Non staff!');
            const main_player = new buttonFormData(player);

            main_player.create(
                {
                    title: 'Non staff UI.',
                    body: [
                        ['Non staff player utility UI.']
                    ],
                    button: [
                        ['Some btn']
                    ]
                }, (result) => {
                    if (result.canceled) return;
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
                    const current_value = Number(Database.get(module.module_id));
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
                        if (!result.formValues.length < 0) return;
                        result.formValues.forEach((v, i) => {
                            const new_value = Number(v);
                            const module = modules.staff[i];
                            setModule(player, module, new_value);
                        });
                    }
                );
            } catch (error) {
                console.error(error)
            }

        }

    }
};

commandBuild.create(
    {
        name: 'gui',
        description: 'The utility UI for easy usage',
        aliases: ['ui'],
        is_staff: false,
        cancel_message: true
    }, (data, args) => {
        /**
        * @type {Player}
        */
        const player = data.sender;

        player.sendMessage('Move to show UI.');
    }, (data, args) => {
        /**
        * @type {Player}
        */
        const player = data.sender;

        if (player.hasTag('welcome') === false) return gui.welcome.main(player);
        if (player.hasTag(configurations.staff_tag) === true) return gui.staff.main(player);
        else gui.player.main(player);
    }
);