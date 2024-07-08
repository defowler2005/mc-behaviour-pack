import { world, Player, system } from '@minecraft/server';
import { commandBuild, playerBuild, serverBuild, Database, inputFormData, buttonFormData } from '../../../library/Minecraft.js';
import { configurations } from '../../../library/build/configurations.js';

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
            disp_name: 'Anti-Blues',
            module_id: 'abtoggle',
            toggles: ['§4OFF', '§2All combined', '§3Clear items', '§6Prevent placing blocks'],
            index_id: 1
        }
    ],
    /**
    *  An array of {@link modules} objects for GUI modules for non-staff players.
    */
    player: [
        {
            disp_name: 'Display sidebar',
            module_id: 'dsbtoggle',
            toggles: basic_toggles,
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
const setModule = (player, module, new_value, module_type) => {
    try {
        const old_value = Number(Database.get(`module:${module.module_id}`));

        if (module_type === 'blues') {
            `Anti-Blues > Alright your fate has been set to ${new_value === 0 ? 1 : module.toggles[new_value]} ${new_value === 0 ? '' : 'because §4OFF §ris not a valid option§r... §2All combined'}`
        } else {

            if (old_value !== new_value) {
                serverBuild.tellServer(`§bPlayer §c${player.name} §bhas set the module §g${module.disp_name}§b to §r${module.toggles[new_value]}`);
                Database.set(`module:${module.module_id}`, new_value);
                return 0;
            }
        }
    } catch (error) {
        console.warn(`An error occured while setting modules: ${error}\n${error.stack}`);
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
            const abtoggle = Database.get(`module:${modules.staff[1].module_id}`);

            decideForm.create(
                {
                    title: 'Decide your fate...',
                    dropdown: [
                        ['Anti-Blues', modules.staff[1].toggles, !!abtoggle]
                    ]
                },
                (result) => {
                    if (result.canceled) {
                        serverBuild.tellSelf(blues, 'Anti-Blues > Alright your fate has been auto selected... §2All combined');
                        Database.set(`module:${modules.staff[1].module_id}`, result.formValues[0]);
                        return;
                    }
                    if (result.formValues[0] === 0) {
                        serverBuild.tellSelf(blues, 'Anti-Blues > Alright your fate has been auto selected because §4OFF §ris not a valid option§r... §2All combined');
                        Database.set(`module:${modules.staff[1].module_id}`, 1);
                        setModule(player, modules.staff[1], 1, 'blues');
                    }
                    serverBuild.tellSelf(blues, `Anti-Blues > Alright your fate has been set to ${modules.staff[1].toggles[result.formValues[0]]} `);
                    Database.set(`module:${modules.staff[1].module_id}`, result.formValues[0]);
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
                            setModule(player, modules.staff[b], Number(a), 'staff_modules');
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

        if (playerBuild.hasTag(player, 'welcome') === false) return gui.welcome.main(player);
        if (playerBuild.hasTag(player, configurations.staff_tag) === true || player.isOp() === true) return gui.staff.main(player);
        else gui.player.main(player);
    }
);