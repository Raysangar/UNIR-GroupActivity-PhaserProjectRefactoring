export default class FireGuy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x + 16, y - 16);
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;

        this.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('fireGuySprites', { start: 1, end: 4, prefix: 'walk-' }),
            frameRate: 10,
            repeat: -1,
        });
        this.play('walk', true);
    }
}