import Player from '../../player/Player';
import Mushroom from '../../mushroom/Mushroom';

export default class Level1 extends Phaser.Scene {
    preload() {
        this.load.image('tiles', 'src/scenes/Level1/background/tileset.png');
        this.load.spritesheet('tilesSprites', 'src/scenes/Level1/background/tileset.png', { frameWidth: 32, frameHeight: 32 });
        this.load.tilemapTiledJSON('map', 'src/scenes/Level1/background/config.json');
        this.load.image('background', 'src/scenes/Level1/background/sky.png');
        this.load.image('sea', 'src/scenes/Level1/background/sea.png');

        this.load.image('player', 'src/player/animation/idle.png');
        this.load.atlas('playerSprites', 'src/player/animation/spritesheet.png', 'src/player/animation/config.json');
    }

    create() {
        const background = this.add.tileSprite(0, 0, 800 * 2, 480 * 2, 'background');
        background.fixedToCamera = true;
        this.player = new Player(this, 50, 100);
        const map = this.make.tilemap({ key: 'map' });
        const tiles = map.addTilesetImage('Plataformas', 'tiles');

        const layer = map.createLayer('Suelo', tiles, 0, 0);
        // enable collisions for every tile
        layer.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, layer);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.objetos = map.getObjectLayer('objetos').objects;
        this.setas = [];
        for (let i = 0; i < this.objetos.length; i++) {
            const obj = this.objetos[i];
            if (obj.gid === 115) {
                const seta = new Mushroom(this, obj.x, obj.y);
                this.setas.push(seta);
                this.physics.add.overlap(seta, this.player, this.spriteHit, null, this);
            }
        }
        this.score = 0;
        this.scoreText = this.add.text(16, 16, `PUNTOS: ${this.score}`, {
            fontSize: '20px',
            fill: '#000',
            fontFamily: 'verdana, arial, sans-serif',
        });
        this.scoreText.setScrollFactor(0);
    }

    spriteHit(sprite1) {
        sprite1.destroy();
        this.score++;
        this.scoreText.setText(`PUNTOS: ${this.score}`);
    }

    update(time, delta) {
        this.player.update(time, delta);
    }
}