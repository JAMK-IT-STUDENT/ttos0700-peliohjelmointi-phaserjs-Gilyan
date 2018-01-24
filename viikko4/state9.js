// https://www.udemy.com/making-games-with-phaser
// State 9

var hsText = [], hs = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

demo.state9 = function(){};
demo.state9.prototype = {
    preload: function(){
        game.load.image('button1', 'assets/sprites/button1.png');
        game.load.image('button2', 'assets/sprites/button2.png');
    },
    create: function(){
        game.stage.backgroundColor = '#000000';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        addChangeStateEventListeners();
        
        // Lisätään numerot 
        for (var i = 1; i < 11; i++) {
            // anchor tasaa numeroiden reunat oikealta
            game.add.text(500, 20 + (i * 90), i + '. ', {fontSize: '40px', fill: "#ffffff"}).anchor.setTo(1, 0);
        }
        
        // Lisätään high score -pisteet
        for (var i = 0; i < 10; i++) {
            hsText[i] = game.add.text(500, 20 + ((i + 1) * 90), hs[i], {fontSize: '40px', fill: "#ffffff"});
        }
    },
    update: function(){}
};