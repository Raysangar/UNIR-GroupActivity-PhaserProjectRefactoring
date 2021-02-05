export default class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'Boot',
        });
        this.canPLay = false;
    }

    preload() {
        const progress = this.add.graphics();

        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(
                0,
                this.sys.game.config.height / 2,
                this.sys.game.config.width * value,
                60,
            );
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.add.bitmapText(16 * 8 + 4, 8 * 16, 'font', 'PRESS X TO POWER ON', 8);
            this.canPLay = true;
        });

        this.input.on('pointerdown', () => {
            if (this.canPLay) {
                this.sound.add('bootMusic').play();
                setTimeout(() => {
                    this.scene.start('Start');
                }, 1000);
            }
        });

        // LOAD

        this.load.audio('bootMusic', 'src/scenes/Boot/music.mp3');
        this.load.audio('startMusic', 'src/scenes/Start/music.mp3');
        this.load.audio('playMusic', 'src/scenes/Start/play.mp3');
        this.load.audio('level1Music', 'src/scenes/Level1/music.mp3');
        this.load.audio('gameoverMusic', 'src/scenes/Start/gameover.mp3');
        this.load.audio('winMusic', 'src/scenes/Start/win.mp3');
        this.load.audio('jump', 'src/player/jump.mp3');
        this.load.audio('powerup', 'src/powerup/powerup.wav');
        this.load.audio('coin', 'src/coin/coin.wav');
        this.load.image('startBackground', 'src/scenes/Start/background.jpg');
        this.load.image('tiles', 'src/scenes/Level1/background/tileset.png');
        this.load.spritesheet('tilesSprites', 'src/scenes/Level1/background/tileset.png', { frameWidth: 32, frameHeight: 32 });
        this.load.tilemapTiledJSON('map', 'src/scenes/Level1/background/config.json');
        this.load.image('level1Background', 'src/scenes/Level1/background/sky.png');

        this.load.bitmapFont('font', 'src/scenes/font.png', 'src/scenes/font.fnt');

        this.load.image('player', 'src/player/animation/idle.png');
        this.load.atlas('playerSprites', 'src/player/animation/spritesheet.png', 'src/player/animation/config.json');

        this.load.atlas('coinSprites', 'src/coin/animation/spritesheet.png', 'src/coin/animation/config.json');

        this.load.atlas('shyGuySprites', 'src/enemy/ShyGuy/spritesheet.png', 'src/enemy/ShyGuy/config.json');
    }
}