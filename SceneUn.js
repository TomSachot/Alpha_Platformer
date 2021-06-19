var narrato_ext1;
var narrato_ext1_2;
var narrato_ext1_3;
var narrato_ext1_4;

var narrato_grotte1;

var narrato_ext2;
var narrato_ext2_2;

var player;
var power_up;
var power_up_vie;

var restart = false;

var positionplayerX = 6000;
var positionplayerY = 70;

var position2playerX = 70;  //70
var position2playerY = 560;  // 560

var position3playerX = 70;  //70
var position3playerY = 680;  //680

var position4playerX = 1151;  //20
var position4playerY = 200;  //430

var background;
var decor_ext1;
var platforms_ext1;
var piege_ext1;
var changescene_ext1;
var bloque_zetsu_ext1;

var fond_grotte1;
var platforms_grotte1;
var piege_grotte1;
var changescene_grotte1;

var decor_ext2;
var platforms_ext2;
var piege_ext2;
var changescene_ext2;
var bloque_zetsu_ext2;

var sol_grotte2;
var platforms_grotte2;
var piege_grotte2;

var positionXtext;
var positionYtext;

var ennemi_zetsu;
var ennemi_araignee;
var ennemi_chenille;
var ennemi_fusee;

var boss;

var projectile;
var projectile2;
var projectile2_1;
var projectile2_2;
var projectile3;
var projectile3_1;

var tir = 1;
var tir2 = 1;
var tir2_1 = 1;
var tir2_2 = 1;
var tir3 = 1;
var tir3_1 = 1;

var projectilE;
var projectilE_1;
var projectilE_2;
var projectilE_3;
var projectilE_4;
var projectilE_5;
var projectilE_6;
var projectilE2;
var projectilE2_1;
var projectilE2_2;
var projectilE2_3;
var projectilE3;
var projectilE3_1;

var projectele;
var projectele_1;
var projectele2;
var projectele2_1;
var projectele2_2;

var sharingan;
var boules_blyke;

var tirs = 1;
var tirs_1 = 1;
var tirs_2 = 1;
var tirs_3 = 1;
var tirs_4 = 1;
var tirs_5 = 1;
var tirs_6 = 1;
var tirs2 = 1;
var tirs2_1 = 1;
var tirs2_2 = 1;
var tirs2_3 = 1;
var tirs3 = 1;
var tirs3_1 = 1;

var tirtele = 1;
var tirtele_1 = 1;
var tirtele2 = 1;
var tirtele2_1 = 1;
var tirtele2_2 = 1;

var jet = true;
var jet2 = true;

var paroi_grande_jet = false;

var paroi_grande;
var paroi_petite;

var keys;

var gameOver = false;
var gameOverText;


var recupPowerUp = false;
var recupPowerUpVie = false;
var jetpackText;
 
var jump = true;
var jetpack = false;
var PV = false;

var HP = 6;

var compteur = 150;
var invincible = false;

