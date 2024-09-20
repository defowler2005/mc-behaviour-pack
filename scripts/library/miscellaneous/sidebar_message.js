import { system } from '@minecraft/server';
import { Database, serverBuild, modules } from '../Minecraft.js';

system.runInterval(() => {
    serverBuild.allPlayers.forEach((player) => {
        const serverSetting = Database.get(`module:${modules.staff[2]}`);
        const playerSetting = Database.get(`module:${modules.player[0]}`, player);

        if (serverSetting >= 1 || playerSetting === 3) { // If the serverSetting is or more than 1, overwrite player options.
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
            );
        }

        if (playerSetting === 1) { // Self status.
            player.onScreenDisplay.setTitle(
                {
                    "rawtext": [
                        {
                            "text": `§2Self stats`
                        }
                    ]
                },
                {
                    subtitle: '',
                    stayDuration: 20,
                    fadeInDuration: 0,
                    fadeOutDuration: 0
                }
            );
        }

        if (playerSetting === 2) { // Server stats.
            player.onScreenDisplay.setTitle(
                {
                    "rawtext": [
                        {
                            "text": `§3Server stats`
                        }
                    ]
                },
                {
                    subtitle: 'View server-wide statistics.',
                    stayDuration: 20,
                    fadeInDuration: 0,
                    fadeOutDuration: 0
                }
            );
        };
        // console.warn(modules.player[0].toggles[playerSetting]);
    });
}, 10);