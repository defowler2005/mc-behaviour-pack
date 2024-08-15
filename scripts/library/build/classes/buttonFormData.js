import { Player } from '@minecraft/server';
import { ActionFormData, ActionFormResponse } from '@minecraft/server-ui';

/**
 * Represents a form for buttons.
 * @class
 * @example
     * const main = new buttonFormData(player);
     * main.create(
     *   {
     *     title: 'Title',
     *     body: [
     *         ['Body']
     *     ],
     *     button: [
     *       ['Button 0']
     *     ]
     *   },
     *   (result) => {
     *     console.warn(`Results: ${result.selection}`);
     *   }
     * );
     */
export class buttonFormData {

    /**
     * Creates a new instance of buttonFormData.
     * @param {Player} player - The player object.
     */
    constructor(player) {

        /**
         * The form data object.
         * @type {ActionFormData}
         */
        this.form = new ActionFormData();

        /**
         * The player object.
         * @type {Player}
         */
        this.player = player;
    }

    /**
     * Creates the form with the specified information and executes the callback when submitted.
     * @param {Object} info - The information for the form.
     * @param {string} info.title - The title of the form.
     * @param {Array<[String]>} info.body - The body text of the form.
     * @param {Array<[String, String]>} info.button - The buttons to add to the form, each represented by a name and an icon.
     * @param {Function(ActionFormResponse): Void} callback - The callback function to execute when the form is submitted.
     */
    create(info, callback) {
        try {
            this.form.title(info.title);
            this.form.body(info.body.join('\n§r'));
            for (const [name, icon] of info.button) this.form.button(name, icon);
            this.form.show(this.player).then(
                /** @param {ActionFormResponse} result */
                (result) => {
                    if (result.canceled) return;
                    callback(result)
                }
            );
        } catch (error) {
            console.error(`An error occured while creating the buttonFormData form ${info.title}: ${error}\n${error.stack}`);
        }
    }
};
