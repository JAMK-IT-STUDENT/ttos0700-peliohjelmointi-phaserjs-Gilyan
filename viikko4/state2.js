var barrel, bullets, velocity = 1000, nextFire = 0, fireRate = 200, enemy, bullet, enemyGroup;

demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.image('base', 'assets/sprites/cannonBase.png');
        game.load.image('barrel', 'assets/sprites/cannonBarrel.png');
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('adam', 'assets/sprites/adam.png');
    },
    create: function(){
        game.stage.backgroundColor = '#ffcc00';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        addChangeStateEventListeners();
        
        // Lisätään tykin rengas ja skaalataan sen kokoa
        var base = game.add.sprite(centerX, centerY, 'base');
        base.anchor.setTo(0.5);
        base.scale.setTo(0.4);
        
        // Luodaan luodeista 50 luodin ryhmä
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        // Skaalataan luoteja vähän pienemmäksi ja keskitetään
        bullets.setAll('anchor.y', 0.5);
        bullets.setAll('scale.x', 0.85);
        bullets.setAll('scale.y', 0.85);
        
        // Lisätään tykin piippu ja skaalataan sen kokoa
        barrel = game.add.sprite(centerX, centerY, 'barrel');
        barrel.scale.setTo(0.5);
        barrel.anchor.setTo(0.3, 0.5);
        
        // Luodaan vihu
        enemy = game.add.sprite(100, 200, 'adam');
        game.physics.enable(enemy);
        
        // Luodaan vihuryhmä
        enemyGroup = game.add.group();
        enemyGroup.enableBody = true;
        enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i < 3; i++) {
            enemyGroup.create(1300, 350 * i + 100, 'adam');
        }

        // Skaalataan kaikkia ryhmän vihuja pienemmäksi
        enemyGroup.setAll('anchor.y', 0.5);
        enemyGroup.setAll('anchor.x', 0.5);
        enemyGroup.setAll('scale.x', 0.4);
        enemyGroup.setAll('scale.y', 0.4);
    },
    update: function(){
        // Tykin piippu seuraa hiiren kursoria
        barrel.rotation = game.physics.arcade.angleToPointer(barrel);
        // Jos hiirellä klikataan, niin ammutaan luoti
        if (game.input.activePointer.isDown) {
            this.fire();
        }
        
        // Tarkistetaan osuuko luoti vihuun
        game.physics.arcade.overlap(bullets, enemy, this.hitEnemy);
        game.physics.arcade.overlap(enemyGroup, bullets, this.hitGroup);
    },
    
    fire: function() {
        // Säädetään luotien ampumatiheyttä
        if(game.time.now > nextFire) {
            nextFire = game.time.now + fireRate;
            console.log('Firing');
            bullet = bullets.getFirstDead();
            bullet.reset(barrel.x, barrel.y);
            
            // Luoti liikkuu nuolen suuntaan
            game.physics.arcade.moveToPointer(bullet, velocity);
            bullet.rotation = game.physics.arcade.angleToPointer(bullet);
        }
    },
    
    hitEnemy: function() {
        // Kun vihuihin osuu luodilla, molemmat tapetaan
        console.log('Hit');
        enemy.kill();
        bullet.kill();
    },
    
    hitGroup: function(e) {
        // Kun vihuryhmän jäseneen osuu luodilla, molemmat tapetaan
        bullet.kill();
        e.kill();
    }
};