import Player from '../../player/Player';
import Mushroom from '../../powerup/mushroom/Mushroom';
import Coin from '../../coin/Coin';

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level1',
        });
    }

    preload() {
        // this.load.scenePlugin({
        //     key: 'animatedTiles',
        //     url: 'node_modules/phaser-animated-tiles/dist/AnimatedTiles.min',
        // });

        this.music = this.sound.add('level1Music', { loop: true });
        this.powerupMusic = this.sound.add('powerup');
        this.coinMusic = this.sound.add('coin');
    }

    create() {
        this.music.play();
        this.loadBackground();
        this.loadMap();
        this.player = new Player(this, 50, 100);
        this.loadPhysics();
        this.loadUI();
        // this.sys.animatedTiles.init(this.map);

        this.loadItem('Coin', this.coinHit, Coin);
        this.loadItem('PowerUp', this.powerUpHit, Mushroom);
    }

    update(time, delta) {
        this.player.update(time, delta);
    }

    ///

    loadBackground() {
        this.add
            .tileSprite(
                0,
                0,
                this.cameras.main.width * 2,
                this.cameras.main.height * 2,
                'level1Background',
            )
            .setScrollFactor(0);
    }

    loadMap() {
        this.map = this.make.tilemap({ key: 'map' });
        this.map.createLayer(
            'Background',
            this.map.addTilesetImage('Plataformas', 'tiles'),
            0,
            0,
        );
        this.layer = this.map
            .createLayer(
                'Floor',
                this.map.addTilesetImage('Plataformas', 'tiles'),
                0,
                0,
            );
        // Habilitar colisión para Floor
        this.layer.setCollisionByExclusion(-1, true);
    }

    loadPhysics() {
        this.physics.add.collider(this.player, this.layer);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
    }

    loadUI(score) {
        if (score) {
            this.scoreText.setText(`SCORE: ${score}`);
            return;
        }
        // Fondo negro de la parte superior
        this.add.graphics()
            .fillStyle(0x000000)
            .fillRect(
                0,
                0,
                this.sys.game.config.width,
                16,
            )
            .setScrollFactor(0);
        // Puntuación
        this.score = 0;
        this.scoreText = this.add.bitmapText(8, 8, 'font', `SCORE: ${this.score}`);
        this.scoreText.setScrollFactor(0);
    }

    loadItem(layer, collideCallback, Class) {
        this.map.getObjectLayer(layer).objects
            .forEach((item) => {
                this.physics.add.overlap(
                    new Class(this, item.x, item.y),
                    this.player,
                    collideCallback,
                    null,
                    this,
                );
            });
    }

    itemHit(sprite) {
        sprite.destroy();
    }

    coinHit(sprite) {
        this.itemHit(sprite);
        this.score++;
        this.coinMusic.play();
        this.loadUI(this.score);
    }

    powerupHit(sprite) {
        this.itemHit(sprite);
        this.powerupMusic.play();
    }
}