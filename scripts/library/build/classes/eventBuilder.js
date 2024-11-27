import { world } from '@minecraft/server';

class eventBuilder {
    constructor() {

    };

    /**
     * Listen to an event in the given world.
     * @param {String} event The event to listen to.
     * @param {String} eventType - The type of event, beforeEvent or afterEvent.
     * @param {Function} callback - The code to be execute with the event.
     */
    addEventListener(event, eventType, callback) {
        try {
            if (!event) return console.warn(`addEventListener must include an event name.`);
            if (!eventType) return console.warn(`addEventListener must include an event type.`);

            eventType === 'afterEvent' ? world.afterEvents : world.beforeEvents[event]?.subscribe(callback);
        } catch (error) {
            console.warn(`An error occurred while running addEventListener(${event}, ${eventType}): ${error}\n${error.stack}`);
        }
    };
};

export const eventBuild = new eventBuilder();