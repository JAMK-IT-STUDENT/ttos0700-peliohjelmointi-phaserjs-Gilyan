// https://www.udemy.com/making-games-with-phaser
// State 3

var sound;

demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.load.image('button1', 'assets/sprites/button1.png');
        game.load.image('button2', 'assets/sprites/button2.png');
        game.load.image('button3', 'assets/sprites/button3.png');
        game.load.audio('pops', 'assets/sounds/buttonPops.mp3');
    },
    create: function(){
        game.stage.backgroundColor = '#ff9933';
        addChangeStateEventListeners();
        game.scale.scaleMode = Phaser.ScaleManager. SHOW_ALL;
        
        // Lisätään ääni ja luodaan siitä kaksi eri versiota
        sound = game.add.audio('pops');
        sound.addMarker('low', 0.15, 0.5);
        sound.addMarker('high', 1.1, 1.5);
        
        // Nappi 1 - menee state 1:seen
        var b1 = game.add.button(100, 100, 'button1', function() {
            changeState(null, 1);
        });

        // Nappi 2 - menee state 2:seen
        var b2 = game.add.button(400, 400, 'button2', function() {
            changeState(null, 2);
        });

        // Nappi 3, ei tee mitään
        var b3 = game.add.button(700, 700, 'button3');
        
        // Nappien värit vaihtelevat painettaessa
        b1.onInputDown.add(this.tint, b1);
        b2.onInputDown.add(this.tint, b2);
        b3.onInputDown.add(this.tint, b3);

        b1.onInputUp.add(this.unTint, b1);
        b2.onInputUp.add(this.unTint, b2);
        b3.onInputUp.add(this.unTint, b3);
        },
    
    tint: function() {
        // Vaihtaa napin väriä ja soittaa äänen, kun ko nappia painetaan
        this.tint = 0xbbbbbb;
        sound.play('low');
    },
    
    unTint: function() {
        // Väri palautuu alkuperäiseksi ja soittaa äänen, kun ko nappi vapautetaan
        this.tint = 0xFFFFFF;
        sound.play('high');
    }
};