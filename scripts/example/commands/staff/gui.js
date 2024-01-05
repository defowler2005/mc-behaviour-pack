import { commandBuild } from '../../../library/build/classes/commandBuilder.js';
import { buttonFormData } from '../../../library/build/classes/buttonFormData.js';
import { optionFormData } from '../../../library/build/classes/optionFormData.js';

/**
 * Array of modules for both staff and players.
 * @type {Array<Object>}
 * @property {String} displayName - The string that the player will see.
 * @property {String} moduleId - The string to be used for the dynamic property.
 * @property {Number} indexId - The number for the index of the module.
 */
export const staffModulesList = [
  {
    displayName: 'Chat commands',
    moduleId: 'module:chat_commands',
    indexId: 0,
  },
  {
    displayName: 'Chat ranks',
    moduleId: 'module:chat_ranks',
    indexId: 0,
  }
];

/**
 * The GUI object containing all menus.
 * @type {Object}
 * @property {Object} staff - The staff menu object.
 * @property {Object} player - The player menu object.
 * @property {Object} welcome - The welcome menu object.
 */

export const gui = {
  staff: {
    main: (player) => {
      const main = new buttonFormData(player);
      main.create(
        {
          title: 'Main staff menu',
          body: [
            ['Select an options']
          ],
          buttons: [
            ['Modules', 'textures/ui/gear']
          ],
        }, (result) => {
          switch (result.selection) {
            case 0:
              gui.staff.modules(player);
              break;
            default:
              return;
          }
        }
      )
    },
    modules: (player) => {
      const modules = new optionFormData(player);
      modules.create(
        {
          title: 'Modules',
          toggle: [],
        },
        (result) => { });
    },
  },
  player: {
    main: (player) => {
      console.warn('Player main!');
    }
  },
  welcome: {
    main: (player) => {
      console.warn('Welcome main!');
    }
  }
};

commandBuild.create(
  {
    name: 'gui',
    description: 'The interactive UI',
    is_staff: false
  }, (player) => {
    player.sendMessage('§2Move to show the UI.');
  }, (player) => {
    if (player.hasTag('staff')) gui.staff.main(player);
    else if (!player.hasTag('welcome')) {
      gui.welcome.main(player);
      player.addTag('welcome');
    } else gui.player.main(player);
  }
);