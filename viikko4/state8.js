// https://www.udemy.com/making-games-with-phaser
// State 8

var text; 

WebFontConfig = {
    google: { families: [ 'Candal', 'Montserrat' ] }
};

demo.state8 = function(){};
demo.state8.prototype = {
    preload: function(){
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    },
    create: function(){
        game.stage.backgroundColor = '#990099';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        addChangeStateEventListeners();
        
        text = 'My slave human did not give me any food so i pooped on the floor push your water glass on the floor. Poop on grasses give attitude when in doubt, wash somehow manage to catch a bird but have no idea what to do next, so play with it until it dies of shock and wake up human for food at 4am and burrow under covers. Weigh eight pounds but take up a full-size bed chase ball of string. Pee in the shoe. Cats making all the muffins. Touch water with paw then recoil in horror mrow so litter kitter kitty litty little kitten big roar roar feed me, yet cat ass trophy.';
        
        // game.add.text(100, 400, 'Hello', {fontSize: '100px', fill: '#fff'});
        
        // Printataan teksti kahdesti, kahdet eri asetukset:
        this.spellOutText(100, 100, 1000, text, 30, 40, '#fff', 'Candal');
        this.spellOutText(100, 600, 1100, text, 20, 20, '#000', 'Montserrat');
    },
    spellOutText: function(x, y, width, text, fontSize, speed, fill, font){
        var sentence = game.add.text(x, y, '', {fontSize: fontSize + 'px', fill: fill, font: font});
        var currentLine = game.add.text(10, 10, '', {fontSize: fontSize + 'px', font: font});
        // currentLinen tekstistä näkymätön, alpha = opacity 
        currentLine.alpha = 0;
        var loop = game.time.events.loop(speed, addChar);
        
        // Missä kohtaa tekstiä ollaan menossa
        var index = 0;
        
        function addChar() {
            // Lisätään tekstin kirjaimia yksi kerrallaan
            sentence.text += text[index];
            currentLine.text += text[index];
            
            // Uusi rivi
            if (currentLine.width > width && text[index] == ' ') {
                sentence.text += '\n';
                currentLine.text = '';
            }
            
            // Lopetetaan kirjoittaminen, jos viimeinen index
            if (index >= text.length - 1) {
                game.time.events.remove(loop);
                console.log('stop');
            }
            
            index++;
        }
    }
};