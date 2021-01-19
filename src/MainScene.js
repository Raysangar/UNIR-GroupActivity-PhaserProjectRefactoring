import { Player } from './Player';
import { Seta } from './Seta';

export class MainScene extends Phaser.Scene {
    preload() {
        this.load.image('tiles', 'assets/Tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/Map.json');
        this.load.image('bg-1', 'assets/sky.png');
        this.load.image('sea', 'assets/sea.png');
        this.load.image('player', 'assets/idle-1.png');
        //Phaser.Physics.Arcade.Sprite
        // https://gammafp.com/tool/atlas-packer/
        this.load.atlas('sprites_jugador', 'assets/player_anim/player_anim.png',
            'assets/player_anim/player_anim_atlas.json');
        this.load.spritesheet('tilesSprites', 'assets/Tileset.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        var bg_1 = this.add.tileSprite(0, 0, 800 * 2, 480 * 2, 'bg-1');
        bg_1.fixedToCamera = true;
        this.player = new Player(this, 50, 100);
        var map = this.make.tilemap({ key: 'map' });
        var tiles = map.addTilesetImage('Plataformas', 'tiles');

        // var layer2 = map.createLayer('Fondo', tiles, 0, 0);
        var layer = map.createLayer('Suelo', tiles, 0, 0);
        //enable collisions for every tile
        layer.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, layer);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


        this.objetos = map.getObjectLayer('objetos')['objects'];
        this.setas = [];
        for (var i = 0; i < this.objetos.length; ++i) {
            var obj = this.objetos[i];
            if (obj.gid == 115) // en mi caso la seta
            {
                var seta = new Seta(this, obj.x, obj.y);
                this.setas.push(seta);
                this.physics.add.overlap(seta, this.player, this.spriteHit, null, this);
            }
        }
        this.score = 1;
        this.scoreText = this.add.text(16, 16, 'PUNTOS: ' + this.score, {
            fontSize: '20px',
            fill: '#000',
            fontFamily: 'verdana, arial, sans-serif'
        });

    }

    spriteHit(sprite1 /* , sprite2 */ ) {

        sprite1.destroy();

    }

    update(time, delta) {
        this.player.update(time, delta);
    }
}