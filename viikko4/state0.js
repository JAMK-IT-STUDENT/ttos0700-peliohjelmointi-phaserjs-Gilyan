var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2, adam, speed = 6;

demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image('adam', 'assets/sprites/adam.png');
        game.load.image('tree', 'assets/backgrounds/treeBG.png');
    },
    create: function(){
        // Käynnistetään fysiikkamoottori
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#ffffcc';
        
        // Luetaan näppäimistöltä numeroiden mukaan haluttu state
        addChangeStateEventListeners();
        
        // Asetetaan pelimaailmalle rajat (2813 ja 1000 ovat taustakuvan mitat)
        game.world.setBounds(0, 0, 2813, 1000);
        
        // Muuttaa peli-ikkunan kokoa automaattisesti, jotta se mahtuu ikkunaan
        game.scale.scaleMode = Phaser.ScaleManager. SHOW_ALL;
        
        // Lisätään taustakuva
        var treeBG = game.add.sprite(0, 0, 'tree');
        
        // Lisätään ukkeli peliruudun keskelle
        adam = game.add.sprite(centerX, centerY, 'adam');
        adam.anchor.setTo(0.5, 0.5);
        // Pienennetään ukkelia vähän:
        adam.scale.setTo(0.7, 0.7);
        // Lisätään fysiikkaa ukkelille, ettei lentele maailman rajojen yli
        game.physics.enable(adam);
        adam.body.collideWorldBounds = true;
        
        // Asetetaan dead zone
        game.camera.follow(adam);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
    },
    update: function(){
        
        // Liikutetaan ukkoa oikealle
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            adam.scale.setTo(0.7, 0.7);
            adam.x += speed;
        }
        // Liikutetaan ukkoa vasemmalle
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            // Ukkelin spriten suunta vaihtuu vasemmalle päin
            adam.scale.setTo(-0.7, 0.7);
            adam.x -= speed;
        }
        
        // Liikutetaan ukkoa ylös
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            adam.y -= speed;
            // Rajoitetaan liike tielle, ettei lentele ylös
            if(adam.y < 395){
                adam.y = 395;
            }
        }
        // Liikutetaan ukkoa alas
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            adam.y += speed;
        }
    }
};

function changeState(i, stateNum){
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
    addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
    addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
    addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
    addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
    addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
    addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
    addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}