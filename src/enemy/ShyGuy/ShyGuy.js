export default class ShyGuy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x + 16, y - 16);

        this.scene = scene;

        this.movementRange = 200;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;

        this.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames('shyGuySprites', { start: 1, end: 4, prefix: 'idle-' }),
            frameRate: 10,
            repeat: -1,
        });
        this.play('idle', true);

        this.direction = 1; // Sentido en el que va el enemigo. 1 = Arriba, -1 = Abajo
        this.a = this.y;
        this.b = this.y + this.movementRange;
    }

    update(time, delta) {
        if (
            (this.direction === 1 && this.y > this.b) || (this.direction === -1 && this.y < this.a)
        ) {
            this.direction *= -1;
        }
        this.setVelocityY(this.direction * 2 * delta);
    }

    OnHit() {
        if (this.body.touching.up) {
            this.scene.player.jump(this.scene.delta);
            this.scene.increaseScore();
            this.scene.destroyObject(this);
        } else {
            this.scene.onPlayerDied();
        }
    }
}