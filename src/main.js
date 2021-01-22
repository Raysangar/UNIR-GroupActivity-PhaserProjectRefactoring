import Level1 from './scenes/Level1/Level1';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    parent: 'canvas',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: Level1,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true,
        },
    },
};

// eslint-disable-next-line no-new
new Phaser.Game(config);