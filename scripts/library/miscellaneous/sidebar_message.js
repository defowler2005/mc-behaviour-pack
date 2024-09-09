import { system } from '@minecraft/server';
import { Database, serverBuild, modules } from '../Minecraft.js';

system.runInterval(() => {
    serverBuild.allPlayers.forEach((player) => {
        const serverSetting = Database.get(`module:${modules.staff[2]}`);
        const playerSetting = Database.get(`module:${modules.player[0]}`, player);

        if (serverSetting >= 1) { // If the serverSetting is toggled on which overwrites player options.
            player.onScreenDisplay.setTitle(
                {
                    "rawtext": [
                        {
                            "text": `Server global`
                        }
                    ]
                },
                {
                    subtitle: '',
                    stayDuration: 20,
                    fadeInDuration: 0,
                    fadeOutDuration: 0
                }
            ); return;
        }
        if (playerSetting === 1) {}
        if (playerSetting === 2) {}
        if (playerSetting === 3) {}
        //console.warn(modules.player[0].toggles[playerSetting])
    })
}, 10);