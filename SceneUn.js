var player;
var power_up;

var background;
var fond;
var platforms;

var keys;

var recupPowerUp = false;

var jump = true;
var jetpack = false;

class SceneUn extends Phaser.Scene{
    constructor(){
        super("sceneUn");
        this.pad = null;
    }
    init(data){
    }
    preload(){
        //Assets
        //this.load.image('background','assets/moutain.png');     //Paysage de fond non-utilisé pour projet final
        this.load.image('ground','Assets/sol.png');     //Plateforme non-utilisée pour projet final

        //this.load.spritesheet('player','assets/joueur.png', { frameWidth: 13, frameHeight: 23 } );
        this.load.image('player','assets/blyke_face.png');
        this.load.image('power_up','assets/power_up.png');

        this.load.image('tiles','assets/tiles_solmur_grotte.png');
        this.load.tilemapTiledJSON('map','assets/Alphatest.json');
    }
    create(){
        //Affichage des assets
        //background = this.add.sprite(448, 224, 'background');

        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('tiles_solmur_grotte','tiles');

        map.createLayer('background',tileset, 0, 0);
        fond = map.createLayer('fond', tileset, 0, 0);
        platforms = map.createLayer('sol', tileset, 0, 0);

        platforms.setCollisionByExclusion(-1, true)
    
    

        player = this.physics.add.sprite(70, 120, 'player');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        power_up = this.physics.add.sprite(580, 300, 'power_up');

        //Clavier
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            c: Phaser.Input.Keyboard.KeyCodes.C,
        })

        //Collisions
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(power_up, platforms);
        this.physics.add.collider(player, power_up, collectPowerUp, null, this);
        

    }
    update(){

        //Déplacements basiques : droite, gauche et saut

        if(keys.left.isDown){
            player.setVelocityX(-150);
        }
        else if(keys.right.isDown){
            player.setVelocityX(150);
        }
        else{
            player.setVelocityX(0);
        }

        if(keys.space.isDown && player.body.blocked.down){
            player.setVelocityY(-170);
        }

        
        if(jetpack == true){
            if(keys.c.isDown){
                player.setVelocityY(-100);
            }
        }

    }

}
    // Power-Up (Jetpack)

    function collectPowerUp(player, power_up){

        power_up.disableBody(true, true);
        recupPowerUp = true;
        jetpack = true;


    }

