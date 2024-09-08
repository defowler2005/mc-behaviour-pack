/**
 * The configurations for the setup.
 */
export const configurations = {
    /** Command prefix in chat. */
    cmd_prefix: 'DF.',
    /** Staff tag. */
    staff_tag: 'hosen24576jg',
    /** Display name for script wide messages. */
    system_display_name: `§cdefowler2005's pack`,
};

/** The default basic toggle values for the GUI. */
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