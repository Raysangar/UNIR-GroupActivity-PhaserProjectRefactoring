import { MainScene } from './MainScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    parent: "canvas",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    }
};

new Phaser.Game(config);