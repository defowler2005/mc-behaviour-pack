import { system, world } from '@minecraft/server';

system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        
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
    });
}, 10);