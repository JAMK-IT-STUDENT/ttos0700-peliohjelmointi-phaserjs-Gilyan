demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#ff9933';
        
        addChangeStateEventListeners();
    },
    upload: function(){}
};