// https://www.udemy.com/making-games-with-phaser
// State 5

var accel = 400, platform, platformGroup;

demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        game.load.image('adam', 'assets/sprites/adam.png');
        game.load.image('platform', 'assets/sprites/platform.png');
    },
    create: function(){
        game.stage.backgroundColor = '#ff5050';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        addChangeStateEventListeners();
        
        adam = game.add.sprite(centerX, 500, 'adam');
        platform = game.add.sprite(0, 800, 'platform');
        // Läjä putkuloita:
        platformGroup = game.add.group();
        platformGroup.create(650, 400, 'platform');
        platformGroup.create(1300, 400, 'platform');
        
        // Lisätään fysiikkaa ukkelille ja putkuloille
        game.physics.enable([adam, platform, platformGroup]);
        // Vetovoima y:n suhteen 500
        adam.body.gravity.y = 500;
        // Hypähtää vähän kun osuu maahan
        adam.body.bounce.y = 0.3;
        // Hidastaa vauhtia, kun ei paineta nuolinappuloita
        adam.body.drag.x = 400;
        // Ei lentele ruudusta ulos
        adam.body.collideWorldBounds = true;
        
        // Putkula ei saa liikkua mihinkään
        platform.body.immovable = true;
        
        // Ei myöskään putkularyhmän putkulat
        platformGroup.setAll('body.immovable', true);
    },
    update: function(){
        // Tarkistetaan törmäyksiä
        game.physics.arcade.collide(adam, [platform, platformGroup]);
        
        // Liikutetaan ukkoa vasemmalle kiihtyvällä vauhdilla
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            adam.body.acceleration.x = -accel;
        }
        // Liikutetaan ukkoa oikealle
        else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            adam.body.acceleration.x = accel;
        }
        
        // Jos ei liikuta, niin kiihtyvyys = 0
        else{
            adam.body.acceleration.x = 0;
        }
        
        // Liikutetaan ukkoa ylös
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            adam.body.velocity.y = -300;
        }
    }
};