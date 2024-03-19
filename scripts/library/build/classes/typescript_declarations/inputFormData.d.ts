import { Player } from "@minecraft/server";
import { ModalFormResponse } from "@minecraft/server-ui";

/**
 * Represents a form with various input controls.
 */
export class InputFormData {
    /**
     * The player object.
     * @type {Player}
     */
    player: Player;

    /**
     * The form data object.
     * @type {ModalFormData}
     */
    form: ModalFormData;

    /**
     * Creates a new instance of InputFormData.
     * @param {Player} player - The player object.
     */
    constructor(player: Player);

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
    create(info: {
        title: string,
        slider: Array<[string, number, number, number]>,
        toggle: Array<[string, boolean]>,
        dropdown: Array<[string, string[], string]>,
        textField: Array<[string, string, string]>
    }, callback: (result: ModalFormResponse) => void): void;
};