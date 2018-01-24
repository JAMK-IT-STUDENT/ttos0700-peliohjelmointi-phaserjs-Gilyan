// https://www.udemy.com/making-games-with-phaser
// State 7

var arrow, startPointX, startPointY, endPointX, endPointY, swipeDirection, leeway = 80;

demo.state7 = function(){};
demo.state7.prototype = {
    preload: function(){
        game.load.image('arrow', 'assets/sprites/arrow.png');
    },
    create: function(){
        game.stage.backgroundColor = '#660033';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        addChangeStateEventListeners();
        
        arrow = game.add.sprite(centerX, centerY, 'arrow');
        arrow.anchor.setTo(0.5);
        
        // Kuunnellaan napin alas painallusta - eli aloitetaan pyykäisy
        game.input.onDown.add(this.startSwipe);
        // Napin ylöstulo - eli lopetetaan pyyhkäisy
        game.input.onUp.add(this.getSwipeDirection);
    },
    
    startSwipe: function() {
        // console.log(game.input.x + ' ' + game.input.y);
        startPointX = game.input.x;
        startPointY = game.input.y;
    },
    
    getSwipeDirection: function() {
        // console.log(game.input.x + ' ' + game.input.y);
        endPointX = game.input.x;
        endPointY = game.input.y;
        
        // Jos klikataan paikallaan, ei tehdä mitään
        if (Math.abs(endPointY - startPointY) < leeway && Math.abs(endPointX - startPointX) < leeway) {
            return false;
        }
        
        if (Math.abs(endPointY - startPointY) < Math.abs(endPointX - startPointX)) {
            // Pyyhkäisy on vaakasuuntainen
            console.log('horizontal');
            if (endPointX > startPointX) {
                // Nuoli osoittaa oikealle
                swipeDirection = 90;
            } else {
                // Nuoli osoittaa vasemmalle
                swipeDirection = 270;
            }
        } else {
            // Pyyhkäisy on pystysuuntainen
            console.log('vertical');
            if (endPointY > startPointY) {
                // Nuoli osoittaa alas
                swipeDirection = 180;
            } else {
                // Nuoli osoittaa ylös
                swipeDirection = 0;
            }
        }
        
        // Nuolen kulma
        arrow.angle = swipeDirection;
    }
};