class SceneUn extends Phaser.Scene{
    constructor(){
        super("sceneUn");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        //Assets

        this.load.image('narrato_ext1', 'assets/narrato_ext1.png');
        this.load.image('narrato_ext1_2', 'assets/narrato_ext1_2.png');
        this.load.image('narrato_ext1_3', 'assets/narrato_ext1_3.png');
        this.load.image('narrato_ext1_4', 'assets/narrato_ext1_4.png');

        this.load.image('soleil_fond', 'assets/soleil.png');
        this.load.image('montagne_fond', 'assets/montagne_fond.png');
        this.load.image('nuage_fond', 'assets/nuage.png');

        this.load.spritesheet('player','assets/blyke.png', { frameWidth: 22, frameHeight: 33 } );

        this.load.image('ennemi_zetsu', 'assets/zetsu.png');
        this.load.spritesheet('ennemi_araignee', 'assets/araignee.png', { frameWidth: 52, frameHeight: 18} );
        this.load.spritesheet('ennemi_chenille', 'assets/chenille.png', { frameWidth: 52, frameHeight: 22} );

        this.load.image('tiles','assets/tiles_solmur_ext.png');
        this.load.tilemapTiledJSON('map','assets/Exte1.json');

        this.load.image('gameover','assets/gameover.png');
    }
    create(){
        //Affichage des assets
        if(restart == false){
        narrato_ext1_4 = this.add.image(448,224, 'narrato_ext1_4').setDepth(3).setScrollFactor(0).setVisible(false).setInteractive();
        narrato_ext1_3 = this.add.image(448,224, 'narrato_ext1_3').setDepth(3).setScrollFactor(0).setVisible(false).setInteractive();
        narrato_ext1_2 = this.add.image(448,224, 'narrato_ext1_2').setDepth(3).setScrollFactor(0).setVisible(false).setInteractive();
        narrato_ext1 = this.add.image(448,224, 'narrato_ext1').setDepth(3).setScrollFactor(0).setInteractive();
        
        narrato_ext1.on('pointerdown', function(){
            narrato_ext1.destroy();
            narrato_ext1_2.setVisible(true);
        });

        narrato_ext1_2.on('pointerdown', function(){
            narrato_ext1_2.destroy();
            narrato_ext1_3.setVisible(true);
        });

        narrato_ext1_3.on('pointerdown', function(){
            narrato_ext1_3.destroy();
            narrato_ext1_4.setVisible(true);
        });

        narrato_ext1_4.on('pointerdown', function(){
            narrato_ext1_4.destroy();
        });
        }

        this.add.image(4000, 480, 'soleil_fond').setScrollFactor(0.7);
        this.add.image(4000, 480, 'montagne_fond').setScrollFactor(0.9);
        this.add.image(4000, 0, 'nuage_fond').setScrollFactor(0.6);

        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('tiles_solmur_ext','tiles');

        decor_ext1 = map.createLayer('decor_ext1', tileset, 0, 0);
        platforms_ext1 = map.createLayer('sol_ext1', tileset, 0, 0);
        bloque_zetsu_ext1 = map.createLayer('bloque_zetsu_ext1', tileset, 0, 0);
        piege_ext1 = map.createLayer('piege_ext1', tileset, 0, 0);
        changescene_ext1 = map.createLayer('changescene_ext1', tileset, 0, 0);

     

        platforms_ext1.setCollisionByExclusion(-1, true);
        piege_ext1.setCollisionByExclusion(-1, true);
        bloque_zetsu_ext1.setCollisionByExclusion(-1, true);
        changescene_ext1.setCollisionByExclusion(-1, true);
    
    

        player = this.physics.add.sprite(positionplayerX, positionplayerY, 'player');

        player.setBounce(0.2);
        player.setCollideWorldBounds(false);


        //Animations de déplacements du joueur
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //Ennemi : Zetsu

        const zetsuObjects = map.getObjectLayer('Ennemi_zetsu_ext1').objects;
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

        const araigneeObjects = map.getObjectLayer('Ennemi_araignee_ext1').objects;
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

        const chenilleObjects = map.getObjectLayer('Ennemi_chenille_ext1').objects;
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




        //Clavier
        keys = this.input.keyboard.addKeys({
            q: Phaser.Input.Keyboard.KeyCodes.Q,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            z: Phaser.Input.Keyboard.KeyCodes.Z,
            c: Phaser.Input.Keyboard.KeyCodes.C,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        })

        //Collisions
        this.physics.add.collider(player, platforms_ext1);
        this.physics.add.collider(player, piege_ext1, piegemort, null, this);
        this.physics.add.collider(player, changescene_ext1, changementscene, null, this);

        this.physics.add.collider(this.zetsus, platforms_ext1);
        this.physics.add.collider(this.zetsus, bloque_zetsu_ext1);
        this.physics.add.collider(player, this.zetsus, zetsumort, null, this);

        this.physics.add.collider(this.araignees, platforms_ext1);
        this.physics.add.collider(player, this.araignees, araigneemort, null, this);

        this.physics.add.collider(this.chenilles, platforms_ext1);
        this.physics.add.collider(player, this.chenilles, chenillemort, null, this);

        //Caméra
        this.cameras.main.startFollow(player);
        this.cameras.main.fadeIn(300);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        //Affichage de la position du joueur
        positionXtext = this.add.text(0, 0, 'PositionX', + player.x, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);
        positionYtext = this.add.text(0, 20, 'PositionY', + player.y, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);
        
 

    }
    update(){

        //Affichage de la position du joueur
        positionXtext.setText('Position X :' + player.x);
        positionYtext.setText('Position Y :' + player.y);

        if(player.x>6160 && player.x<6224 && player.y == 910){
            changementscene;
        }


        //Game Over
        if (gameOver){
            gameOverText = this.add.image(896/2, 448/2, 'gameover').setScrollFactor(0).setDepth(1);
            
            if(keys.enter.isDown){
                restart = true;
                if(player.x > 2610 && player.x < 6288 && player.y >= 0){
                    this.scene.restart();
                    positionplayerX = 1890;
                    positionplayerY = 174;
                    gameOver = false;
                    narrato_ext1.destroy();
                    narrato_ext1_2.setVisible(false);
                    narrato_ext1_3.setVisible(false);
                    narrato_ext1_4.setVisible(false);
                }
                else{
                    this.scene.restart();
                    gameOver = false;
                    narrato_ext1.setVisible(false);
                    narrato_ext1_2.setVisible(false);
                    narrato_ext1_3.setVisible(false);
                    narrato_ext1_4.setVisible(false);
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

        //Déplacements du Zetsu

        for (const zetsu of this.zetsus.children.entries){
            if(player.x > 1428 && player.x < 2162 && player.y > 398){
                this.physics.moveToObject(zetsu, player, 300)
                if(zetsu.body.blocked.right){
                    zetsu.setVelocityY(-250);
                }
                else if(zetsu.body.blocked.left){
                    zetsu.setVelocityY(-250);
                }
            }
            else {
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

            if(player.x > 3984 && player.x < 4336 && player.x < chenille.x && player.y > 845 && chenille.direction === 'LEFT'){
                chenille.setVelocityX(-300);
                chenille.anims.play('chenille_left', true);
            }
            else if(player.x > 3984 && player.x < 4336 && player.x > chenille.x && player.y > 845 && chenille.direction === 'RIGHT'){
                chenille.setVelocityX(300);
                chenille.anims.play('chenille_right', true);
            }
        }

    }

}

    //Piège

    function piegemort(player, piege_ext1){

        this.physics.pause();
        player.anims.play('turn', true);
        player.setTint(0x000000);
        gameOver = true;
    }

    // Changement de scène

    function changementscene(player, changescene_ext1){
        if(player.y > 895 && player.x >= 6160 && player.x <= 6230){
            this.scene.start("sceneDeux");
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



