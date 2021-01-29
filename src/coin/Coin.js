export default class Class extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x + 16, y - 16);
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;

        this.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('coinSprites', { start: 1, end: 4, prefix: 'idle-' }),
            frameRate: 10,
            repeat: -1,
        });
        this.play('idle', true);
    }

    OnHit() {
        this.scene.increaseScore();
        this.scene.destroyObject(this);
    }
}