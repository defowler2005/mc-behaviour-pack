import { Player } from '@minecraft/server';
import { ActionFormResponse } from '@minecraft/server-ui';

/**
 * Represents a form for buttons.
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
 *   (result: ActionFormResponse) => {
 *     console.warn(`Results: ${result.selection}`);
 *   }
 * );
 */

export declare class buttonFormData {
    /**
     * The form data object.
     */
    private readonly form: Object;
    /**
     * The player object.
     */
    private readonly player: Player;
    /**
     * Creates a new instance of buttonFormData.
     * @param player - The player object.
     */
    constructor(player: Player);
    /**
     * Creates the form with the specified information and executes the callback when submitted.
     * @param info - The information for the form.
     * @param info.title - The title of the form.
     * @param info.body - The body text of the form.
     * @param info.button - The buttons to add to the form, each represented by a name and an icon.
     * @param callback - The callback function to execute when the form is submitted.
     * @returns The created form data object.
     */
    create(info: {
        title: String;
        body: String[][];
        button: [String, String][];
    }, callback: (result: ActionFormResponse) => void): Promise<ActionFormResponse>;
}