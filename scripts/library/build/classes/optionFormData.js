import { Player } from '@minecraft/server';
import { ModalFormData } from '@minecraft/server-ui';

/**
 * Represents an optionFormData for displaying forms.
 * @class
 */
export class optionFormData {
  /**
   * The constructor.
   * @param {Player} player - The player associated with the form.
   */
  constructor(player) {
    this.form = new ModalFormData();
    this.player = player;
  }

  /**
   * Creates a form with the specified information.
   * @param {Object} info - The information to populate the form.
   * @param {string} info.title - The title of the form as a string.
   * @param {Array<[string, Array<[String]>]>} info.dropdown - An array of tuples representing the dropdown of the form.
   * @param {Array<[String, Number, Number, Number]>} info.slider - The array representing a title and three numbers.
   * @param {Array<[String, String, String]>} info.textField - The array representing a title and two strings.
   * @param {Array<[String, boolean]>} info.toggle - The array representing a title and a boolean.
   * @param {Function} callback - The callback function to be executed when a button is clicked.
   */
  create(info, callback) {
    this.form.title(info.title);

    if (info.dropdown && info.dropdown.length > 0) {
      for (const [title, arrayOptions, defaultOption] of info.dropdown) {
        this.form.dropdown(title, arrayOptions, defaultOption);
      }
    }

    if (info.slider && info.slider.length > 0) {
      for (const [title, minimumValue, maximumValue, defaultValue] of info.slider) {
        this.form.slider(title, minimumValue, maximumValue, defaultValue);
      }
    }

    if (info.textField && info.textField.length > 0) {
      for (const [title, arrayOptions, defaultOption] of info.textField) {
        this.form.textField(title, arrayOptions, defaultOption);
      }
    }

    if (info.toggle && info.toggle.length > 0) {
      for (const [title, defaultToggleState] of info.toggle) {
        this.form.toggle(title, defaultToggleState);
      }
    }

    this.form.show(this.player)
      .then((result) => callback(result))
      .catch((error) => {
        console.error(`Error while creating form ${info.title}: ${error}`);
      })
  }
};