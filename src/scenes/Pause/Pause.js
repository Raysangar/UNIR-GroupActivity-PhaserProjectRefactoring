export default class Pause extends Phaser.Scene {
    constructor() {
        super({
            key: 'Pause',
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

        this.pressX = this.add.bitmapText(this.sys.game.config.width / 2 - 75, this.sys.game.config.height / 2, 'font', 'PAUSED\n\nPRESS ESC TO RESUME', 10);
        this.resumeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (this.resumeKey.isDown) {
            this.resumeGame();
        }
    }

    resumeGame() {
        this.music.stop();
        this.playMusic.play();
        this.scene.resume('Level1');
        this.scene.stop('Pause');
    }
}