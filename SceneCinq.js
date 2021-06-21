
class SceneCinq extends Phaser.Scene{
    constructor(){
        super("sceneCinq");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        // Assets

        this.load.image('narrato_ext3', 'assets/narrato_ext3.png');
        this.load.image('narrato_ext3_2', 'assets/narrato_ext3_2.png');
        this.load.image('narrato_ext3_3', 'assets/narrato_ext3_3.png');

        this.load.image('soleil_fond', 'assets/soleil.png');
        this.load.image('montagne_fond', 'assets/montagne_fond.png');
        this.load.image('nuage_fond', 'assets/nuage.png');

        this.load.image('stele', 'assets/stele.png');

        this.load.spritesheet('player','assets/blyke.png', { frameWidth: 22, frameHeight: 33 } );
        this.load.spritesheet('player_2','assets/blyke_jetpack.png', { frameWidth: 29, frameHeight: 47 } );
        this.load.image('power_up','assets/power_up.png');

        

        this.load.image('tiles_5','assets/tiles_solmur_ext.png');
        this.load.tilemapTiledJSON('map_5','assets/Exte3.json');

        this.load.image('gameover','assets/gameover.png');

    }
    create(){
        //Affichage des assets

        if(restart == false){
           
            narrato_ext3_2 = this.add.image(448,224, 'narrato_ext3_2').setDepth(3).setScrollFactor(0).setVisible(false).setInteractive();
            narrato_ext3_3 = this.add.image(448,224, 'narrato_ext3_3').setDepth(3).setScrollFactor(0).setVisible(false).setInteractive();
            narrato_ext3 = this.add.image(448,224, 'narrato_ext3').setDepth(3).setScrollFactor(0).setInteractive();
            
            narrato_ext3.on('pointerdown', function(){
                narrato_ext3.destroy();
            });
        }

        this.add.image(4000, 480, 'soleil_fond').setScrollFactor(0.9);
        this.add.image(4000, 480, 'montagne_fond').setScrollFactor(0.9);
        this.add.image(4000, 0, 'nuage_fond').setScrollFactor(0.6);

        const map_5 = this.make.tilemap({key: 'map_5'});
        const tileset = map_5.addTilesetImage('tiles_solmur_ext','tiles_5');

        decor_ext3 = map_5.createLayer('decor_ext3', tileset, 0, 0);
        platforms_ext3 = map_5.createLayer('sol_ext3', tileset, 0, 0);
        piege_ext3 = map_5.createLayer('piege_ext3', tileset, 0, 0);
        changescene_ext3 = map_5.createLayer('changescene_ext3', tileset, 0, 0);

        platforms_ext3.setCollisionByExclusion(-1, true);
        piege_ext3.setCollisionByExclusion(-1, true);
        changescene_ext3.setCollisionByExclusion(-1, true);

        player = this.physics.add.sprite(position5playerX, position5playerY, 'player'); //70, 910
        power_up = this.physics.add.sprite(position5playerX, position5playerY, 'power_up'); //70, 910

        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

        //Stele

        const steleObjects = map_5.getObjectLayer('stele_ext3').objects;
        this.steles = this.physics.add.group({
            allowGravity: true
        });


        for (const stele of steleObjects) {
            this.steles.create(stele.x, stele.y, 'stele')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations de déplacements du joueur
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'turn_jetpack',
            frames: this.anims.generateFrameNumbers('player_2', { start: 2, end: 3}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left_jetpack',
            frames: this.anims.generateFrameNumbers('player_2', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right_jetpack',
            frames: this.anims.generateFrameNumbers('player_2', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });



        //Clavier
        keys = this.input.keyboard.addKeys({
            q: Phaser.Input.Keyboard.KeyCodes.Q,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            z: Phaser.Input.Keyboard.KeyCodes.Z,
            r: Phaser.Input.Keyboard.KeyCodes.R,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        });

        //Collisions
        this.physics.add.collider(player, platforms_ext3);
        this.physics.add.collider(player, piege_ext3, piegemort, null, this);
        this.physics.add.collider(power_up, platforms_ext3);
        this.physics.add.collider(player, power_up, collectPowerUp, null, this);
        this.physics.add.collider(player, changescene_ext3, changementscene5, null, this);
        this.physics.add.collider(this.steles, platforms_ext3);

        //Caméra
        this.cameras.main.startFollow(player);
        this.cameras.main.fadeIn(400);
        this.cameras.main.setBounds(0, 0, map_5.widthInPixels, map_5.heightInPixels);

        //Affichage de la position du joueur
        positionXtext = this.add.text(0, 0, 'PositionX', + player.x, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);
        positionYtext = this.add.text(0, 20, 'PositionY', + player.y, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);
    }
    update(){

        //Affichage de la position du joueur
        positionXtext.setText('Position X :' + player.x);
        positionYtext.setText('Position Y :' + player.y);

        if(player.x >= 920 && player.y > 0){
            changementscene5;
        }

        //Game Over
        if (gameOver){
            gameOverText = this.add.image(896/2, 448/2, 'gameover').setScrollFactor(0).setDepth(1);
            if(keys.enter.isDown){
                restart = true;
                if(player.x > 0){
                    this.scene.restart();
                    jetpack = true;
                    jet2 = true;
                    gameOver = false;
                }
            }
        }

        //Inscriptions de la stèle
        if(player.x > 400 && player.x < 490 && player.y > 320){
            if(keys.r.isDown && stele_inscriptions == false){
                stele_inscriptions = true;
                narrato_ext3_2.setVisible(true);
                narrato_ext3_2.on('pointerdown', function(){
                    narrato_ext3_2.destroy();
                    narrato_ext3_3.setVisible(true);
                });
                narrato_ext3_3.on('pointerdown', function(){
                    narrato_ext3_3.destroy();

                });
                stele_inscriptions = false;
            }
        }

        //Déplacements basiques : droite, gauche et saut

        if(keys.q.isDown){
            player.setVelocityX(-185);
            player.anims.play('left', true);
        }
        else if(keys.d.isDown){
            player.setVelocityX(185);
            player.anims.play('right', true);
        }
        else{
            player.setVelocityX(0);
            player.anims.play('turn', true);
        }

        if(keys.z.isDown && player.body.blocked.down){
            player.setVelocityY(-170);
        }

        if(jetpack == true){
            if(keys.space.isDown && keys.q.isDown){
                player.anims.play('q_jetpack', true);
                player.setVelocityY(-110);
            }
            if(keys.space.isDown && keys.d.isDown){
                player.anims.play('right_jetpack', true);
                player.setVelocityY(-110);
            }
            if(keys.space.isDown){
                player.anims.play('turn_jetpack', true);
                player.setVelocityY(-110);
            }
        }

        //Animations de fin
        if(player.x >= 597){
            player.setVelocityX(100);
            player.setVelocityY(-50);
            player.anims.play('right_jetpack', true);
        }

        if(player.x >= 920){
            this.cameras.main.fadeOut(400);
        }
        //Affichage de la stèle

        for (const stele of this.steles.children.entries) {

            this.add.image(450, 366, 'stele');
        }
    }
}


    //Power-Up (Jetpack)

    function collectPowerUp(player, power_up){

        power_up.disableBody(true, true);
        recupPowerUp = true;
        jetpack = true;
    }

    //Piège

    function piegemort(player, piege_ext3){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    //Changement de scène
    function changementscene5(player, changescene_ext3){
        if(player.x >= 920 && player.y > 0){
            this.scene.start("sceneUn");
        }
    }