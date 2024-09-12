import { world, ChatSendBeforeEvent } from '@minecraft/server';
import { commandBuild, serverBuild } from '../../../library/Minecraft.js';

commandBuild.create(
    {
        name: 'ranks',
        description: 'Command to manage players rank tags',
        usage: ['ranks [ @player ] [ add | remove | list | removeall ] [ rank_name ]'],
        example: [
            'ranks @defowler2005 add Owner',
            'ranks @defowler2005 remove Owner',
            'ranks @defowler2OO5 list',
            'ranks @defowler2OO5 removeall'
        ],
        aliases: ['rank'],
        is_staff: true,
        cancel_message: true
    },
    /**
     * @param {ChatSendBeforeEvent} data
     * @param {Array<String>} args
     */
    (data, args) => {
        const player = data.sender;
        const rawTargetString = args[0]?.replace('@', '');
        const target = world.getAllPlayers().find((plr) => plr.name === rawTargetString);
        const action = args[1];
        const actionList = ['add', 'remove', 'list', 'removeall'];
        if (!args.length) return playerBuild.tellSelf(player, '§cYou must provide two arguments.');

        if (!args[0]) return playerBuild.tellSelf(player, '§cYou must provide the player\'s name following the §f\'@\'§c symbol.');

        if (!target) return playerBuild.tellSelf(player, `§cThe player §f${rawTargetString} §cwas not found!`);
        if (!args[1]) return playerBuild.tellSelf(player, '§cYou must provide an action.');

        const requestedTag = args[2];
        const allRankTags = target.getTags().filter((tag) => tag.startsWith('rank:')).map((tag) => tag.replace('rank:', '')?.replace('_', ' ')?.replace('-', ' '));

        switch (action) {
            case actionList[0]: // Add a rank.

                if (!requestedTag) {
                    return playerBuild.tellSelf(player, '§cYou must provide a rank to add.');
                }

                const alreadyHasTag = target.hasTag(`rank:${requestedTag}`);

                if (!alreadyHasTag) {
                    target.addTag(`rank:${requestedTag}`);
                    playerBuild.tellSelf(player, `§aThe rank §f${requestedTag} §ahas been added to §f${target.name}.`);
                } else playerBuild.tellSelf(player, `§cThe target §f${target.name} §calready has the rank §f${requestedTag}.`);
                break;
            case actionList[1]: // Remove a rank.

                if (!requestedTag) {
                    return playerBuild.tellSelf(player, '§cYou must provide a rank to add.');
                }

                if (alreadyHasTag) {
                    target.removeTag(`rank:${requestedTag}`);
                    playerBuild.tellSelf(player, `§aThe rank §f${requestedTag} §ahas been removed from §f${target.name}.`);
                } else playerBuild.tellSelf(player, `§cThe target §f${target.name} §cdoes not have the rank §f${requestedTag}.`);
                break;
            case actionList[2]: // List all ranks.
                playerBuild.tellSelf(player, `§aA list of all §f${target.name}§a's rank tags include: §r${allRankTags.join('§r, ')}`);
                break;
            default:
                playerBuild.tellSelf(player, `§cThe action §f${args[1]} §cis inavlid, valid actions include §f${actionList.join('§r, ')}`)
                break;
            case actionList[3]: // Remove all ranks.

                if (allRankTags.length >= 1) {
                    playerBuild.tellSelf(player, `§aSuccessfully removed all §f${target.name}§a\'s ranks!`);

                    allRankTags.forEach((tag) => {
                        target.removeTag(`rank:${tag}`)
                    });
                } else return playerBuild.tellSelf(player, `§cPlayer §f${target.name} §chas no ranks to remove`);
                break;
        }
    }, 
    /**
     * @param {ChatSendBeforeEvent} data
     * @param {Array<String>} args
     */
    (data, args) => { }
);
