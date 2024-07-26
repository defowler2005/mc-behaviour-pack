import { Player } from "@minecraft/server";
import { MessageFormData } from "@minecraft/server-ui";

/**
 * A class for creating forms for yes and no questions.
 * @class
 */
export class queryFormData {
    /**
     * @param {Player} player 
     */
    constructor(player) {
        this.player = player;
        this.form = new MessageFormData();
    }
    /**
     * Creates the form with the specified information and executes the callback when submitted.
     * @param {Object} info - The information for the form.
     * @param {string} info.title - The title of the form.
     * @param {Array<[String]>} info.body - The body text of the form.
     * @param {Array<[String]>} info.button0 - The first button (Yes button) represented by a name.
     * @param {Array<[String]>} info.button1 - The second button (No button) represented by a name.
     * @param {Function} callback - The callback function to execute when the form is submitted.
     */
    create(info, callback) {
        this.form.title(info.title);
        this.form.body(info.body.join('\n§r'));
        this.form.button1(info.button0[0]);
        this.form.button2(info.button1[0]);
        this.form.show(this.player).then((result) => callback(result));
    }
};