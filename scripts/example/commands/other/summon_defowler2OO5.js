import { Player } from "@minecraft/server";
import { commandBuild, Database, serverBuild } from "../../../library/Minecraft.js";
import { randomColor } from '../../../library/utils/random_color.js';

commandBuild.create(
    {
        name: 'summondefowler2OO5',
        description: 'Summon an emulated mob version of defowler2OO5 himself at your current location',
        example: [
            'summondefowler2OO5',
        ],
        is_staff: false,
        usage: [
            'summondefowler2OO5'
        ]
    },
    (data, args) => { // Errorful at line 30: Failed to spawnEntity.
        /**
         * @type {Player}
         */
        const player = data.sender;
        const summonAmount = Number(Database.get('misc:summoneddefow', player));
        const colorCode = randomColor();
        const x = Math.floor(player.location.x);
        const y = Math.floor(player.location.y);
        const z = Math.floor(player.location.z);

        if (summonAmount >= 3) return serverBuild.tellSelf(player, `§cSorry! The maximum amount of §fdefowler2005§c's that can be summoned is §f3§c, you'll have to wait`);

        const defowler2OO5 = player.dimension.spawnEntity('defow:defowler2OO5', { x: x, y: y, z: z });

        defowler2OO5.nameTag = `${colorCode}defowler2OO5`;
    }
);