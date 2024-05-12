import { Player, world } from '@minecraft/server';
import { commandBuild } from '../../../library/build/classes/commandBuilder.js';
import { configurations } from '../../../library/build/configurations.js';
import { buttonFormData } from '../../../library/build/classes/buttonFormData.js';
//Errorful.
/**
 * The gui object containg all UI's.
 */
const gui = {
    staff: {
        main: (player) => { },
modules: (player) => {
            const modules = new inputFormData(player);
            const formToggles = [];
            for (let i = 0; i < moduleList.length; i++) {
                const module = moduleList[i];
                formToggles.push([
                    `${module.moduleDisplayName}`,
                    databaseBuild.get(module.databaseId) ? true : false
                ]);
            };

            modules.create(
                {
                    title: 'Modules',
                    slider: [],
                    toggle: formToggles,
                    dropdown: [],
                    textField: []
                }, (result) => {
                    for (let togNmbr = 0; togNmbr < result.formValues.length; togNmbr++) {
                        const newToggle = result.formValues[togNmbr];
                        const module = moduleList[togNmbr];
                        databaseBuild.set(module.databaseId, newToggle);
                        serverBuild.sendMsg(`Module §e${module.moduleDisplayName}§f was toggled §a${newToggle ? `§aOn` : `§4Off`}`, true);
                    }
                }
            );
        },
    },
    player: {
        main: (player) => { 
            const main = new buttonFormData(player);
            main.create(
                {
                    title: 'Main',
                    
                }
            )
        }
    }
};

commandBuild.create(
    {
        name: 'gui',
        description: 'The ease of access utility gui',
        isStaff: false,
        aliases: ['ui'],
        examples: ['gui', 'ui'],
        usage: ['gui', 'ui']
    }, (data, args) => {
        /**
         * @type {Player}
         */
        const player = data.sender;
        player.sendMessage('Move to show the UI.');
    }, (data, args) => {
        /**
         * @type {Player}
         */
        const player = data.sender;
        if (player.hasTag('welcome')) {
            gui.welcome.main(player);
            return;
        };
        if (player.hasTag(configurations.staffTag)) gui.staff.main(player);
        else return gui.player.main(player);
    }
);
