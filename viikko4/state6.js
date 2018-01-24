// https://www.udemy.com/making-games-with-phaser
// State 6

demo.state6 = function(){};
demo.state6.prototype = {
    preload: function(){
        game.load.image('volcano', 'assets/sprites/volcano.png');
        game.load.image('redBall', 'assets/sprites/redBall.png');
        game.load.image('orBall', 'assets/sprites/orBall.png');
    },
    create: function(){
        game.stage.backgroundColor = '#cc0066';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        addChangeStateEventListeners();
        
        // Lisätään tulivuori x-keskelle, ankkuri alalaitaan
        game.add.sprite(centerX, 1000, 'volcano').anchor.setTo(0.5, 1);
        
        // Purkauspiste palleroille, maksimipalleroita 2000
        var emitter = game.add.emitter(centerX, 500, 2000);
        // Tehdään palleroita
        emitter.makeParticles(['redBall', 'orBall'], 0, 5000, false, true);
        // Palleroille maksiminopeus
        emitter.maxParticleSpeed.set(300, -300);
        // ja miniminopeus
        emitter.minParticleSpeed.set(-300, -100);
        // Palleroihin vaikuttaa "maan" vetovoima
        emitter.gravity = 300;
        
        // 2s delay ennen kuin palleroita alkaa puskea ulos
        game.time.events.add(2000, function() {
            // Aloitetaan palleroiden tunkeminen
            // false = eivät räjähdä heti
            // 5000 = pallerot kestää 5s
            // 20 = uusi pallero joka 20ms välein
            emitter.start(false, 5000, 20);
            
            // Looppi, 0,5s välein vaihdellaan purkauksia päälle ja pois
            game.time.events.loop(500, function() {
                if (emitter.on) {
                    emitter.on = false;
                } else {
                    emitter.on = true;
                }
            });
        });
    },
    update: function(){}
};