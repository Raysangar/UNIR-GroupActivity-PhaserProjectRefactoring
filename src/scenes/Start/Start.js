export default class Start extends Phaser.Scene {
    constructor() {
        super({
            key: 'Start',
        });
    }

    preload() {
        this.music = this.sound.add('startMusic');
        this.playMusic = this.sound.add('playMusic');
    }

    create() {
        this.add.image(0, 0, 'startBackground').setOrigin(0, 0);
        this.music.play();

        this.add.graphics()
            .fillStyle(0x000000, 0.5)
            .fillRect(0, this.sys.game.config.height / 2 - 20, this.sys.game.config.width, 50);

        this.pressX = this.add.bitmapText(this.sys.game.config.width / 2 - 75, this.sys.game.config.height / 2, 'font', 'PRESS X TO PLAY', 10);
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        this.input.on('pointerdown', () => {
            this.startGame();
        });
    }

    update() {
        if (this.startKey.isDown) {
            this.startGame();
        }
    }

    startGame() {
        this.music.stop();
        this.playMusic.play();
        setTimeout(() => this.scene.start('Level1'), 2000);
    }
}