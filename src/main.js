import Boot from './scenes/Boot/Boot';
import Start from './scenes/Start/Start';
import Level1 from './scenes/Level1/Level1';
import Pause from './scenes/Pause/Pause';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    pixelArt: true,
    parent: 'canvas',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true,
        },
    },
    scene: [
        Boot,
        Start,
        Level1,
        Pause,
    ],
};

// eslint-disable-next-line no-new
new Phaser.Game(config);