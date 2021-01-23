import Player from '../../player/Player';
import Mushroom from '../../powerup/mushroom/Mushroom';

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level1',
        });
    }

    preload() {
        this.music = this.sound.add('level1Music');
        this.scoreMusic = this.sound.add('score');
        this.powerup = this.sound.add('powerup');
    }

    create() {
        const background = this.add.tileSprite(0, 0, this.sys.game.config.height * 2, this.sys.game.config.width * 2, 'level1Background');
        background.fixedToCamera = true;
        this.player = new Player(this, 50, 100);
        const map = this.make.tilemap({ key: 'map' });
        const tiles = map.addTilesetImage('Plataformas', 'tiles');

        // UI. Fondo negro de la parte superior
        this.add.graphics()
            .fillStyle(0x000000)
            .fillRect(
                0,
                0,
                this.sys.game.config.width,
                16,
            );

        const layer = map.createLayer('Suelo', tiles, 0, 0);
        // enable collisions for every tile
        layer.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, layer);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.objetos = map.getObjectLayer('objetos').objects;
        this.mushrooms = [];
        for (let i = 0; i < this.objetos.length; i++) {
            const obj = this.objetos[i];
            if (obj.gid === 115) {
                const mushroom = new Mushroom(this, obj.x, obj.y);
                this.mushrooms.push(mushroom);
                this.physics.add.overlap(mushroom, this.player, this.spriteHit, null, this);
            }
        }
        this.score = 0;
        this.scoreText = this.add.bitmapText(8, 8, 'font', `SCORE: ${this.score}`);
        this.scoreText.setScrollFactor(0);
        this.music.play();
    }

    spriteHit(sprite1) {
        sprite1.destroy();
        this.score++;
        this.powerup.play();
        this.scoreText.setText(`SCORE: ${this.score}`);
    }

    update(time, delta) {
        this.player.update(time, delta);
    }
}