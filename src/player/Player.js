export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        this.scene = scene;

        this.jumpSound = this.scene.sound.add('jump');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.body.setSize(this.width * 0.3, this.height * 0.75);
        this.body.setOffset((this.width - this.body.width) * 0.5, this.height * 0.25);

        this.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('playerSprites', { start: 1, end: 16, prefix: 'walk-' }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('playerSprites', { start: 1, end: 4, prefix: 'idle-' }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNames('playerSprites', { start: 1, end: 4, prefix: 'jump-' }),
            frameRate: 5,
            repeat: -1,
        });
    }

    update(time, delta) {
        if (this.cursor.left.isDown) {
            this.setVelocityX(-10 * delta);
            this.setFlipX(true);
        } else if (this.cursor.right.isDown) {
            this.setVelocityX(10 * delta);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }

        if (this.cursor.space.isDown && this.body.onFloor()) {
            this.setVelocityY(-15 * delta);
            this.jumpSound.play();
        }

        if (!this.body.onFloor()) {
            this.play('jump', true);
        } else if (this.body.velocity.x !== 0) {
            this.play('walk', true);
        } else {
            this.play('idle', true);
        }
    }
}