// https://www.udemy.com/making-games-with-phaser
// State 4

var i = 0;

demo.state4 = function(){};
demo.state4.prototype = {
    preload: function(){
        game.load.image('adam', 'assets/sprites/adam.png');
    },
    create: function(){
        game.stage.backgroundColor = '#ff6600';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        addChangeStateEventListeners();
        
        // Luodaan kauhea kasa ukkoja
        a1 = game.add.sprite(50, 100, 'adam');
        a2 = game.add.sprite(350, 100, 'adam');
        a3 = game.add.sprite(650, 100, 'adam');
        a4 = game.add.sprite(950, 100, 'adam');
        a5 = game.add.sprite(1250, 100, 'adam');
        
        // y: 400 = liikkuu kohtaan y - voi laittaa myös y: '+400'
        // 2000 = liikkuu kahdessa sekunnissa
        // liikkuu lineaarisesti (muita: Bounce, Elastic, Circ .....)
        // true = liikkuminen alkaa automaattisesti
        game.add.tween(a1).to({y: 400}, 2000, 'Linear', true);
        
        // Ei lähde liikkumaan automaattisesti, kirjoitettava i.start()
        i = game.add.tween(a2).to({x: 100, y: 0}, 1000, 'Elastic.easeOut');
        
        // Lähtee liikkumaan paikasta y: 1000
        game.add.tween(a3).from({y: 1000}, 1500, 'Circ.easeOut', true);
        
        // 5. argumentti (1000): delay
        // 6. argumentti (2): toistaa liikkeen 1+2 kertaa
        // 7. argumentti (true): liikkuu takaisin alkuperäiseen paikkaan
        // Jää liikkumaan looppiin
        game.add.tween(a4.anchor).to({x: 1}, 1000, 'Linear', true, 1000, 2, true).loop(true);
        
        // alpha = opacity
        game.add.tween(a5).to({alpha: 0}, 1000, 'Bounce', true);
    },
    update: function(){}
};