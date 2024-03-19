import { system, world } from "@minecraft/server";
import { configurations } from '../configurations.js';

/**
 * A class for performing server related stuff.
 * @class
 */
export class serverBuilder {
    constructor() {
        system.runInterval(() => {
            this.allStaffPlayers = world.getPlayers({ tags: [configurations.staffTag] });
            this.allNonStaffPlayers = world.getPlayers({ excludeTags: [configurations.staffTag] });
            this.allEntities = world.getDimension('overworld').getEntities({ excludeTypes: ['minecraft:player'] });
        })
    }
};