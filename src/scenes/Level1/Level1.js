import Player from '../../player/Player';
import Mushroom from '../../powerup/mushroom/Mushroom';
import Coin from '../../coin/Coin';
import ShyGuy from '../../enemy/ShyGuy/ShyGuy';

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level1',
        });
        this.updateObjects = []; // Objetos que tienen un update()
        this.delta = 0;
        this.gameFinished = false;
    }

    preload() {
        // this.load.scenePlugin({
        //     key: 'animatedTiles',
        //     url: 'node_modules/phaser-animated-tiles/dist/AnimatedTiles.min',
        // });

        this.music = this.sound.add('level1Music', { loop: true });
        this.powerupMusic = this.sound.add('powerup');
        this.coinMusic = this.sound.add('coin');
        this.gameOverSound = this.sound.add('gameover');
    }

    create() {
        this.music.play();
        this.loadBackground();
        this.loadMap();
        this.player = new Player(this, 50, 100);
        this.updateObjects.push(this.player);
        this.loadPhysics();
        this.loadUI();

        this.loadItem('Coin', Coin);
        this.loadItem('PowerUp', Mushroom);
        this.loadItem('ShyGuy', ShyGuy);
    }

    update(time, delta) {
        this.delta = delta;
        // Al revés para poder borrar elementos
        for (let i = this.updateObjects.length - 1; i >= 0; i--) {
            try {
                this.updateObjects[i].update(time, delta);
            } catch (e) {
                this.updateObjects.splice(i, 1);
            }
        }
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
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels - 1);
        this.cameras.main.startFollow(this.player, false, 1, 0, 0, -500);
    }

    loadUI() {
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

    loadItem(layer, Class) {
        this.map.getObjectLayer(layer).objects
            .forEach((item) => {
                const instance = new Class(this, item.x, item.y);
                this.updateObjects.push(instance);
                this.physics.add.overlap(
                    instance,
                    this.player,
                    instance.OnHit,
                    null,
                    instance,
                );
            });
    }

    increaseScore() {
        if (this.gameFinished) return;
        this.score++;
        this.updateScore();
        this.coinMusic.play();
    }

    updateScore() {
        this.scoreText.setText(`SCORE: ${this.score}`);
    }

    destroyObject(object)
    {
        for( var i = 0; i < this.updateObjects.length; i++){ 
            if ( this.updateObjects[i] === object)
                this.updateObjects.splice(i, 1); 
        }
        object.destroy();
    }

    onPlayerDied() {
        if (this.gameFinished) return;
        this.gameFinished = true;
        this.music.stop();
        this.gameOverSound.play();
        setTimeout(() => this.scene.start('GameOver'), 2000);
    }
}