

class SceneQuatre extends Phaser.Scene{
    constructor(){
        super("sceneQuatre");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        // Assets

        this.load.image('narrato_grotte2', 'assets/narrato_grotte2.png');

        this.load.image('lave_fond', 'assets/lave.png');
        this.load.image('mur_grotte_fond', 'assets/mur_grotte.png');
        this.load.image('vapeur_fond', 'assets/vapeur.png');

        this.load.spritesheet('player','assets/blyke.png', { frameWidth: 22, frameHeight: 33 } );
        this.load.spritesheet('player_2','assets/blyke_jetpack.png', { frameWidth: 29, frameHeight: 47 } );
        this.load.spritesheet('boules_blyke','assets/boules_blyke.png', {frameWidth: 25, frameHeight: 25});
        this.load.image('power_up','assets/power_up.png');
        this.load.image('power_up_vie','assets/power_up_vie.png');

        this.load.image('tiles_4','assets/tiles_solmur_grotte.png');
        this.load.tilemapTiledJSON('map_4','assets/Grotte2.json');

        this.load.image('gameover','assets/gameover.png');

    }
    create(){
        //Affichage des assets

        if(restart == false){
            narrato_grotte2 = this.add.image(448,224, 'narrato_grotte2').setDepth(3).setScrollFactor(0).setInteractive();
            
            narrato_grotte2.on('pointerdown', function(){
                narrato_grotte2.destroy();
            });
        }


        this.add.image(2000, 240, 'lave_fond').setScrollFactor(0.8);
        this.add.image(2000, 240, 'mur_grotte_fond').setScrollFactor(0.9);
        this.add.image(2000, 480, 'vapeur_fond').setScrollFactor(0.6);

        const map_4 = this.make.tilemap({key: 'map_4'});
        const tileset = map_4.addTilesetImage('tiles_solmur_grotte','tiles_4');

        sol_grotte2 = map_4.createLayer('sol_grotte2', tileset, 0, 0);
        piege_grotte2 = map_4.createLayer('piege_grotte2', tileset, 0, 0);
        changescene_grotte2 = map_4.createLayer('changescene_grotte2', tileset, 0, 0);

        sol_grotte2.setCollisionByExclusion(-1, true);
        changescene_grotte2.setCollisionByExclusion(-1, true);
        piege_grotte2.setCollisionByExclusion(-1, true);

        player = this.physics.add.sprite(position4playerX, position4playerY, 'player');
        power_up = this.physics.add.sprite(position4playerX, position4playerY, 'power_up');

        power_up_vie = this.physics.add.sprite(505, 430, 'power_up_vie');

        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

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
            key: 'q',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'q_jetpack',
            frames: this.anims.generateFrameNumbers('player_2', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'd',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'd_jetpack',
            frames: this.anims.generateFrameNumbers('player_2', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        //Attaque : Boules de Blyke

        const boules_blykeObjects = this.physics.add.sprite(position4playerX, positionplayerY, 'boules_blyke');
        this.boules_blykes = this.physics.add.group({
            allowGravity: false
        });

        //Animations des boules de Blyke

        this.anims.create({
            key: 'boules_blyke_turn',
            frames: [ { key: 'boules_blykes', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'boules_blyke_left',
            frames: this.anims.generateFrameNumbers('boules_blyke', { start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'boules_blyke_right',
            frames: this.anims.generateFrameNumbers('boules_blyke', { start: 2, end: 3 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'boules_blyke_haut',
            frames: this.anims.generateFrameNumbers('boules_blyke', { start: 4, end: 5 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'boules_blyke_bas',
            frames: this.anims.generateFrameNumbers('boules_blyke', { start: 6, end: 7 }),
            frameRate: 20,
            repeat: -1
        });

        //Animations des projectiles de Silence

        this.anims.create({
            key: 'sharingan_turn',
            frames: [ { key: 'sharingan', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'sharingan_right',
            frames: this.anims.generateFrameNumbers('sharingan', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });

        //Clavier
        keys = this.input.keyboard.addKeys({
            q: Phaser.Input.Keyboard.KeyCodes.Q,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            z: Phaser.Input.Keyboard.KeyCodes.Z,
            e: Phaser.Input.Keyboard.KeyCodes.E,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        });

        this.physics.add.collider(player, sol_grotte2);
        this.physics.add.collider(player, piege_grotte2, piegemort, null, this);
        this.physics.add.collider(power_up, sol_grotte2);
        this.physics.add.collider(player, power_up, collectPowerUp, null, this);
        this.physics.add.collider(player, changescene_grotte2, changementscene4, null, this);
        this.physics.add.collider(power_up_vie, sol_grotte2);
        this.physics.add.collider(player, power_up_vie, collectPowerUpVie, null, this);

        //Caméra
        this.cameras.main.startFollow(player);
        this.cameras.main.fadeIn(400);
        this.cameras.main.setBounds(0, 0, map_4.widthInPixels, map_4.heightInPixels);

        //Affichage de la position du joueur
        positionXtext = this.add.text(0, 0, 'PositionX', + player.x, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);
        positionYtext = this.add.text(0, 20, 'PositionY', + player.y, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);
    }
    update(){
        //Affichage de la position du joueur
        positionXtext.setText('Position X :' + player.x);
        positionYtext.setText('Position Y :' + player.y);

        if(player.x >= 3955 && player.y < 343){
            changementscene4;
        }
    
        //Game Over
        if (gameOver){
            gameOverText = this.add.image(896/2, 448/2, 'gameover').setScrollFactor(0).setDepth(1);
            if(keys.enter.isDown){
                restart = true;
                if(player.x > 1450 && player.y > 375){
                    this.scene.restart();
                    position3playerX = 1829;
                    position3playerY = 271;
                    jetpack = true;
                    jet2 = true;
                    gameOver = false;
                }
                else{
                this.scene.restart();
                jetpack = true;
                jet2 = true;
                gameOver = false;
                }
            }
            return;
        }

       //Déplacements basiques : droite, gauche et saut

       if(keys.q.isDown){
            player.setVelocityX(-185);
            player.anims.play('q', true);
        }
        else if(keys.d.isDown){
            player.setVelocityX(185);
            player.anims.play('d', true);
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
        

            if(keys.e.isDown && keys.q.isDown && jet2 == true){
                jet2 = false;
                boules_blyke = this.physics.add.sprite(player.x, player.y, 'boules_blyke');
                boules_blyke.setVelocityX(-400);
                boules_blyke.body.allowGravity = false;
                boules_blyke.play('boules_blyke_left', true);
                this.physics.add.collider(boules_blyke, sol_grotte2, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, platforms_grotte2, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, this.bosss, destructboss, null, this);
            }


            if(keys.e.isDown && keys.d.isDown && jet2 == true){
                jet2 = false;
                boules_blyke = this.physics.add.sprite(player.x, player.y, 'boules_blyke');
                boules_blyke.setVelocityX(400);
                boules_blyke.body.allowGravity = false;
                boules_blyke.play('boules_blyke_right', true);
                this.physics.add.collider(boules_blyke, sol_grotte2, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, platforms_grotte2, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, this.bosss, destructboss, null, this);
            }

            if(keys.e.isDown && keys.z.isDown && jet2 == true){
                jet2 = false;
                boules_blyke = this.physics.add.sprite(player.x, player.y, 'boules_blyke');
                boules_blyke.setVelocityY(-400);
                boules_blyke.body.allowGravity = false;
                boules_blyke.play('boules_blyke_haut', true);
                this.physics.add.collider(boules_blyke, sol_grotte2, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, platforms_grotte2, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, this.bosss, destructboss, null, this);
            }

            if(keys.e.isDown && keys.s.isDown && jet2 == true){
                jet2 = false;
                boules_blyke = this.physics.add.sprite(player.x, player.y, 'boules_blyke');
                boules_blyke.setVelocityY(400);
                boules_blyke.body.allowGravity = false;
                boules_blyke.play('boules_blyke_bas', true);
                this.physics.add.collider(boules_blyke, sol_grotte2, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, platforms_grotte2, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, this.bosss, destructboss, null, this);
            }
        }
    }


    //Power-Up (Jetpack)

    function collectPowerUp(player, power_up){

        power_up.disableBody(true, true);
        recupPowerUp = true;
        jetpack = true;
    }

    //Power-Up (Jetpack)

    function collectPowerUpVie(player, power_up_vie){

        power_up_vie.disableBody(true, true);
        recupPowerUpVie = true;
        PV = true;
    }

    //Changement de scène
    function changementscene4(player, changescene_grotte2){
        if(player.x >= 3955 && player.y > 343){
            this.scene.start("sceneCinq");
        }
    }

    //Piège

    function piegemort(player, piege_ext2){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }