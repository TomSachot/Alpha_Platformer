

class SceneDeux extends Phaser.Scene{
    constructor(){
        super("sceneDeux");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        //Assets

        this.load.image('narrato_grotte1', 'assets/narrato_grotte1.png');

        this.load.image('fissures_fond', 'assets/fissures.png');
        this.load.image('stalacs_fond', 'assets/stalacs.png');
        this.load.image('paroi_fond', 'assets/paroi.png');

        this.load.spritesheet('player','assets/blyke.png', { frameWidth: 22, frameHeight: 33 } );
        this.load.spritesheet('player_2','assets/blyke_jetpack.png', { frameWidth: 29, frameHeight: 47 } );
        this.load.spritesheet('boules_blyke','assets/boules_blyke.png', {frameWidth: 25, frameHeight: 25});
        this.load.image('power_up','assets/power_up.png');

        this.load.spritesheet('ennemi_araignee', 'assets/araignee.png', { frameWidth: 52, frameHeight: 18} );
        this.load.spritesheet('ennemi_chenille', 'assets/chenille.png', { frameWidth: 52, frameHeight: 22} );
        this.load.spritesheet('ennemi_fusee', 'assets/fusee.png', { frameWidth: 74, frameHeight: 29});
        this.load.spritesheet('canon_gauche', 'assets/canon_gauche.png', {frameWidth: 48, frameHeight: 26});
        this.load.spritesheet('canon_droit', 'assets/canon_droit.png', {frameWidth: 48, frameHeight: 26});
        this.load.spritesheet('canon_haut', 'assets/canon_haut.png', {frameWidth: 26, frameHeight: 32});
        this.load.image('projectile', 'assets/projectile.png');

        this.load.image('tiles_2','assets/tiles_solmur_grotte.png');
        this.load.tilemapTiledJSON('map_2','assets/Grotte1.json');

        this.load.image('gameover','assets/gameover.png');
    }
    create(){
        //Affichage des assets
        if(restart == false){
        narrato_grotte1 = this.add.image(448,224, 'narrato_grotte1').setDepth(3).setScrollFactor(0).setInteractive();
        
        narrato_grotte1.on('pointerdown', function(){
            narrato_grotte1.destroy();
        });
        }

        this.add.image(4000, 480, 'fissures_fond').setScrollFactor(0.9);
        this.add.image(4000, 480, 'stalacs_fond').setScrollFactor(0.6);
        this.add.image(4000, 480, 'paroi_fond').setScrollFactor(0.9);

        const map_2 = this.make.tilemap({key: 'map_2'});
        const tileset = map_2.addTilesetImage('tiles_solmur_grotte','tiles_2');

        //fond_grotte1 = map_2.createLayer('fond_grotte1', tileset, 0, 0);
        platforms_grotte1 = map_2.createLayer('sol_grotte1', tileset, 0, 0);
        piege_grotte1 = map_2.createLayer('piege_grotte1', tileset, 0, 0);
        changescene_grotte1 = map_2.createLayer('changescene_grotte1', tileset, 0, 0);


        platforms_grotte1.setCollisionByExclusion(-1, true);
        piege_grotte1.setCollisionByExclusion(-1, true);
        changescene_grotte1.setCollisionByExclusion(-1, true);
    
    

        player = this.physics.add.sprite(position2playerX, position2playerY, 'player');         // 70, 70

        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

        power_up = this.physics.add.sprite(580, 770, 'power_up'); //580,770

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

        //Attaque : Boules de Blyke

        const boules_blykeObjects = this.physics.add.sprite(position2playerX, position2playerY, 'boules_blyke');
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

        //Ennemi : Araignée

        const araigneeObjects = map_2.getObjectLayer('Ennemi_araignee_grotte1').objects;
        this.araignees = this.physics.add.group({
            allowGravity: true
        });

        for (const araignee of araigneeObjects) {
            this.araignees.create(araignee.x, araignee.y, 'ennemi_araignee')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations de l'araignée

        this.anims.create({
            key: 'araignee_turn',
            frames: [ { key: 'ennemi_araignee', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'araignee_right',
            frames: this.anims.generateFrameNumbers('ennemi_araignee', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        //Ennemi : Chenille chargeante

        const chenilleObjects = map_2.getObjectLayer('Ennemi_chenille_grotte1').objects;
        this.chenilles = this.physics.add.group({
            allowGravity: true
        });

        for (const chenille of chenilleObjects) {
            this.chenilles.create(chenille.x, chenille.y, 'ennemi_chenille')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations de la chenille chargeante

        this.anims.create({
            key: 'chenille_turn',
            frames: [ { key: 'ennemi_chenille', frame: 0 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'chenille_left',
            frames: this.anims.generateFrameNumbers('ennemi_chenille', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'chenille_right',
            frames: this.anims.generateFrameNumbers('ennemi_chenille', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        //Ennemi : Fusée

        const fuseeObjects = map_2.getObjectLayer('Ennemi_fusee_grotte1').objects;
        this.fusees = this.physics.add.group({
            allowGravity: false
        });

        for (const fusee of fuseeObjects) {
            this.fusees.create(fusee.x, fusee.y, 'ennemi_fusee')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations de la fusée

        this.anims.create({
            key: 'fusee_turn',
            frames: [ { key: 'ennemi_fusee', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'fusee_left',
            frames: this.anims.generateFrameNumbers('ennemi_fusee', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'fusee_right',
            frames: this.anims.generateFrameNumbers('ennemi_fusee', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        //Ennemi : Canon gauche

        const canongaucheObjects = map_2.getObjectLayer('Ennemi_canon_gauche_grotte1').objects;
        this.canongauches = this.physics.add.group({
            allowGravity: false
        });

        for (const canongauche of canongaucheObjects) {
            this.canongauches.create(canongauche.x, canongauche.y, 'canon_gauche')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du canon gauche

        this.anims.create({
            key: 'canongauche_turn',
            frames: [ { key: 'canon_gauche', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canongauche_right',
            frames: this.anims.generateFrameNumbers('canon_gauche', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Canon droit

        const canondroitObjects = map_2.getObjectLayer('Ennemi_canon_droit_grotte1').objects;
        this.canondroits = this.physics.add.group({
            allowGravity: false
        });

        for (const canondroit of canondroitObjects) {
            this.canondroits.create(canondroit.x, canondroit.y, 'canon_droit')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du canon droit

        this.anims.create({
            key: 'canondroit_turn',
            frames: [ { key: 'canon_droit', frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canondroit_right',
            frames: this.anims.generateFrameNumbers('canon_droit', { start: 1, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : 2e Canon droit 

        const canondroit2Objects = map_2.getObjectLayer('Ennemi_canon_droit2_grotte1').objects;
        this.canondroit2s = this.physics.add.group({
            allowGravity: false
        });

        for (const canondroit2 of canondroit2Objects) {
            this.canondroit2s.create(canondroit2.x, canondroit2.y, 'canon_droit')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 2e canon droit

        this.anims.create({
            key: 'canondroit2_turn',
            frames: [ { key: 'canon_droit', frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canondroit2_right',
            frames: this.anims.generateFrameNumbers('canon_droit', { start: 1, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : 3e Canon droit 

        const canondroit3Objects = map_2.getObjectLayer('Ennemi_canon_droit3_grotte1').objects;
        this.canondroit3s = this.physics.add.group({
            allowGravity: false
        });

        for (const canondroit3 of canondroit3Objects) {
            this.canondroit3s.create(canondroit3.x, canondroit3.y, 'canon_droit')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 3e canon droit

        this.anims.create({
            key: 'canondroit3_turn',
            frames: [ { key: 'canon_droit', frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canondroit3_right',
            frames: this.anims.generateFrameNumbers('canon_droit', { start: 1, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Canon haut (fixé au plafond)

        const canonhautObjects = map_2.getObjectLayer('Ennemi_canon_haut_grotte1').objects;
        this.canonhauts = this.physics.add.group({
            allowGravity: false
        });

        for (const canonhaut of canonhautObjects) {
            this.canonhauts.create(canonhaut.x, canonhaut.y, 'canon_haut')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }


        //Animations du canon haut (fixé au plafond)

        this.anims.create({
            key: 'canonhaut_turn',
            frames: [ { key: 'canon_haut', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canonhaut_right',
            frames: this.anims.generateFrameNumbers('canon_haut', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        //Ennemi : 2e Canon haut (fixé au plafond)

        const canonhaut2Objects = map_2.getObjectLayer('Ennemi_canon_haut2_grotte1').objects;
        this.canonhaut2s = this.physics.add.group({
            allowGravity: false
        });

        for (const canonhaut2 of canonhaut2Objects) {
            this.canonhaut2s.create(canonhaut2.x, canonhaut2.y, 'canon_haut')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }


        //Animations du 2e canon haut (fixé au plafond)

        this.anims.create({
            key: 'canonhaut2_turn',
            frames: [ { key: 'canon_haut', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canonhaut2_right',
            frames: this.anims.generateFrameNumbers('canon_haut', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        //Ennemi : Projectile de canon gauche

        const projectileObjects = map_2.getObjectLayer('Ennemi_canon_gauche_grotte1').objects;
        this.projectiles = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : Projectile de canon droit

        const projectile2Objects = map_2.getObjectLayer('Ennemi_canon_droit_grotte1').objects;
        this.projectile2s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : Projectile du 2e canon droit

        const projectile2_1Objects = map_2.getObjectLayer('Ennemi_canon_droit2_grotte1').objects;
        this.projectile2_1s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : Projectile du 3e canon droit

        const projectile2_2Objects = map_2.getObjectLayer('Ennemi_canon_droit3_grotte1').objects;
        this.projectile2_2s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : Projectile du canon haut

        const projectile3Objects = map_2.getObjectLayer('Ennemi_canon_haut_grotte1').objects;
        this.projectile3s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : Projectile du 2e canon haut

        const projectile3_1Objects = map_2.getObjectLayer('Ennemi_canon_haut2_grotte1').objects;
        this.projectile3_1s = this.physics.add.group({
            allowGravity: false
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
        })

        //Collisions
        this.physics.add.collider(player, platforms_grotte1);
        this.physics.add.collider(player, piege_grotte1, piegemort, null, this);
        this.physics.add.collider(player, changescene_grotte1, changementscene2, null, this);
        this.physics.add.collider(power_up, platforms_grotte1);
        this.physics.add.collider(player, power_up, collectPowerUp, null, this);

        //this.physics.add.collider(boules_blyke, ennemi_araignee);

        this.physics.add.collider(this.araignees, platforms_grotte1);
        this.physics.add.collider(this.araignees, this.boules_blykes);
        this.physics.add.collider(player, this.araignees, araigneemort, null, this);

        this.physics.add.collider(this.chenilles, platforms_grotte1);
        this.physics.add.collider(player, this.chenilles, chenillemort, null, this);

        this.physics.add.collider(this.fusees, platforms_grotte1);
        this.physics.add.collider(player, this.fusees, fuseemort, null, this);

        this.physics.add.collider(this.projectiles, platforms_grotte1);
        this.physics.add.collider(player, this.projectiles, projectilemort, null, this);
        this.physics.add.collider(platforms_grotte1, this.projectiles,  disparitionprojectile, null, this);

        //Caméra
        this.cameras.main.startFollow(player);
        this.cameras.main.fadeIn(800);
        this.cameras.main.setBounds(0, 0, map_2.widthInPixels, map_2.heightInPixels);

        //Affichage de la position du joueur
        positionXtext = this.add.text(0, 0, 'PositionX', + player.x, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);
        positionYtext = this.add.text(0, 20, 'PositionY', + player.y, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);


        

    }
    update(){

        //Affichage de la position du joueur
        positionXtext.setText('Position X :' + player.x);
        positionYtext.setText('Position Y :' + player.y);

        if(player.x == 6348 && player.y < 80){
            changementscene2;
        }

        //Game Over
        if (gameOver){
            gameOverText = this.add.image(896/2, 448/2, 'gameover').setScrollFactor(0).setDepth(1);
            if(keys.enter.isDown){
                restart = true;
                if(player.x > 2671 && player.x < 4983 && player.y >= 562){
                    this.scene.restart();
                    position2playerX = 2671;
                    position2playerY = 562;
                    jetpack = true;
                    tir = 1;
                    tir2 = 1;
                    tir2_1 = 1;
                    tir2_2 = 1;
                    tir3 = 1;
                    tir3_1 = 1;
                    jet2 = true;
                    gameOver = false;
                }
                else if(player.x > 1676 && player.x < 4983 && player.y > 300 && player.y <= 366){
                    this.scene.restart();
                    position2playerX = 4983;
                    position2playerY = 878;
                    jetpack = true;
                    tir = 1;
                    tir2 = 1;
                    tir2_1 = 1;
                    tir2_2 = 1;
                    tir3 = 1;
                    tir3_1 = 1;
                    jet2 = true;
                    gameOver = false;
                }
                else if(player.x > 300 && player.x < 1676 && player.y >= 0 && player.y < 366){
                    this.scene.restart();
                    position2playerX = 1676;
                    position2playerY = 366;
                    jetpack = true;
                    tir = 1;
                    tir2 = 1;
                    tir2_1 = 1;
                    tir2_2 = 1;
                    tir3 = 1;
                    tir3_1 = 1;
                    jet2 = true;
                    gameOver = false;
                }
                else if(player.x > 1676 && player.x < 5021 && player.y >= 0 && player.y < 237){
                    this.scene.restart();
                    position2playerX = 1676;
                    position2playerY = 80;
                    jetpack = true;
                    tir = 1;
                    tir2 = 1;
                    tir2_1 = 1;
                    tir2_2 = 1;
                    tir3 = 1;
                    tir3_1 = 1;
                    jet2 = true;
                    gameOver = false;
                }
                else if(player.x > 5021){
                    this.scene.restart();
                    position2playerX = 5021;
                    position2playerY = 78;
                    jetpack = true;
                    tir = 1;
                    tir2 = 1;
                    tir2_1 = 1;
                    tir2_2 = 1;
                    tir3 = 1;
                    tir3_1 = 1;
                    jet2 = true;
                    gameOver = false;
                }

                else{
                    this.scene.restart();
                    jetpack = false;
                    tir = 1;
                    tir2 = 1;
                    tir2_1 = 1;
                    tir2_2 = 1;
                    tir3 = 1;
                    tir3_1 = 1;
                    jet2 = false;
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
            player.anims.play('right', true);
        }
        else{
            player.setVelocityX(0);
            player.anims.play('turn', true);
        }

        if(keys.z.isDown && player.body.blocked.down){
            player.setVelocityY(-170);
            //player.anims.play('turn'. true);
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
        
        
            if(keys.e.isDown && keys.q.isDown && jet2 == true){
                jet2 = false;
                boules_blyke = this.physics.add.sprite(player.x, player.y, 'boules_blyke');
                boules_blyke.setVelocityX(-400);
                boules_blyke.body.allowGravity = false;
                boules_blyke.play('boules_blyke_left', true);
                this.physics.add.collider(boules_blyke, platforms_grotte1, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, this.araignees, destructaraignee, null, this);

            }


            if(keys.e.isDown && keys.d.isDown && jet2 == true){
                jet2 = false;
                boules_blyke = this.physics.add.sprite(player.x, player.y, 'boules_blyke');
                boules_blyke.setVelocityX(400);
                boules_blyke.body.allowGravity = false;
                boules_blyke.play('boules_blyke_right', true);
                this.physics.add.collider(boules_blyke, platforms_grotte1, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, this.araignees, destructaraignee, null, this);
            }

            if(keys.e.isDown && keys.z.isDown && jet2 == true){
                jet2 = false;
                boules_blyke = this.physics.add.sprite(player.x, player.y, 'boules_blyke');
                boules_blyke.setVelocityY(-400);
                boules_blyke.body.allowGravity = false;
                boules_blyke.play('boules_blyke_haut', true);
                this.physics.add.collider(boules_blyke, platforms_grotte1, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, this.araignees, destructaraignee, null, this);
            }

            if(keys.e.isDown && keys.s.isDown && jet2 == true){
                jet2 = false;
                boules_blyke = this.physics.add.sprite(player.x, player.y, 'boules_blyke');
                boules_blyke.setVelocityY(400);
                boules_blyke.body.allowGravity = false;
                boules_blyke.play('boules_blyke_bas', true);
                this.physics.add.collider(boules_blyke, platforms_grotte1, disparitionboules, null, this);
                this.physics.add.collider(boules_blyke, this.araignees, destructaraignee, null, this);
            }
        }

        //Déplacements de l'araignée

        for (const araignee of this.araignees.children.entries) {


            if (araignee.body.blocked.right) {
                araignee.direction = 'LEFT';
                
            }
            
            else if (araignee.body.blocked.left) {
                araignee.direction = 'RIGHT';
            }

            else{
                araignee.setVelocityX(80);
            }

            if(araignee.direction === 'LEFT'){
                araignee.setVelocityX(-80);
                araignee.anims.play('araignee_right', true);

            }

            else if(araignee.direction === 'RIGHT'){
                araignee.setVelocityX(80);
            }
        }

        //Déplacements de la chenille chargeante

        for (const chenille of this.chenilles.children.entries) {


            if (chenille.body.blocked.right) {
                chenille.direction = 'LEFT';
                chenille.anims.play('chenille_left', true);
                
            }
            
            else if (chenille.body.blocked.left) {
                chenille.direction = 'RIGHT';
                chenille.anims.play('chenille_right', true);
            }

            else{
                chenille.setVelocityX(-80);
            }

            if(chenille.direction === 'LEFT'){
                chenille.setVelocityX(-80);
                chenille.anims.play('chenille_left', true);

            }

            else if(chenille.direction === 'RIGHT'){
                chenille.setVelocityX(80);
                chenille.anims.play('chenille_right', true);
            }

            if(player.x > 464 && player.x < 1168 && player.x < chenille.x && player.y > 302 && chenille.direction === 'LEFT'){
                chenille.setVelocityX(-300);
                chenille.anims.play('chenille_left', true);
            }
            else if(player.x > 464 && player.x < 1168 && player.x > chenille.x && player.y > 302 && chenille.direction === 'RIGHT'){
                chenille.setVelocityX(300);
                chenille.anims.play('chenille_right', true);
            }
        }

        //Déplacements de la fusée

        for (const fusee of this.fusees.children.entries) {


            if (fusee.body.blocked.right) {
                fusee.direction = 'LEFT';
                fusee.anims.play('fusee_left', true);
                
            }
            
            else if (fusee.body.blocked.left) {
                fusee.direction = 'RIGHT';
                fusee.anims.play('fusee_right', true);
            }

            else{
                fusee.setVelocityX(-80);
            }

            if(fusee.direction === 'LEFT'){
                fusee.setVelocityX(-80);
                fusee.anims.play('fusee_left', true);

            }

            else if(fusee.direction === 'RIGHT'){
                fusee.setVelocityX(80);
                fusee.anims.play('fusee_right', true);
            }
        }

        //Animation du canon gauche

        for (const canongauche of this.canongauches.children.entries){

            if(keys.q.isDown){
                canongauche.anims.play('canongauche_right', true);
            }

            else if(keys.d.isDown){
                canongauche.anims.play('canongauche_right', true);
            }

            else if(keys.space.isDown){
                canongauche.anims.play('canongauche_right', true);
            }

            if(keys.z.isDown){
                canongauche.anims.play('canongauche_right', true);
            }
        }

        //Tirs de projectile du canon gauche

        for (const canongauche of this.canongauches.children.entries) {
            
            
            if(player.x >= 2400 && player.x <= 3472 && player.y >= 562 && player.y <= 878 && tir == 1){
                tir = 0;
                projectile = this.physics.add.sprite(canongauche.x, canongauche.y, 'projectile');
                projectile.setVelocityX(320);
                projectile.body.allowGravity = false;
                canongauche.play('canongauche_right', true);
                this.physics.add.collider(projectile, platforms_grotte1, disparitionprojectile, null, this);
                this.physics.add.collider(player, projectile, projectilemort, null, this);
            }
            if(player.x >= 3728 && player.x <= 4020 && player.y >= 700 && player.y <= 910 && tir == 1){
                tir = 0;
                projectile = this.physics.add.sprite(canongauche.x, canongauche.y, 'projectile');
                projectile.setVelocityX(320);
                projectile.body.allowGravity = false;
                canongauche.play('canongauche_right', true);
                this.physics.add.collider(projectile, platforms_grotte1, disparitionprojectile, null, this);
                this.physics.add.collider(player, projectile, projectilemort, null, this);
            }
            else{
                tir = 0
            }
        }

        //Animation du canon droit

        for (const canondroit of this.canondroits.children.entries){

            if(keys.q.isDown){
                canondroit.anims.play('canondroit_right', true);
            }

            else if(keys.d.isDown){
                canondroit.anims.play('canondroit_right', true);
            }

            else if(keys.space.isDown){
                canondroit.anims.play('canondroit_right', true);
            }

            if(keys.z.isDown){
                canondroit.anims.play('canondroit_right', true);
            }
        }

        //Tirs de projectile du canon droit

        for (const canondroit of this.canondroits.children.entries) {
            
            
            if(player.x >= 0 && tir2 == 1){
                tir2 = 0;
                projectile2 = this.physics.add.sprite(canondroit.x, canondroit.y, 'projectile');
                projectile2.setVelocityX(-300);
                projectile2.body.allowGravity = false;
                canondroit.play('canondroit_right', true);
                this.physics.add.collider(projectile2, platforms_grotte1, disparitionprojectile2, null, this);
                this.physics.add.collider(player, projectile2, projectile2mort, null, this);
            }
        }

        //Animation du 2e canon droit

        for (const canondroit2 of this.canondroit2s.children.entries){

            if(keys.q.isDown){
                canondroit2.anims.play('canondroit2_right', true);
            }

            else if(keys.d.isDown){
                canondroit2.anims.play('canondroit2_right', true);
            }

            else if(keys.space.isDown){
                canondroit2.anims.play('canondroit2_right', true);
            }

            if(keys.z.isDown){
                canondroit2.anims.play('canondroit2_right', true);
            }
        }

        //Tirs de projectile du 2e canon droit

        for (const canondroit2 of this.canondroit2s.children.entries) {
            
            
            if(player.x >= 0 && tir2_1 == 1){
                tir2_1 = 0;
                projectile2_1 = this.physics.add.sprite(canondroit2.x, canondroit2.y, 'projectile');
                projectile2_1.setVelocityX(-150);
                projectile2_1.body.allowGravity = false;
                canondroit2.play('canondroit2_right', true);
                this.physics.add.collider(projectile2_1, platforms_grotte1, disparitionprojectile2_1, null, this);
                this.physics.add.collider(player, projectile2_1, projectile2_1mort, null, this);
            }
        }

        //Animation du 3e canon droit

        for (const canondroit3 of this.canondroit3s.children.entries){

            if(keys.q.isDown){
                canondroit3.anims.play('canondroit3_right', true);
            }

            else if(keys.d.isDown){
                canondroit3.anims.play('canondroit3_right', true);
            }

            else if(keys.space.isDown){
                canondroit3.anims.play('canondroit3_right', true);
            }

            if(keys.z.isDown){
                canondroit3.anims.play('canondroit3_right', true);
            }
        }

        //Tirs de projectile du 3e canon droit

        for (const canondroit3 of this.canondroit3s.children.entries) {
            
            
            if(player.x >= 0 && tir2_2 == 1){
                tir2_2 = 0;
                projectile2_2 = this.physics.add.sprite(canondroit3.x, canondroit3.y, 'projectile');
                projectile2_2.setVelocityX(-300);
                projectile2_2.body.allowGravity = false;
                canondroit3.play('canondroit3_right', true);
                this.physics.add.collider(projectile2_2, platforms_grotte1, disparitionprojectile2_2, null, this);
                this.physics.add.collider(player, projectile2_2, projectile2_2mort, null, this);
            }
        }

        //Animation du canon haut (fixé au plafond)

        for (const canonhaut of this.canonhauts.children.entries){

            if(keys.q.isDown){
                canonhaut.anims.play('canonhaut_right', true);
            }

            else if(keys.d.isDown){
                canonhaut.anims.play('canonhaut_right', true);
            }

            else if(keys.space.isDown){
                canonhaut.anims.play('canonhaut_right', true);
            }

            if(keys.z.isDown){
                canonhaut.anims.play('canonhaut_right', true);
            }
        }

        //Tirs de projectile du canon haut

        for (const canonhaut of this.canonhauts.children.entries) {
            
            
            if(player.x >= 0 && tir3 == 1){
                tir3 = 0;
                projectile3 = this.physics.add.sprite(canonhaut.x, canonhaut.y, 'projectile');
                projectile3.setVelocityY(130);
                projectile3.body.allowGravity = false;
                canonhaut.play('canonhaut_right', true);
                this.physics.add.collider(projectile3, platforms_grotte1, disparitionprojectile3, null, this);
                this.physics.add.collider(player, projectile3, projectile3mort, null, this);
            }
        }

        //Animation du 2e canon haut (fixé au plafond)

        for (const canonhaut2 of this.canonhaut2s.children.entries){

            if(keys.q.isDown){
                canonhaut2.anims.play('canonhaut2_right', true);
            }

            else if(keys.d.isDown){
                canonhaut2.anims.play('canonhaut2_right', true);
            }

            else if(keys.space.isDown){
                canonhaut2.anims.play('canonhaut2_right', true);
            }

            if(keys.z.isDown){
                canonhaut2.anims.play('canonhaut2_right', true);
            }
        }

        //Tirs de projectile du 2e canon haut

        for (const canonhaut2 of this.canonhaut2s.children.entries) {
            
            
            if(player.x >= 0 && tir3_1 == 1){
                tir3_1 = 0;
                projectile3_1 = this.physics.add.sprite(canonhaut2.x, canonhaut2.y, 'projectile');
                projectile3_1.setVelocityY(130);
                projectile3_1.body.allowGravity = false;
                canonhaut2.play('canonhaut2_right', true);
                this.physics.add.collider(projectile3_1, platforms_grotte1, disparitionprojectile3_1, null, this);
                this.physics.add.collider(player, projectile3_1, projectile3_1mort, null, this);
            }
        }

    }

}
    //Power-Up (Jetpack)

    function collectPowerUp(player, power_up){

        power_up.disableBody(true, true);
        recupPowerUp = true;
        jetpack = true;
        jetpackText = this.add.text(420, 680, 'Press C to use the jetpack');
    }

    //Boules de Blyke

    function disparitionboules(boules_blyke, platforms_grotte1){

        boules_blyke.disableBody(true, true);
        boules_blyke.body.destroy();
        jet2 = true;

    }

    //Mort des araignées

    function destructaraignee(ennemi_araignee, boules_blyke){

        console.log('efefe');
        ennemi_araignee.disableBody(true, true);
        ennemi_araignee.body.destroy();
        jet2 = true;
    }

    //Disparition des projectiles

    function disparitionprojectile(projectile, platforms_grotte1){

        projectile.disableBody(true, true);
        projectile.body.destroy();
        tir = 1;

    }

    function disparitionprojectile2(projectile2, platforms_grotte1){

        projectile2.disableBody(true, true);
        projectile2.body.destroy();
        tir2 = 1;

    }

    function disparitionprojectile2_1(projectile2_1, platforms_grotte1){

        projectile2_1.disableBody(true, true);
        projectile2_1.body.destroy();
        tir2_1 = 1;

    }

    function disparitionprojectile2_2(projectile2_2, platforms_grotte1){

        projectile2_2.disableBody(true, true);
        projectile2_2.body.destroy();
        tir2_2 = 1;

    }

    function disparitionprojectile3(projectile3, platforms_grotte1){

        projectile3.disableBody(true, true);
        projectile3.body.destroy();
        tir3 = 1;

    }

    function disparitionprojectile3_1(projectile3_1, platforms_grotte1){

        projectile3_1.disableBody(true, true);
        projectile3_1.body.destroy();
        tir3_1 = 1;

    }

    //Piège

    function piegemort(player, piege_grotte1){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    // Changement de scène

    function changementscene2(player, changescene_grotte1){
        if(player.x > 6348 && player.y <= 78){
            this.scene.start("sceneTrois");
        }
    }


    //Contact fatal avec l'araignée

    function araigneemort(player, ennemi_araignee){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    //Contact fatal avec la chenille

    function chenillemort(player, ennemi_chenille){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    //Contact fatal avec la fusée

    function fuseemort(player, ennemi_fusee){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    //Contact fatal avec un projectile

    function projectilemort(player, projectile){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectile2mort(player, projectile2){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectile2_1mort(player, projectile2_1){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectile2_2mort(player, projectile2_2){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectile3mort(player, projectile3){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectile3_1mort(player, projectile3_1){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

