import { system } from '@minecraft/server';
import { serverBuild } from '../Minecraft.js';

system.runInterval(() => {
    serverBuild.allPlayers.forEach((player) => {

        player.onScreenDisplay.setTitle(
            {
                "rawtext": [
                    {
                        "text": ``
                    }
                ]
            },
            {
                subtitle: '§¶§l§ddefowler2005\'s §gWorld',
                stayDuration: 20,
                fadeInDuration: 0,
                fadeOutDuration: 0
            }
        )
    })
}, 10);