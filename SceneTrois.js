

class SceneTrois extends Phaser.Scene{
    constructor(){
        super("sceneTrois");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        //Assets

        this.load.image('narrato_ext2', 'assets/narrato_ext2.png');
        this.load.image('narrato_ext2_2', 'assets/narrato_ext2_2.png');

        this.load.image('soleil_fond', 'assets/soleil.png');
        this.load.image('montagne_fond', 'assets/montagne_fond.png');
        this.load.image('nuage_fond', 'assets/nuage.png');

        this.load.spritesheet('player','assets/blyke.png', { frameWidth: 22, frameHeight: 33 } );
        this.load.spritesheet('player_2','assets/blyke_jetpack.png', { frameWidth: 29, frameHeight: 47 } );
        this.load.image('power_up','assets/power_up.png');

        this.load.image('ennemi_zetsu', 'assets/zetsu.png');
        this.load.spritesheet('ennemi_araignee', 'assets/araignee.png', { frameWidth: 52, frameHeight: 18} );
        this.load.spritesheet('ennemi_chenille', 'assets/chenille.png', { frameWidth: 52, frameHeight: 22} );
        this.load.spritesheet('ennemi_fusee', 'assets/fusee.png', { frameWidth: 74, frameHeight: 29});
        this.load.spritesheet('ennemi_tank', 'assets/tank.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('canon_gauche', 'assets/canon_gauche.png', {frameWidth: 48, frameHeight: 26});
        this.load.spritesheet('canongauche_tele', 'assets/canongauche_tele.png', {frameWidth: 48, frameHeight: 26});
        this.load.spritesheet('canonhaut_tele', 'assets/canonhaut_tele.png', {frameWidth: 26, frameHeight: 32});
        this.load.spritesheet('canon_haut', 'assets/canon_haut.png', {frameWidth: 26, frameHeight: 32});
        this.load.spritesheet('canon_droit', 'assets/canon_droit.png', {frameWidth: 48, frameHeight: 26});
        this.load.image('projectile', 'assets/projectile.png');
        this.load.image('projectele', 'assets/projectele.png');

        this.load.image('tiles_3','assets/tiles_solmur_ext.png');
        this.load.tilemapTiledJSON('map_3','assets/Exte2.json');

        this.load.image('gameover','assets/gameover.png');

    }
    create(){
        //Affichage des assets
        if(restart == false){
        narrato_ext2_2 = this.add.image(448,224, 'narrato_ext2_2').setDepth(3).setScrollFactor(0).setVisible(false).setInteractive();
        narrato_ext2 = this.add.image(448,224, 'narrato_ext2').setDepth(3).setScrollFactor(0).setInteractive();
        
        narrato_ext2.on('pointerdown', function(){
            narrato_ext2.destroy();
            narrato_ext2_2.setVisible(true);
        });

        narrato_ext2_2.on('pointerdown', function(){
            narrato_ext2_2.destroy();
        });
        }

        this.add.image(4000, 480, 'soleil_fond').setScrollFactor(0.9);
        this.add.image(4000, 480, 'montagne_fond').setScrollFactor(0.9);
        this.add.image(4000, 0, 'nuage_fond').setScrollFactor(0.6);

        const map_3 = this.make.tilemap({key: 'map_3'});
        const tileset = map_3.addTilesetImage('tiles_solmur_ext','tiles_3');

        decor_ext2 = map_3.createLayer('decor_ext2', tileset, 0, 0);
        platforms_ext2 = map_3.createLayer('sol_ext2', tileset, 0, 0);
        piege_ext2 = map_3.createLayer('piege_ext2', tileset, 0, 0);
        changescene_ext2 = map_3.createLayer('changescene_ext2', tileset, 0, 0);
        bloque_zetsu_ext2 = map_3.createLayer('bloque_zetsu_ext2', tileset, 0, 0);


        platforms_ext2.setCollisionByExclusion(-1, true);
        piege_ext2.setCollisionByExclusion(-1, true);
        changescene_ext2.setCollisionByExclusion(-1, true);
        bloque_zetsu_ext2.setCollisionByExclusion(-1, true);
    
    

        player = this.physics.add.sprite(position3playerX, position3playerY, 'player'); //70, 910
        power_up = this.physics.add.sprite(position3playerX, position3playerY, 'power_up'); //70, 910

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

        //Ennemi : Zetsu

        const zetsuObjects = map_3.getObjectLayer('Ennemi_zetsu_ext2').objects;
        this.zetsus = this.physics.add.group({
            allowGravity: false
        });

        for (const zetsu of zetsuObjects) {
            this.zetsus.create(zetsu.x, zetsu.y, 'ennemi_zetsu')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Ennemi : Araignée

        const araigneeObjects = map_3.getObjectLayer('Ennemi_araignee_ext2').objects;
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

        const chenilleObjects = map_3.getObjectLayer('Ennemi_chenille_ext2').objects;
        this.chenilles = this.physics.add.group({
            allowGravity: false
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

        const fuseeObjects = map_3.getObjectLayer('Ennemi_fusee_ext2').objects;
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

        //Ennemi : Tank

        const tankObjects = map_3.getObjectLayer('Ennemi_tank_ext2').objects;
        this.tanks = this.physics.add.group({
            allowGravity: true
        });

        for (const tank of tankObjects) {
            this.tanks.create(tank.x, tank.y, 'ennemi_tank')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(-300)
        }

        //Animations du tank

            this.anims.create({
                key: 'tank_turn',
                frames: [ { key: 'ennemi_tank', frame: 0 } ],
                frameRate: 20
            });
        
            this.anims.create({
                key: 'tank_left',
                frames: this.anims.generateFrameNumbers('ennemi_tank', { start: 0, end: 1 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'tank_right',
                frames: this.anims.generateFrameNumbers('ennemi_tank', { start: 2, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

        //Ennemi : Canon gauche

        const canongaucheObjects = map_3.getObjectLayer('Ennemi_canon_gauche_ext2').objects;
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

        //Ennemi : Projectile du canon gauche

        const projectilEObjects = map_3.getObjectLayer('Ennemi_canon_gauche_ext2').objects;
        this.projectilEs = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 2e Canon gauche

        const canongauche_1Objects = map_3.getObjectLayer('Ennemi_canon_gauche2_ext2').objects;
        this.canongauche_1s = this.physics.add.group({
            allowGravity: false
        });

        for (const canongauche_1 of canongauche_1Objects) {
            this.canongauche_1s.create(canongauche_1.x, canongauche_1.y, 'canon_gauche')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 2e canon gauche

        this.anims.create({
            key: 'canongauche_1_turn',
            frames: [ { key: 'canon_gauche', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canongauche_1_right',
            frames: this.anims.generateFrameNumbers('canon_gauche', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du 2e canon gauche

        const projectilE_1Objects = map_3.getObjectLayer('Ennemi_canon_gauche2_ext2').objects;
        this.projectilE_1s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 3e Canon gauche

        const canongauche_2Objects = map_3.getObjectLayer('Ennemi_canon_gauche3_ext2').objects;
        this.canongauche_2s = this.physics.add.group({
            allowGravity: false
        });

        for (const canongauche_2 of canongauche_2Objects) {
            this.canongauche_2s.create(canongauche_2.x, canongauche_2.y, 'canon_gauche')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 3e canon gauche

        this.anims.create({
            key: 'canongauche_2_turn',
            frames: [ { key: 'canon_gauche', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canongauche_2_right',
            frames: this.anims.generateFrameNumbers('canon_gauche', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du 3e canon gauche

        const projectilE_2Objects = map_3.getObjectLayer('Ennemi_canon_gauche3_ext2').objects;
        this.projectilE_2s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 4e Canon gauche

        const canongauche_3Objects = map_3.getObjectLayer('Ennemi_canon_gauche4_ext2').objects;
        this.canongauche_3s = this.physics.add.group({
            allowGravity: false
        });

        for (const canongauche_3 of canongauche_3Objects) {
            this.canongauche_3s.create(canongauche_3.x, canongauche_3.y, 'canon_gauche')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 4e canon gauche

        this.anims.create({
            key: 'canongauche_3_turn',
            frames: [ { key: 'canon_gauche', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canongauche_3_right',
            frames: this.anims.generateFrameNumbers('canon_gauche', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du 4e canon gauche

        const projectilE_3Objects = map_3.getObjectLayer('Ennemi_canon_gauche4_ext2').objects;
        this.projectilE_3s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 5e Canon gauche

        const canongauche_4Objects = map_3.getObjectLayer('Ennemi_canon_gauche5_ext2').objects;
        this.canongauche_4s = this.physics.add.group({
            allowGravity: false
        });

        for (const canongauche_4 of canongauche_4Objects) {
            this.canongauche_4s.create(canongauche_4.x, canongauche_4.y, 'canon_gauche')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 5e canon gauche

        this.anims.create({
            key: 'canongauche_4_turn',
            frames: [ { key: 'canon_gauche', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canongauche_4_right',
            frames: this.anims.generateFrameNumbers('canon_gauche', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du 5e canon gauche

        const projectilE_4Objects = map_3.getObjectLayer('Ennemi_canon_gauche5_ext2').objects;
        this.projectilE_4s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 6e Canon gauche

        const canongauche_5Objects = map_3.getObjectLayer('Ennemi_canon_gauche6_ext2').objects;
        this.canongauche_5s = this.physics.add.group({
            allowGravity: false
        });

        for (const canongauche_5 of canongauche_5Objects) {
            this.canongauche_5s.create(canongauche_5.x, canongauche_5.y, 'canon_gauche')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 6e canon gauche

        this.anims.create({
            key: 'canongauche_5_turn',
            frames: [ { key: 'canon_gauche', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canongauche_5_right',
            frames: this.anims.generateFrameNumbers('canon_gauche', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du 6e canon gauche

        const projectilE_5Objects = map_3.getObjectLayer('Ennemi_canon_gauche6_ext2').objects;
        this.projectilE_5s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 7e Canon gauche

        const canongauche_6Objects = map_3.getObjectLayer('Ennemi_canon_gauche7_ext2').objects;
        this.canongauche_6s = this.physics.add.group({
            allowGravity: false
        });

        for (const canongauche_6 of canongauche_6Objects) {
            this.canongauche_6s.create(canongauche_6.x, canongauche_6.y, 'canon_gauche')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 7e canon gauche

        this.anims.create({
            key: 'canongauche_6_turn',
            frames: [ { key: 'canon_gauche', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canongauche_6_right',
            frames: this.anims.generateFrameNumbers('canon_gauche', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du 7e canon gauche

        const projectilE_6Objects = map_3.getObjectLayer('Ennemi_canon_gauche7_ext2').objects;
        this.projectilE_6s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : Canon droit

        const canondroitObjects = map_3.getObjectLayer('Ennemi_canon_droit_ext2').objects;
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
            frames: this.anims.generateFrameNumbers('canon_droit', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du canon droit

        const projectilE2Objects = map_3.getObjectLayer('Ennemi_canon_droit_ext2').objects;
        this.projectilE2s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 2e Canon droit

        const canondroit2Objects = map_3.getObjectLayer('Ennemi_canon_droit2_ext2').objects;
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
            frames: this.anims.generateFrameNumbers('canon_droit', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du 2e canon droit

        const projectilE2_1Objects = map_3.getObjectLayer('Ennemi_canon_droit2_ext2').objects;
        this.projectilE2_1s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 3e Canon droit

        const canondroit2_1Objects = map_3.getObjectLayer('Ennemi_canon_droit3_ext2').objects;
        this.canondroit2_1s = this.physics.add.group({
            allowGravity: false
        });

        for (const canondroit2_1 of canondroit2_1Objects) {
            this.canondroit2_1s.create(canondroit2_1.x, canondroit2_1.y, 'canon_droit')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 3e canon droit

        this.anims.create({
            key: 'canondroit2_1_turn',
            frames: [ { key: 'canon_droit', frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canondroit2_1_right',
            frames: this.anims.generateFrameNumbers('canon_droit', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du 3e canon droit

        const projectilE2_2Objects = map_3.getObjectLayer('Ennemi_canon_droit3_ext2').objects;
        this.projectilE2_2s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 4e Canon droit

        const canondroit2_2Objects = map_3.getObjectLayer('Ennemi_canon_droit4_ext2').objects;
        this.canondroit2_2s = this.physics.add.group({
            allowGravity: false
        });

        for (const canondroit2_2 of canondroit2_2Objects) {
            this.canondroit2_2s.create(canondroit2_2.x, canondroit2_2.y, 'canon_droit')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 4e canon droit

        this.anims.create({
            key: 'canondroit2_2_turn',
            frames: [ { key: 'canon_droit', frame: 1 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canondroit2_2_right',
            frames: this.anims.generateFrameNumbers('canon_droit', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du 4e canon droit

        const projectilE2_3Objects = map_3.getObjectLayer('Ennemi_canon_droit4_ext2').objects;
        this.projectilE2_3s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : Canon haut (fixé au plafond)

        const canonhautObjects = map_3.getObjectLayer('Ennemi_canon_haut_ext2').objects;
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
            frameRate: 1.6,
            repeat: -1
        });

        //Ennemi : Projectile du canon haut (fixé au plafond)

        const projectilE3Objects = map_3.getObjectLayer('Ennemi_canon_haut_ext2').objects;
        this.projectilE3s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 2e Canon haut (fixé au plafond)

        const canonhaut2Objects = map_3.getObjectLayer('Ennemi_canon_haut2_ext2').objects;
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
            frameRate: 1.6,
            repeat: -1
        });

        //Ennemi : Projectile du 2e canon haut (fixé au plafond)

        const projectilE3_1Objects = map_3.getObjectLayer('Ennemi_canon_haut2_ext2').objects;
        this.projectilE3_1s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : Canon gauche téléguidé

        const canongauche_teleObjects = map_3.getObjectLayer('Ennemi_canongauche_tele_ext2').objects;
        this.canongauche_teles = this.physics.add.group({
            allowGravity: false
        });

        for (const canongauche_tele of canongauche_teleObjects) {
            this.canongauche_teles.create(canongauche_tele.x, canongauche_tele.y, 'canongauche_tele')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du canon gauche téléguidé

        this.anims.create({
            key: 'canongauche_tele_turn',
            frames: [ { key: 'canongauche_tele', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canongauche_tele_right',
            frames: this.anims.generateFrameNumbers('canongauche_tele', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du canon gauche téléguidé

        const projecteleObjects = map_3.getObjectLayer('Ennemi_canongauche_tele_ext2').objects;
        this.projecteles = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : Canon gauche téléguidé 2

        const canongauche_tele2Objects = map_3.getObjectLayer('Ennemi_canongauche_tele2_ext2').objects;
        this.canongauche_tele2s = this.physics.add.group({
            allowGravity: false
        });

        for (const canongauche_tele2 of canongauche_tele2Objects) {
            this.canongauche_tele2s.create(canongauche_tele2.x, canongauche_tele2.y, 'canongauche_tele')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du canon gauche téléguidé 2

        this.anims.create({
            key: 'canongauche_tele2_turn',
            frames: [ { key: 'canongauche_tele', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canongauche_tele2_right',
            frames: this.anims.generateFrameNumbers('canongauche_tele', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du canon gauche téléguidé 2

        const projectele_2Objects = map_3.getObjectLayer('Ennemi_canongauche_tele2_ext2').objects;
        this.projectele_2s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : Canon haut téléguidé

        const canonhaut_teleObjects = map_3.getObjectLayer('Ennemi_canonhaut_tele_ext2').objects;
        this.canonhaut_teles = this.physics.add.group({
            allowGravity: false
        });

        for (const canonhaut_tele of canonhaut_teleObjects) {
            this.canonhaut_teles.create(canonhaut_tele.x, canonhaut_tele.y, 'canonhaut_tele')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du canon gauche téléguidé

        this.anims.create({
            key: 'canonhaut_tele_turn',
            frames: [ { key: 'canonhaut_tele', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canonhaut_tele_right',
            frames: this.anims.generateFrameNumbers('canonhaut_tele', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du canon gauche téléguidé

        const projectele2Objects = map_3.getObjectLayer('Ennemi_canonhaut_tele_ext2').objects;
        this.projectele2s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 2e Canon haut téléguidé

        const canonhaut_tele_1Objects = map_3.getObjectLayer('Ennemi_canonhaut_tele2_ext2').objects;
        this.canonhaut_tele_1s = this.physics.add.group({
            allowGravity: false
        });

        for (const canonhaut_tele_1 of canonhaut_tele_1Objects) {
            this.canonhaut_tele_1s.create(canonhaut_tele_1.x, canonhaut_tele_1.y, 'canonhaut_tele')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 2e canon gauche téléguidé

        this.anims.create({
            key: 'canonhaut_tele_1_turn',
            frames: [ { key: 'canonhaut_tele', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canonhaut_tele_1_right',
            frames: this.anims.generateFrameNumbers('canonhaut_tele', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du 2e canon gauche téléguidé

        const projectele2_1Objects = map_3.getObjectLayer('Ennemi_canonhaut_tele2_ext2').objects;
        this.projectele2_1s = this.physics.add.group({
            allowGravity: false
        });

        //Ennemi : 3e Canon haut téléguidé

        const canonhaut_tele_2Objects = map_3.getObjectLayer('Ennemi_canonhaut_tele3_ext2').objects;
        this.canonhaut_tele_2s = this.physics.add.group({
            allowGravity: false
        });

        for (const canonhaut_tele_2 of canonhaut_tele_2Objects) {
            this.canonhaut_tele_2s.create(canonhaut_tele_2.x, canonhaut_tele_2.y, 'canonhaut_tele')
                .setOrigin(0.5,0.5)
                .setDepth(1)
                .setScale(1)
                .setGravityY(300)
        }

        //Animations du 3e canon gauche téléguidé

        this.anims.create({
            key: 'canonhaut_tele_2_turn',
            frames: [ { key: 'canonhaut_tele', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'canonhaut_tele_2_right',
            frames: this.anims.generateFrameNumbers('canonhaut_tele', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        //Ennemi : Projectile du 3e canon gauche téléguidé

        const projectele2_2Objects = map_3.getObjectLayer('Ennemi_canonhaut_tele3_ext2').objects;
        this.projectele2_2s = this.physics.add.group({
            allowGravity: false
        });

        //Clavier
        keys = this.input.keyboard.addKeys({
            q: Phaser.Input.Keyboard.KeyCodes.Q,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            z: Phaser.Input.Keyboard.KeyCodes.Z,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        });

        //Collisions
        this.physics.add.collider(player, platforms_ext2);
        this.physics.add.collider(player, piege_ext2, piegemort, null, this);
        this.physics.add.collider(power_up, platforms_ext2);
        this.physics.add.collider(player, power_up, collectPowerUp, null, this);
        this.physics.add.collider(player, changescene_ext2, changementscene3, null, this);

        this.physics.add.collider(this.zetsus, platforms_ext2);
        this.physics.add.collider(this.zetsus, bloque_zetsu_ext2);
        this.physics.add.collider(this.zetsus, this.zetsus);
        this.physics.add.collider(player, this.zetsus, zetsumort, null, this);

        this.physics.add.collider(this.araignees, platforms_ext2);
        this.physics.add.collider(player, this.araignees, araigneemort, null, this);

        this.physics.add.collider(this.chenilles, platforms_ext2);
        this.physics.add.collider(player, this.chenilles, chenillemort, null, this);

        this.physics.add.collider(this.fusees, platforms_ext2);
        this.physics.add.collider(player, this.fusees, fuseemort, null, this);

        this.physics.add.collider(this.tanks, platforms_ext2);
        this.physics.add.collider(player, this.tanks, tankmort, null, this);

        this.physics.add.collider(this.projectilEs, platforms_ext2);
        this.physics.add.collider(player, this.projectilEs, projectilEmort, null, this);
        this.physics.add.collider(platforms_ext2, this.projectilEs,  disparitionprojectilE, null, this);

        //Caméra
        this.cameras.main.startFollow(player);
        this.cameras.main.fadeIn(400);
        this.cameras.main.setBounds(0, 0, map_3.widthInPixels, map_3.heightInPixels);

        //Affichage de la position du joueur
        positionXtext = this.add.text(0, 0, 'PositionX', + player.x, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);
        positionYtext = this.add.text(0, 20, 'PositionY', + player.y, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);
    }
    update(){

        //Affichage de la position du joueur
        positionXtext.setText('Position X :' + player.x);
        positionYtext.setText('Position Y :' + player.y);

        if(player.x >= 7950 && player.y < 750){
            changementscene3;
        }

        //Game Over
        if (gameOver){
            gameOverText = this.add.image(896/2, 448/2, 'gameover').setScrollFactor(0).setDepth(1);
            if(keys.enter.isDown){
                restart = true;
                if(player.x > 1080 && player.x < 2530 && player.y >= 0){
                    this.scene.restart();
                    position3playerX = 158;
                    position3playerY = 174;
                    jetpack = true;
                    tirs = 1;
                    tirs_1 = 1;
                    tirs_2 = 1;
                    tirs_3 = 1;
                    tirs_4 = 1;
                    tirs_5 = 1;
                    tirs_6 = 1;
                    tirs2 = 1;
                    tirs2_1 = 1;
                    tirs2_2 = 1;
                    tirs2_3 = 1;
                    tirs3 = 1;
                    tirs3_1 = 1;
                    tirtele = 1;
                    tirtele_1 = 1;
                    tirtele2 = 1;
                    tirtele2_1 = 1;
                    tirtele2_2 = 1;
                    jet2 = true;
                    gameOver = false;
                }
                if(player.x > 2530 && player.x < 4767 && player.y >= 0){
                    this.scene.restart();
                    position3playerX = 2530;
                    position3playerY = 78;
                    jetpack = true;
                    tirs = 1;
                    tirs_1 = 1;
                    tirs_2 = 1;
                    tirs_3 = 1;
                    tirs_4 = 1;
                    tirs_5 = 1;
                    tirs_6 = 1;
                    tirs2 = 1;
                    tirs2_1 = 1;
                    tirs2_2 = 1;
                    tirs2_3 = 1;
                    tirs3 = 1;
                    tirs3_1 = 1;
                    tirtele = 1;
                    tirtele_1 = 1;
                    tirtele2 = 1;
                    tirtele2_1 = 1;
                    tirtele2_2 = 1;
                    jet2 = true;
                    gameOver = false;
                }
                if(player.x > 4767 && player.x < 6105 && player.y >= 0){
                    this.scene.restart();
                    position3playerX = 4767;
                    position3playerY = 109;
                    jetpack = true;
                    tirs = 1;
                    tirs_1 = 1;
                    tirs_2 = 1;
                    tirs_3 = 1;
                    tirs_4 = 1;
                    tirs_5 = 1;
                    tirs_6 = 1;
                    tirs2 = 1;
                    tirs2_1 = 1;
                    tirs2_2 = 1;
                    tirs2_3 = 1;
                    tirs3 = 1;
                    tirs3_1 = 1;
                    tirtele = 1;
                    tirtele_1 = 1;
                    tirtele2 = 1;
                    tirtele2_1 = 1;
                    tirtele2_2 = 1;
                    jet2 = true;
                    gameOver = false;
                }
                if(player.x > 6105 && player.x < 7910 && player.y >= 0){
                    this.scene.restart();
                    position3playerX = 6105;
                    position3playerY = 78;
                    jetpack = true;
                    tirs = 1;
                    tirs_1 = 1;
                    tirs_2 = 1;
                    tirs_3 = 1;
                    tirs_4 = 1;
                    tirs_5 = 1;
                    tirs_6 = 1;
                    tirs2 = 1;
                    tirs2_1 = 1;
                    tirs2_2 = 1;
                    tirs2_3 = 1;
                    tirs3 = 1;
                    tirs3_1 = 1;
                    tirtele = 1;
                    tirtele_1 = 1;
                    tirtele2 = 1;
                    tirtele2_1 = 1;
                    tirtele2_2 = 1;
                    jet2 = true;
                    gameOver = false;
                }
                else{
                this.scene.restart();
                jetpack = true;
                tirs = 1;
                tirs_1 = 1;
                tirs_2 = 1;
                tirs_3 = 1;
                tirs_4 = 1;
                tirs_5 = 1;
                tirs_6 = 1;
                tirs2 = 1;
                tirs2_1 = 1;
                tirs2_2 = 1;
                tirs2_3 = 1;
                tirs3 = 1;
                tirs3_1 = 1;
                tirtele = 1;
                tirtele_1 = 1;
                tirtele2 = 1;
                tirtele2_1 = 1;
                tirtele2_2 = 1;
                jet2 = true;
                gameOver = false;
                }
            }
            return;
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

        //Déplacements du Zetsu

        for (const zetsu of this.zetsus.children.entries){
            if(player.x > 516 && player.x < 1010 && player.y > 402){
                this.physics.moveToObject(zetsu, player, 300)
                if(zetsu.body.blocked.left){
                    zetsu.setVelocityY(-250);
                }
                else if(zetsu.body.blocked.right){
                    zetsu.setVelocityY(-250);
                }
            }
            else {
                zetsu.setVelocityX(-50);
                zetsu.setVelocityY(-50);
            }

            if(player.x > 4780 && player.x < 5770 && player.y > 300){
                this.physics.moveToObject(zetsu, player, 250)
                if(player.y < zetsu.y){
                    if(zetsu.body.blocked.right){
                        zetsu.setVelocityY(-250);
                    }
                    else if(zetsu.body.blocked.left){
                        zetsu.setVelocityY(-250);
                    }
                }
                if(player.x > zetsu.x){
                    if(zetsu.body.blocked.left){
                        zetsu.setVelocityY(250);
                    }
                    else if(zetsu.body.blocked.right){
                        zetsu.setVelocityY(250);
                    }
                }
            }
            if (player.y <= 110){
                zetsu.setVelocityX(-50);
                zetsu.setVelocityY(-50);
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
                
            }
            
            else if (chenille.body.blocked.left) {
                chenille.direction = 'RIGHT';
            }

            else{
                chenille.setVelocityX(80);
            }

            if(chenille.direction === 'LEFT'){
                chenille.setVelocityX(-80);
                chenille.anims.play('chenille_left', true);

            }

            else if(chenille.direction === 'RIGHT'){
                chenille.setVelocityX(80);
                chenille.anims.play('chenille_right', true);
            }

            if(player.x > 270 && player.x < 655 && player.x < chenille.x && player.y > 180 && player.y < 210 && chenille.direction === 'LEFT'){
                chenille.setVelocityX(-300);
                chenille.anims.play('chenille_left', true);
            }
            else if(player.x > 270 && player.x < 655 && player.x > chenille.x && player.y > 180 && player.y < 210 && chenille.direction === 'RIGHT'){
                chenille.setVelocityX(300);
                chenille.anims.play('chenille_right', true);
            }

            if(player.x > 2600 && player.x < 3635 && player.x < chenille.x && player.y > 80 && player.y < 145 && chenille.direction === 'LEFT'){
                chenille.setVelocityX(-300);
                chenille.anims.play('chenille_left', true);
            }
            else if(player.x > 2600 && player.x < 3635 && player.x > chenille.x && player.y > 80 && player.y < 145 && chenille.direction === 'RIGHT'){
                chenille.setVelocityX(300);
                chenille.anims.play('chenille_right', true);
            }
            if(player.x > 5005 && player.x < 5585 && player.x < chenille.x && player.y > 0 && player.y < 120 && chenille.direction === 'LEFT'){
                chenille.setVelocityX(-300);
                chenille.anims.play('chenille_left', true);
            }
            else if(player.x > 5005 && player.x < 5585 && player.x > chenille.x && player.y > 0 && player.y < 120 && chenille.direction === 'RIGHT'){
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

        //Déplacements du tank

        for (const tank of this.tanks.children.entries){
            if(player.x > 1940 && player.x < 2515 && player.y > 304 && player.y < 400){
                if (tank.body.blocked.right) {
                    tank.direction = 'LEFT';
                    
                }
                
                else if (tank.body.blocked.left) {
                    tank.direction = 'RIGHT';
                }

                else if(player.x < tank.x){
                    tank.direction = 'LEFT';
                }

                else if(player.x > tank.x){
                    tank.direction = 'RIGHT';
                }
    
                else{
                    tank.setVelocity(60);
                }
    
                if(tank.direction === 'LEFT'){
                    tank.setVelocityX(-60);
                    tank.anims.play('tank_left', true);
    
                }
    
                else if(tank.direction === 'RIGHT'){
                    tank.setVelocityX(60);
                    tank.anims.play('tank_right', true);
                }
            }

            if(player.x > 1770 && player.x < 2343 && player.y > 175 && player.y < 240){
                if (tank.body.blocked.right) {
                    tank.direction = 'LEFT';
                    
                }
                
                else if (tank.body.blocked.left) {
                    tank.direction = 'RIGHT';
                }

                else if(player.x < tank.x){
                    tank.direction = 'LEFT';
                }

                else if(player.x > tank.x){
                    tank.direction = 'RIGHT';
                }
    
                else{
                    tank.setVelocity(60);
                }
    
                if(tank.direction === 'LEFT'){
                    tank.setVelocityX(-60);
                    tank.anims.play('tank_left', true);
    
                }
    
                else if(tank.direction === 'RIGHT'){
                    tank.setVelocityX(60);
                    tank.anims.play('tank_right', true);
                }
            }
            if(player.x > 3670 && player.x < 4450 && player.y > 175 && player.y > 780 && player.y < 880){
                if (tank.body.blocked.right) {
                    tank.direction = 'LEFT';
                    
                }
                
                else if (tank.body.blocked.left) {
                    tank.direction = 'RIGHT';
                }

                else if(player.x < tank.x){
                    tank.direction = 'LEFT';
                }

                else if(player.x > tank.x){
                    tank.direction = 'RIGHT';
                }
    
                else{
                    tank.setVelocity(60);
                }
    
                if(tank.direction === 'LEFT'){
                    tank.setVelocityX(-60);
                    tank.anims.play('tank_left', true);
    
                }
    
                else if(tank.direction === 'RIGHT'){
                    tank.setVelocityX(60);
                    tank.anims.play('tank_right', true);
                }
            }
            if(player.x < 1770){
                if (tank.body.blocked.right) {
                    tank.direction = 'LEFT';
                
                }
            
                else if (tank.body.blocked.left) {
                    tank.direction = 'RIGHT';
                }
                else{
                    tank.setVelocity(60);
                }

                if(tank.direction === 'LEFT'){
                    tank.setVelocityX(-60);
                    tank.anims.play('tank_left', true);

                }

                else if(tank.direction === 'RIGHT'){
                    tank.setVelocityX(60);
                    tank.anims.play('tank_right', true);
                }
            }
            if(player.x > 4450){
                if (tank.body.blocked.right) {
                    tank.direction = 'LEFT';
                
                }
            
                else if (tank.body.blocked.left) {
                    tank.direction = 'RIGHT';
                }
                else{
                    tank.setVelocity(60);
                }

                if(tank.direction === 'LEFT'){
                    tank.setVelocityX(-60);
                    tank.anims.play('tank_left', true);

                }

                else if(tank.direction === 'RIGHT'){
                    tank.setVelocityX(60);
                    tank.anims.play('tank_right', true);
                }
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
            
            
            if(player.x >= 0 && tirs == 1){
                tirs = 0;
                projectilE = this.physics.add.sprite(canongauche.x, canongauche.y, 'projectile');
                projectilE.setVelocityX(320);
                projectilE.body.allowGravity = false;
                canongauche.play('canongauche_right', true);
                this.physics.add.collider(projectilE, platforms_ext2, disparitionprojectilE, null, this);
                this.physics.add.collider(player, projectilE, projectilEmort, null, this);
            }
        }

        //Animation du 2e canon gauche

        for (const canongauche_1 of this.canongauche_1s.children.entries){

            if(keys.q.isDown){
                canongauche_1.anims.play('canongauche_1_right', true);
            }

            else if(keys.d.isDown){
                canongauche_1.anims.play('canongauche_1_right', true);
            }

            else if(keys.space.isDown){
                canongauche_1.anims.play('canongauche_1_right', true);
            }

            if(keys.z.isDown){
                canongauche_1.anims.play('canongauche_1_right', true);
            }
        }

        //Tirs de projectile du 2e canon gauche

        for (const canongauche_1 of this.canongauche_1s.children.entries) {
            
            
            if(player.x >= 0 && tirs_1 == 1){
                tirs_1 = 0;
                projectilE_1 = this.physics.add.sprite(canongauche_1.x, canongauche_1.y, 'projectile');
                projectilE_1.setVelocityX(580);
                projectilE_1.body.allowGravity = false;
                canongauche_1.play('canongauche_right', true);
                this.physics.add.collider(projectilE_1, platforms_ext2, disparitionprojectilE_1, null, this);
                this.physics.add.collider(player, projectilE_1, projectilE_1mort, null, this);
            }
        }

        //Animation du 3e canon gauche

        for (const canongauche_2 of this.canongauche_2s.children.entries){

            if(keys.q.isDown){
                canongauche_2.anims.play('canongauche_2_right', true);
            }

            else if(keys.d.isDown){
                canongauche_2.anims.play('canongauche_2_right', true);
            }

            else if(keys.space.isDown){
                canongauche_2.anims.play('canongauche_2_right', true);
            }

            if(keys.z.isDown){
                canongauche_2.anims.play('canongauche_2_right', true);
            }
        }

        //Tirs de projectile du 3e canon gauche

        for (const canongauche_2 of this.canongauche_2s.children.entries) {
            
            
            if(player.x >= 0 && tirs_2 == 1){
                tirs_2 = 0;
                projectilE_2 = this.physics.add.sprite(canongauche_2.x, canongauche_2.y, 'projectile');
                projectilE_2.setVelocityX(580);
                projectilE_2.body.allowGravity = false;
                canongauche_2.play('canongauche_right', true);
                this.physics.add.collider(projectilE_2, platforms_ext2, disparitionprojectilE_2, null, this);
                this.physics.add.collider(player, projectilE_2, projectilE_2mort, null, this);
            }
        }

        //Animation du 4e canon gauche

        for (const canongauche_3 of this.canongauche_3s.children.entries){

            if(keys.q.isDown){
                canongauche_3.anims.play('canongauche_3_right', true);
            }

            else if(keys.d.isDown){
                canongauche_3.anims.play('canongauche_3_right', true);
            }

            else if(keys.space.isDown){
                canongauche_3.anims.play('canongauche_3_right', true);
            }

            if(keys.z.isDown){
                canongauche_3.anims.play('canongauche_3_right', true);
            }
        }

        //Tirs de projectile du 4e canon gauche

        for (const canongauche_3 of this.canongauche_3s.children.entries) {
            
            
            if(player.x >= 0 && tirs_3 == 1){
                tirs_3 = 0;
                projectilE_3 = this.physics.add.sprite(canongauche_3.x, canongauche_3.y, 'projectile');
                projectilE_3.setVelocityX(150);
                projectilE_3.body.allowGravity = false;
                canongauche_3.play('canongauche_right', true);
                this.physics.add.collider(projectilE_3, platforms_ext2, disparitionprojectilE_3, null, this);
                this.physics.add.collider(player, projectilE_3, projectilE_3mort, null, this);
            }
        }

        //Animation du 5e canon gauche

        for (const canongauche_4 of this.canongauche_4s.children.entries){

            if(keys.q.isDown){
                canongauche_4.anims.play('canongauche_4_right', true);
            }

            else if(keys.d.isDown){
                canongauche_4.anims.play('canongauche_4_right', true);
            }

            else if(keys.space.isDown){
                canongauche_4.anims.play('canongauche_4_right', true);
            }

            if(keys.z.isDown){
                canongauche_4.anims.play('canongauche_4_right', true);
            }
        }

        //Tirs de projectile du 5e canon gauche

        for (const canongauche_4 of this.canongauche_4s.children.entries) {
            
            
            if(player.x >= 0 && tirs_4 == 1){
                tirs_4 = 0;
                projectilE_4 = this.physics.add.sprite(canongauche_4.x, canongauche_4.y, 'projectile');
                projectilE_4.setVelocityX(150);
                projectilE_4.body.allowGravity = false;
                canongauche_4.play('canongauche_right', true);
                this.physics.add.collider(projectilE_4, platforms_ext2, disparitionprojectilE_4, null, this);
                this.physics.add.collider(player, projectilE_4, projectilE_4mort, null, this);
            }
        }

        //Animation du 6e canon gauche

        for (const canongauche_5 of this.canongauche_5s.children.entries){

            if(keys.q.isDown){
                canongauche_5.anims.play('canongauche_5_right', true);
            }

            else if(keys.d.isDown){
                canongauche_5.anims.play('canongauche_5_right', true);
            }

            else if(keys.space.isDown){
                canongauche_5.anims.play('canongauche_5_right', true);
            }

            if(keys.z.isDown){
                canongauche_5.anims.play('canongauche_5_right', true);
            }
        }

        //Tirs de projectile du 6e canon gauche

        for (const canongauche_5 of this.canongauche_5s.children.entries) {
            
            
            if(player.x >= 0 && tirs_5 == 1){
                tirs_5 = 0;
                projectilE_5 = this.physics.add.sprite(canongauche_5.x, canongauche_5.y, 'projectile');
                projectilE_5.setVelocityX(150);
                projectilE_5.body.allowGravity = false;
                canongauche_5.play('canongauche_right', true);
                this.physics.add.collider(projectilE_5, platforms_ext2, disparitionprojectilE_5, null, this);
                this.physics.add.collider(player, projectilE_5, projectilE_5mort, null, this);
            }
        }

        //Animation du 7e canon gauche

        for (const canongauche_6 of this.canongauche_6s.children.entries){

            if(keys.q.isDown){
                canongauche_6.anims.play('canongauche_6_right', true);
            }

            else if(keys.d.isDown){
                canongauche_6.anims.play('canongauche_6_right', true);
            }

            else if(keys.space.isDown){
                canongauche_6.anims.play('canongauche_6_right', true);
            }

            if(keys.z.isDown){
                canongauche_6.anims.play('canongauche_6_right', true);
            }
        }

        //Tirs de projectile du 7e canon gauche

        for (const canongauche_6 of this.canongauche_6s.children.entries) {
            
            
            if(player.x >= 0 && tirs_6 == 1){
                tirs_6 = 0;
                projectilE_6 = this.physics.add.sprite(canongauche_6.x, canongauche_6.y, 'projectile');
                projectilE_6.setVelocityX(150);
                projectilE_6.body.allowGravity = false;
                canongauche_6.play('canongauche_right', true);
                this.physics.add.collider(projectilE_6, platforms_ext2, disparitionprojectilE_6, null, this);
                this.physics.add.collider(player, projectilE_6, projectilE_6mort, null, this);
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
            
            
            if(player.x >= 0 && tirs2 == 1){
                tirs2 = 0;
                projectilE2 = this.physics.add.sprite(canondroit.x, canondroit.y, 'projectile');
                projectilE2.setVelocityX(-320);
                projectilE2.body.allowGravity = false;
                canondroit.play('canondroit_right', true);
                this.physics.add.collider(projectilE2, platforms_ext2, disparitionprojectilE2, null, this);
                this.physics.add.collider(player, projectilE2, projectilE2mort, null, this);
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
            
            
            if(player.x >= 0 && tirs2_1 == 1){
                tirs2_1 = 0;
                projectilE2_1 = this.physics.add.sprite(canondroit2.x, canondroit2.y, 'projectile');
                projectilE2_1.setVelocityX(-150);
                projectilE2_1.body.allowGravity = false;
                canondroit2.play('canondroit_right', true);
                this.physics.add.collider(projectilE2_1, platforms_ext2, disparitionprojectilE2_1, null, this);
                this.physics.add.collider(player, projectilE2_1, projectilE2_1mort, null, this);
            }
        }

        //Animation du 3e canon droit

        for (const canondroit2_1 of this.canondroit2_1s.children.entries){

            if(keys.q.isDown){
                canondroit2_1.anims.play('canondroit2_1_right', true);
            }

            else if(keys.d.isDown){
                canondroit2_1.anims.play('canondroit2_1_right', true);
            }

            else if(keys.space.isDown){
                canondroit2_1.anims.play('canondroit2_1_right', true);
            }

            if(keys.z.isDown){
                canondroit2_1.anims.play('canondroit2_1_right', true);
            }
        }

        //Tirs de projectile du 3e canon droit

        for (const canondroit2_1 of this.canondroit2_1s.children.entries) {
            
            
            if(player.x >= 0 && tirs2_2 == 1){
                tirs2_2 = 0;
                projectilE2_2 = this.physics.add.sprite(canondroit2_1.x, canondroit2_1.y, 'projectile');
                projectilE2_2.setVelocityX(-150);
                projectilE2_2.body.allowGravity = false;
                canondroit2_1.play('canondroit_right', true);
                this.physics.add.collider(projectilE2_2, platforms_ext2, disparitionprojectilE2_2, null, this);
                this.physics.add.collider(player, projectilE2_2, projectilE2_2mort, null, this);
            }
        }

        //Animation du 4e canon droit

        for (const canondroit2_2 of this.canondroit2_2s.children.entries){

            if(keys.q.isDown){
                canondroit2_2.anims.play('canondroit2_2_right', true);
            }

            else if(keys.d.isDown){
                canondroit2_2.anims.play('canondroit2_2_right', true);
            }

            else if(keys.space.isDown){
                canondroit2_2.anims.play('canondroit2_2_right', true);
            }

            if(keys.z.isDown){
                canondroit2_2.anims.play('canondroit2_2_right', true);
            }
        }

        //Tirs de projectile du 4e canon droit

        for (const canondroit2_2 of this.canondroit2_2s.children.entries) {
            
            
            if(player.x >= 0 && tirs2_3 == 1){
                tirs2_3 = 0;
                projectilE2_3 = this.physics.add.sprite(canondroit2_2.x, canondroit2_2.y, 'projectile');
                projectilE2_3.setVelocityX(-150);
                projectilE2_3.body.allowGravity = false;
                canondroit2_2.play('canondroit_right', true);
                this.physics.add.collider(projectilE2_3, platforms_ext2, disparitionprojectilE2_3, null, this);
                this.physics.add.collider(player, projectilE2_2, projectilE2_3mort, null, this);
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

        //Tirs de projectile du canon haut (fixé au plafond)

        for (const canonhaut of this.canonhauts.children.entries) {
            
            
            if(player.x >= 0 && tirs3 == 1){
                tirs3 = 0;
                projectilE3 = this.physics.add.sprite(canonhaut.x, canonhaut.y, 'projectile');
                projectilE3.setVelocityY(150);
                projectilE3.body.allowGravity = false;
                canonhaut.play('canonhaut_right', true);
                this.physics.add.collider(projectilE3, platforms_ext2, disparitionprojectilE3, null, this);
                this.physics.add.collider(player, projectilE3, projectilE3mort, null, this);
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

        //Tirs de projectile du 2e canon haut (fixé au plafond)

        for (const canonhaut2 of this.canonhaut2s.children.entries) {
            
            
            if(player.x >= 0 && tirs3_1 == 1){
                tirs3_1 = 0;
                projectilE3_1 = this.physics.add.sprite(canonhaut2.x, canonhaut2.y, 'projectile');
                projectilE3_1.setVelocityY(150);
                projectilE3_1.body.allowGravity = false;
                canonhaut2.play('canonhaut2_right', true);
                this.physics.add.collider(projectilE3_1, platforms_ext2, disparitionprojectilE3_1, null, this);
                this.physics.add.collider(player, projectilE3_1, projectilE3_1mort, null, this);
            }
        }

        //Animation du canon gauche téléguidé

        for (const canongauche_tele of this.canongauche_teles.children.entries){

            if(keys.q.isDown){
                canongauche_tele.anims.play('canongauche_tele_right', true);
            }

            else if(keys.d.isDown){
                canongauche_tele.anims.play('canongauche_tele_right', true);
            }

            else if(keys.space.isDown){
                canongauche_tele.anims.play('canongauche_tele_right', true);
            }

            if(keys.z.isDown){
                canongauche_tele.anims.play('canongauche_tele_right', true);
            }
        }

        //Tirs de projectile du canon gauche téléguidé

        for (const canongauche_tele of this.canongauche_teles.children.entries) {
            
            
            if(player.x >= 3856 && player.x <= 4496 && player.y <= 622 && player.y >= 420 && tirtele == 1){
                tirtele = 0;
                projectele = this.physics.add.sprite(canongauche_tele.x, canongauche_tele.y, 'projectele');
                this.physics.moveToObject(projectele, player, 200);
                /*projectele = this.physics.add.group({
                    allowGravity: false
                });*/
                canongauche_tele.play('canongauche_tele_right', true);
                this.physics.add.collider(projectele, platforms_ext2, disparitionprojectele, null, this);
                this.physics.add.collider(player, projectele, projectelemort, null, this);
            }
            else{
                if(tirtele == 1){
                    tirtele = 0;
                    projectele = this.physics.add.sprite(canongauche_tele.x, canongauche_tele.y, 'projectele');
                    projectele.setVelocityX(320);
                    projectele.body.allowGravity = false;
                    canongauche_tele.play('canongauche_tele_right', true);
                    this.physics.add.collider(projectele, platforms_ext2, disparitionprojectele, null, this);
                    this.physics.add.collider(player, projectele, projectelemort, null, this)
                }
            }
        }

        //Animation du canon gauche téléguidé 2

        for (const canongauche_tele2 of this.canongauche_tele2s.children.entries){

            if(keys.q.isDown){
                canongauche_tele2.anims.play('canongauche_tele2_right', true);
            }

            else if(keys.d.isDown){
                canongauche_tele2.anims.play('canongauche_tele2_right', true);
            }

            else if(keys.space.isDown){
                canongauche_tele2.anims.play('canongauche_tele2_right', true);
            }

            if(keys.z.isDown){
                canongauche_tele2.anims.play('canongauche_tele2_right', true);
            }
        }

        //Tirs de projectile du canon gauche téléguidé 2

        for (const canongauche_tele2 of this.canongauche_tele2s.children.entries) {
            
            
            if(player.x >= 3856 && player.x <= 4496 && player.y >= 242 && player.y <= 420 && tirtele_1 == 1){
                tirtele_1 = 0;
                projectele_1 = this.physics.add.sprite(canongauche_tele2.x, canongauche_tele2.y, 'projectele');
                this.physics.moveToObject(projectele_1, player, 200);
                /*projectele = this.physics.add.group({
                    allowGravity: false
                });*/
                canongauche_tele2.play('canongauche_tele2_right', true);
                this.physics.add.collider(projectele_1, platforms_ext2, disparitionprojectele_1, null, this);
                this.physics.add.collider(player, projectele_1, projectele_1mort, null, this);
            }
            else{
                if(tirtele_1 == 1){
                    tirtele_1 = 0;
                    projectele_1 = this.physics.add.sprite(canongauche_tele2.x, canongauche_tele2.y, 'projectele');
                    projectele_1.setVelocityX(320);
                    projectele_1.body.allowGravity = false;
                    canongauche_tele2.play('canongauche_tele2_right', true);
                    this.physics.add.collider(projectele_1, platforms_ext2, disparitionprojectele_1, null, this);
                    this.physics.add.collider(player, projectele_1, projectele_1mort, null, this)
                }
            }
        }

        //Animation du canon haut téléguidé

        for (const canonhaut_tele of this.canonhaut_teles.children.entries){

            if(keys.q.isDown){
                canonhaut_tele.anims.play('canonhaut_tele_right', true);
            }

            else if(keys.d.isDown){
                canonhaut_tele.anims.play('canonhaut_tele_right', true);
            }

            else if(keys.space.isDown){
                canonhaut_tele.anims.play('canonhaut_tele_right', true);
            }

            if(keys.z.isDown){
                canonhaut_tele.anims.play('canonhaut_tele_right', true);
            }
        }

        //Tirs de projectile du canon haut téléguidé 

        for (const canonhaut_tele of this.canonhaut_teles.children.entries) {
            
            
            if(player.x >= 6608 && player.x <= 7344 && player.y >= 180 && player.y <= 910 && tirtele2 == 1){
                tirtele2 = 0;
                projectele2 = this.physics.add.sprite(canonhaut_tele.x, canonhaut_tele.y, 'projectele');
                this.physics.moveToObject(projectele2, player, 200);
                /*projectele = this.physics.add.group({
                    allowGravity: false
                });*/
                canonhaut_tele.play('canonhaut_tele_right', true);
                this.physics.add.collider(projectele2, platforms_ext2, disparitionprojectele2, null, this);
                this.physics.add.collider(player, projectele2, projectele2mort, null, this);
            }
            else{
                if(tirtele2 == 1){
                    tirtele2 = 0;
                    projectele2 = this.physics.add.sprite(canonhaut_tele.x, canonhaut_tele.y, 'projectele');
                    projectele2.setVelocityY(320);
                    projectele2.body.allowGravity = false;
                    canonhaut_tele.play('canonhaut_tele_right', true);
                    this.physics.add.collider(projectele2, platforms_ext2, disparitionprojectele2, null, this);
                    this.physics.add.collider(player, projectele2, projectele2mort, null, this)
                }
            }
        }

        //Animation du 2e canon haut téléguidé

        for (const canonhaut_tele_1 of this.canonhaut_tele_1s.children.entries){

            if(keys.q.isDown){
                canonhaut_tele_1.anims.play('canonhaut_tele_1_right', true);
            }

            else if(keys.d.isDown){
                canonhaut_tele_1.anims.play('canonhaut_tele_1_right', true);
            }

            else if(keys.space.isDown){
                canonhaut_tele_1.anims.play('canonhaut_tele_1_right', true);
            }

            if(keys.z.isDown){
                canonhaut_tele_1.anims.play('canonhaut_tele_1_right', true);
            }
        }

        //Tirs de projectile du 2e canon haut téléguidé 

        for (const canonhaut_tele_1 of this.canonhaut_tele_1s.children.entries) {
            
            
            if(player.x >= 6608 && player.x <= 7344 && player.y >= 180 && player.y <= 910 && tirtele2_1 == 1){
                tirtele2_1 = 0;
                projectele2_1 = this.physics.add.sprite(canonhaut_tele_1.x, canonhaut_tele_1.y, 'projectele');
                this.physics.moveToObject(projectele2_1, player, 200);
                /*projectele = this.physics.add.group({
                    allowGravity: false
                });*/
                canonhaut_tele_1.play('canonhaut_tele_1_right', true);
                this.physics.add.collider(projectele2_1, platforms_ext2, disparitionprojectele2_1, null, this);
                this.physics.add.collider(player, projectele2, projectele2_1mort, null, this);
            }
            else{
                if(tirtele2_1 == 1){
                    tirtele2_1 = 0;
                    projectele2_1 = this.physics.add.sprite(canonhaut_tele_1.x, canonhaut_tele_1.y, 'projectele');
                    projectele2_1.setVelocityY(320);
                    projectele2_1.body.allowGravity = false;
                    canonhaut_tele_1.play('canonhaut_tele_1_right', true);
                    this.physics.add.collider(projectele2_1, platforms_ext2, disparitionprojectele2_1, null, this);
                    this.physics.add.collider(player, projectele2_1, projectele2_1mort, null, this)
                }
            }
        }

        //Animation du 3e canon haut téléguidé

        for (const canonhaut_tele_2 of this.canonhaut_tele_2s.children.entries){

            if(keys.q.isDown){
                canonhaut_tele_2.anims.play('canonhaut_tele_2_right', true);
            }

            else if(keys.d.isDown){
                canonhaut_tele_2.anims.play('canonhaut_tele_2_right', true);
            }

            else if(keys.space.isDown){
                canonhaut_tele_2.anims.play('canonhaut_tele_2_right', true);
            }

            if(keys.z.isDown){
                canonhaut_tele_2.anims.play('canonhaut_tele_2_right', true);
            }
        }

        //Tirs de projectile du 3e canon haut téléguidé 

        for (const canonhaut_tele_2 of this.canonhaut_tele_2s.children.entries) {
            
            
            if(player.x >= 6608 && player.x <= 7344 && player.y >= 180 && player.y <= 910 && tirtele2_2 == 1){
                tirtele2_2 = 0;
                projectele2_2 = this.physics.add.sprite(canonhaut_tele_2.x, canonhaut_tele_2.y, 'projectele');
                this.physics.moveToObject(projectele2_2, player, 200);
                projectele2_2.setGravityY(false, false);
                canonhaut_tele_2.play('canonhaut_tele_2_right', true);
                this.physics.add.collider(projectele2_2, platforms_ext2, disparitionprojectele2_2, null, this);
                this.physics.add.collider(player, projectele2_2, projectele2_2mort, null, this);
            }
            else{
                if(tirtele2_2 == 1){
                    tirtele2_2 = 0;
                    projectele2_2 = this.physics.add.sprite(canonhaut_tele_2.x, canonhaut_tele_2.y, 'projectele');
                    projectele2_2.setVelocityY(320);
                    projectele2_2.body.allowGravity = false;
                    canonhaut_tele_2.play('canonhaut_tele_2_right', true);
                    this.physics.add.collider(projectele2_2, platforms_ext2, disparitionprojectele2_2, null, this);
                    this.physics.add.collider(player, projectele2_2, projectele2_2mort, null, this)
                }
            }
        }
    }
}


    //Disparition des projectiles

    function disparitionprojectilE(projectilE, platforms_grotte1){

        projectilE.disableBody(true, true);
        projectilE.body.destroy();
        tirs = 1;

    }

    function disparitionprojectilE_1(projectilE_1, platforms_grotte1){

        projectilE_1.disableBody(true, true);
        projectilE_1.body.destroy();
        tirs_1 = 1;

    }

    function disparitionprojectilE_2(projectilE_2, platforms_grotte1){

        projectilE_2.disableBody(true, true);
        projectilE_2.body.destroy();
        tirs_2 = 1;

    }

    function disparitionprojectilE_3(projectilE_3, platforms_grotte1){

        projectilE_3.disableBody(true, true);
        projectilE_3.body.destroy();
        tirs_3 = 1;

    }

    function disparitionprojectilE_4(projectilE_4, platforms_grotte1){

        projectilE_4.disableBody(true, true);
        projectilE_4.body.destroy();
        tirs_4 = 1;

    }

    function disparitionprojectilE_5(projectilE_5, platforms_grotte1){

        projectilE_5.disableBody(true, true);
        projectilE_5.body.destroy();
        tirs_5 = 1;

    }

    function disparitionprojectilE_6(projectilE_6, platforms_grotte1){

        projectilE_6.disableBody(true, true);
        projectilE_6.body.destroy();
        tirs_6 = 1;

    }

    function disparitionprojectilE2(projectilE2, platforms_grotte1){

        projectilE2.disableBody(true, true);
        projectilE2.body.destroy();
        tirs2 = 1;

    }

    function disparitionprojectilE2_1(projectilE2_1, platforms_grotte1){

        projectilE2_1.disableBody(true, true);
        projectilE2_1.body.destroy();
        tirs2_1 = 1;

    }

    function disparitionprojectilE2_2(projectilE2_2, platforms_grotte1){

        projectilE2_2.disableBody(true, true);
        projectilE2_2.body.destroy();
        tirs2_2 = 1;

    }

    function disparitionprojectilE2_3(projectilE2_3, platforms_grotte1){

        projectilE2_3.disableBody(true, true);
        projectilE2_3.body.destroy();
        tirs2_3 = 1;

    }

    function disparitionprojectilE3(projectilE3, platforms_grotte1){

        projectilE3.disableBody(true, true);
        projectilE3.body.destroy();
        tirs3 = 1;

    }

    function disparitionprojectilE3_1(projectilE3_1, platforms_grotte1){

        projectilE3_1.disableBody(true, true);
        projectilE3_1.body.destroy();
        tirs3_1 = 1;

    }

    function disparitionprojectele(projectele, platforms_grotte1){

        projectele.disableBody(true, true);
        projectele.body.destroy();
        tirtele = 1;

    }

    function disparitionprojectele_1(projectele_1, platforms_grotte1){

        projectele_1.disableBody(true, true);
        projectele_1.body.destroy();
        tirtele_1 = 1;

    }

    function disparitionprojectele2(projectele2, platforms_grotte1){

        projectele2.disableBody(true, true);
        projectele2.body.destroy();
        tirtele2 = 1;

    }

    function disparitionprojectele2_1(projectele2_1, platforms_grotte1){

        projectele2_1.disableBody(true, true);
        projectele2_1.body.destroy();
        tirtele2_1 = 1;

    }

    function disparitionprojectele2_2(projectele2_2, platforms_grotte1){

        projectele2_2.disableBody(true, true);
        projectele2_2.body.destroy();
        tirtele2_2 = 1;

    }

    //Power-Up (Jetpack)

    function collectPowerUp(player, power_up){

        power_up.disableBody(true, true);
        recupPowerUp = true;
        jetpack = true;
        //jetpackText = this.add.text(420, 680, 'Press C to use the jetpack');
    }

    //Piège

    function piegemort(player, piege_ext2){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    //Changement de scène
    function changementscene3(player, changescene_ext2){
        if(player.x >= 7950 && player.y > 750){
            this.scene.start("sceneQuatre");
        }
    }

    //Contact fatal avec le Zetsu

    function zetsumort(player, ennemi_zetsu){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
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


    //Contact fatal avec le tank

    function tankmort(player, ennemi_tank){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    //Contact fatal avec un projectile

    function projectilEmort(player, projectilE){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE_1mort(player, projectilE_1){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE_2mort(player, projectilE_2){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE_3mort(player, projectilE_3){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE_4mort(player, projectilE_4){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE_5mort(player, projectilE_5){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE_6mort(player, projectilE_6){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE2mort(player, projectilE2){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE2_1mort(player, projectilE2_1){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE2_2mort(player, projectilE2_2){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE2_3mort(player, projectilE2_3){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE3mort(player, projectilE3){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectilE3_1mort(player, projectilE3_1){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectelemort(player, projectele){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }


    function projectele_1mort(player, projectele_1){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectele2mort(player, projectele2){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectele2_1mort(player, projectele2_1){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    function projectele2_2mort(player, projectele2_2){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }
