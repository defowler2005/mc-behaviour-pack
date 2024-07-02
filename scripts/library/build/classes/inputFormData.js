import { Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

/**
 * Represents a form with various input controls.
 */
export class inputFormData {
    /**
 * Creates a new instance of inputFormData.
 * @param {Player} player - The player object.
 * @example
 * const inputForm = new inputFormData(player);
 * inputForm.create(
 * {
 *    title: 'Title',
 *    slider: [
 *        ['Slider', 0, 10, 1]
 *    ],
 *    toggle: [
 *        ['Toggle', true]
 *    ],
 *    dropdown: [
 *        ['Dropdown', ['Option1', 'Option2', 'Option3'], 0]
 *    ],
 *    textField: [
 *        ['TextField', 'Hover Text1', 'Default Text1']
 *    ]
 * }, (result) => {
 *    console.warn(`Results: ${result.formValues}`);
 * });
 */

    constructor(player) {
        /**
         * The player object.
         * @type {Player}
         */
        this.player = player;

        /**
         * The form data object.
         * @type {ModalFormData}
         */
        this.form = new ModalFormData();
    }

    /**
     * Creates the form with the specified information and executes the callback when submitted.
     * @param {object} info - The information for the form.
     * @param {string} info.title - The title of the form.
     * @param {Array<[string, number, number, number]>} info.slider - The sliders to add to the form, each represented by a name, minimum value, maximum value, and step.
     * @param {Array<[string, boolean]>} info.toggle - The toggles to add to the form, each represented by a name and a default value.
     * @param {Array<[string, Array<string>]>} info.dropdown - The dropdowns to add to the form, each represented by a name and an array of options.
     * @param {Array<[string, string, string]>} info.textField - The text fields to add to the form, each represented by a name, hover text, and default value.
     * @param {Function} callback - The callback function to execute when the form is submitted.
     */
    create(info, callback) {
        try {
            this.form.title(info.title);

            if (info?.slider?.length >= 1) {
                for (const [name, input0, input1, input2] of info.slider) this.form.slider(name, input0, input1, input2);
            };

            if (info?.toggle?.length >= 1) {
                for (const [name, input0] of info.toggle) this.form.toggle(name, input0);
            };

            if (info?.dropdown?.length >= 1) {
                for (const [name, options, defaultOpt] of info.dropdown) this.form.dropdown(name, options, defaultOpt);
            };

            if (info?.textField?.length >= 1) {
                for (const [name, hoverText, defaultText] of info.textField) this.form.textField(name, hoverText, defaultText);
            }; this.form.show(this.player).then((result) => callback(result));

        } catch (error) {
            console.error(`An error occured while creating the inputFormData form ${info.title}: ${error}\n${error.stack}`);
        }
    }
};