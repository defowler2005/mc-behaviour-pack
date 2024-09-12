import { ChatSendBeforeEvent, world } from "@minecraft/server";
import { commandBuild, Database, serverBuild } from "../../../library/Minecraft.js";
import { randomColor } from '../../../library/utils/random_color.js';
import { configurations } from "../../../library/build/configurations.js";

commandBuild.create(
    {
        name: 'summondefowler2OO5',
        description: 'Summon an emulated mob version of defowler2OO5 himself at your current location',
        example: [
            'summondefowler2OO5',
            'summondefowler2OO5 killall'
        ],
        is_staff: false,
        usage: [
            'summondefowler2OO5',
            'summondefowler2OO5 [ killall ]'
        ]
    },
    /**
     * @param {ChatSendBeforeEvent} data
     * @param {Array<String>} args
     */
    (data, args) => {
        const player = data.sender;
        const colorCode = randomColor();
        const x = Math.floor(player.location.x);
        const y = Math.floor(player.location.y);
        const z = Math.floor(player.location.z);
        const finalName = `${colorCode}defowler2OO5§r`;

        if (args[0] === 'killall') {
            const dimensions = ['overworld', 'nether', 'the_end'];
            dimensions.forEach(dimension => {
                const entities = world.getDimension(dimension).getEntities({
                    type: 'defow:defowler2005',
                    tags: [`owner:${player.name}`]
                });
                entities.forEach((entity) => entity.kill());
            });

            playerBuild.tellSelf(player, `§aSuccessfully §ckilled §aall defowler2005's.`);
            Database.set('misc:summoneddefow', 0, player);
            return;
        };

        const summonAmount = Number(Database.get('misc:summoneddefow', player)) || 0;
        if (summonAmount >= 3) return playerBuild.tellSelf(player, `§cSorry! The maximum number of §fdefowler2005§c's that can be summoned is §f3§c, you'll have to wait till they die or you can run the command§b ${configurations.cmd_prefix}§csummondefowler2OO5 killall`);

        const defowler2OO5 = player.dimension.spawnEntity('defow:defowler2005', { x, y, z });
        playerBuild.tellSelf(player, `§aSuccessfully spawned a defowler2005 with the name "${finalName}§r"`);
        serverBuild.tellServer(`§aPlayer §f${player.name}§a spawned a §fdefowler2005§a with the name §8"§r${finalName}§8"§r`, player);
        Database.set('misc:summoneddefow', summonAmount + 1, player);
        defowler2OO5.nameTag = finalName;
        defowler2OO5.addTag(`owner:${player.name}`);
    }
);

world.afterEvents.entityDie.subscribe((data) => {
    const deadEntity = data.deadEntity;
    const ownerTag = deadEntity.getTags().find((tag) => tag.startsWith('owner:'));

    if (ownerTag) {
        const ownerName = ownerTag.replace('owner:', '');
        const currentOwner = serverBuild.allPlayers.find(plr => plr.name === ownerName);

        if (currentOwner) {
            const summonAmount = Number(Database.get('misc:summoneddefow', currentOwner)) || 0;
            Database.set('misc:summoneddefow', Math.max(summonAmount - 1, 0), currentOwner);
        }
    }
}, { entityTypes: ['defow:defowler2005'] });