

class SceneDeux extends Phaser.Scene{
    constructor(){
        super("sceneDeux");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        //Assets

        this.load.spritesheet('player','assets/blyke.png', { frameWidth: 32, frameHeight: 36 } );
        this.load.image('power_up','assets/power_up.png');

        this.load.spritesheet('ennemi_araignee', 'assets/araignee.png', { frameWidth: 52, frameHeight: 18} );
        this.load.spritesheet('ennemi_chenille', 'assets/chenille.png', { frameWidth: 52, frameHeight: 22} );
        this.load.spritesheet('ennemi_fusee', 'assets/fusee.png', { frameWidth: 74, frameHeight: 29} );

        this.load.image('tiles_2','assets/tiles_solmur_grotte.png');
        this.load.tilemapTiledJSON('map_2','assets/Grotte1.json');

        this.load.image('gameover','assets/gameover.png');
    }
    create(){
        //Affichage des assets

        const map_2 = this.make.tilemap({key: 'map_2'});
        const tileset = map_2.addTilesetImage('tiles_solmur_grotte','tiles_2');

        fond_grotte1 = map_2.createLayer('fond_grotte1', tileset, 0, 0);
        platforms_grotte1 = map_2.createLayer('sol_grotte1', tileset, 0, 0);
        piege_grotte1 = map_2.createLayer('piege_grotte1', tileset, 0, 0);


        platforms_grotte1.setCollisionByExclusion(-1, true);
        piege_grotte1.setCollisionByExclusion(-1, true);
    
    

        player = this.physics.add.sprite(70, 560, 'player');         // 70, 560

        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

        power_up = this.physics.add.sprite(580, 770, 'power_up');

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

        //Clavier
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            c: Phaser.Input.Keyboard.KeyCodes.C,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        })

        //Collisions
        this.physics.add.collider(player, platforms_grotte1);
        this.physics.add.collider(player, piege_grotte1, piegemort, null, this);
        this.physics.add.collider(power_up, platforms_grotte1);
        this.physics.add.collider(player, power_up, collectPowerUp, null, this);

        this.physics.add.collider(this.araignees, platforms_grotte1);
        this.physics.add.collider(player, this.araignees, araigneemort, null, this);
        this.physics.add.collider(this.chenilles, platforms_grotte1);
        this.physics.add.collider(player, this.chenilles, chenillemort, null, this);
        this.physics.add.collider(this.fusees, platforms_grotte1);
        this.physics.add.collider(player, this.fusees, fuseemort, null, this);

        //Caméra
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, map_2.widthInPixels, map_2.heightInPixels);

        //Affichage de la position du joueur
        positionXtext = this.add.text(0, 0, 'PositionX', + player.x, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);
        positionYtext = this.add.text(0, 20, 'PositionY', + player.y, { fontSize: '15px', fill: '#f00'} ).setScrollFactor(0).setDepth(1);


        

    }
    update(){

        //Affichage de la position du joueur
        positionXtext.setText('Position X :' + player.x);
        positionYtext.setText('Position Y :' + player.y);

        //Game Over
        if (gameOver){
            gameOverText = this.add.image(896/2, 448/2, 'gameover').setScrollFactor(0).setDepth(1);
            if(keys.enter.isDown){
                this.scene.restart();
                jetpack = false;
                gameOver = false;
            }
            return;
        }

        //Déplacements basiques : droite, gauche et saut

        if(keys.left.isDown){
            player.setVelocityX(-185);
            player.anims.play('left', true);
        }
        else if(keys.right.isDown){
            player.setVelocityX(185);
            player.anims.play('right', true);
        }
        else{
            player.setVelocityX(0);
            player.anims.play('turn', true);
        }

        if(keys.space.isDown && player.body.blocked.down){
            player.setVelocityY(-170);
            //player.anims.play('turn'. true);
        }

        
        if(jetpack == true){
            if(keys.c.isDown){
                player.setVelocityY(-110);
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

    }

}
    //Power-Up (Jetpack)

    function collectPowerUp(player, power_up){

        power_up.disableBody(true, true);
        recupPowerUp = true;
        jetpack = true;
        jetpackText = this.add.text(420, 680, 'Press C to use the jetpack');
    }

    //Piège

    function piegemort(player, piege_grotte1){

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

