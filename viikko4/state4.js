demo.state4 = function(){};
demo.state4.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#ff6600';
        
        addChangeStateEventListeners();
    },
    update: function(){}
};