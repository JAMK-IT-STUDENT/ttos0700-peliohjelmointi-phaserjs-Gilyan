demo.state1 = function(){};

var cursors, vel = 500, rocks, grass;

demo.state1.prototype = {
    preload: function(){
        game.load.tilemap('field', 'assets/tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grassTiles', 'assets/tilemaps/grassTiles.png');
        game.load.image('rockTiles', 'assets/tilemaps/rockTiles.png');
        game.load.image('adam', 'assets/sprites/adam.png');
    },
    create: function(){
        // Käynnistetään fysiikkamoottori
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#ffff00';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        addChangeStateEventListeners();
        
        // Luodaan tilemap ja lisätään kuvat
        var map = game.add.tilemap('field');
        map.addTilesetImage('grassTiles');
        map.addTilesetImage('rockTiles');
        
        // Lisätään kerrokset
        grass = map.createLayer('grass');
        rocks = map.createLayer('rocks');
        
        // Voidaan törmäillä kiviin ja ruohikkoon
        map.setCollisionBetween(1, 9, true, 'rocks');
        map.setCollision(11, true, 'grass');
        
        // Ladataan ukkeli ja säädetään kokoa pienemmäksi
        adam = game.add.sprite(200, 200, 'adam');
        adam.scale.setTo(0.2, 0.2);
        game.physics.enable(adam);
        
        // Luodaan kursorit
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function(){
        // Tarkistetaan, ollaanko törmätty kiviin tai ruohikkoon
        game.physics.arcade.collide(adam, rocks, function(){ console.log('Hitting rocks!'); });
        game.physics.arcade.collide(adam, grass, function(){ console.log('Hitting grass!'); });
        
        // Liikutaan ylöspäin
        if(cursors.up.isDown){
            adam.body.velocity.y = -vel;
        }
        // Liikutaan alaspäin
        else if(cursors.down.isDown){
            adam.body.velocity.y = vel;
        }
        else{
            adam.body.velocity.y = 0;
        }
        
        // Liikutaan vasemmalle
        if(cursors.left.isDown){
            adam.body.velocity.x = -vel;
        }
        
        // Liikutaan oikealle
        else if(cursors.right.isDown){
            adam.body.velocity.x = vel;
        }
        else{
            adam.body.velocity.x = 0;
        }
    }
};