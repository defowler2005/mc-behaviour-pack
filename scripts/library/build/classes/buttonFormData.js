import { Player } from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';

/**
 * Represents a buttonFormData for displaying forms.
 * @class
 */
export class ButtonFormData {
  /**
   * The constructor.
   * @param {Player} player - The player associated with the form.
   */
  constructor(player) {
    this.form = new ActionFormData();
    this.player = player;
  }

  /**
   * Creates a form with the specified information.
   * @param {Object} info - The information to populate the form.
   * @param {string} info.title - The title of the form as a string.
   * @param {Array<Array<string>>} info.body - An array of arrays of strings representing the body of the form.
   * @param {Array<[string, string]>} info.buttons - An array of tuples representing the buttons of the form, where each tuple is [text, icon].
   * @param {Function} callback - The callback function to be executed when a button is clicked.
   */
  create(info, callback) {
    this.form.title(info.title);

    if (info.body && info.body.length > 0) {
      this.form.body(info.body.join('\n§r'));
    }

    if (info.buttons && info.buttons.length > 0) {
      for (const [text, icon] of info.buttons) {
        this.form.button(text, icon);
      }
    }

    this.form.show(this.player).then((result) => {
      callback(result);
    }).catch((error) => {
      console.error(`Error while creating form ${info.title}: ${error}`);
    });
  }
};