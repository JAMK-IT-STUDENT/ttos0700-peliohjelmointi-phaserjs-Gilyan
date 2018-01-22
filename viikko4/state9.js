demo.state9 = function(){};
demo.state9.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#000000';
        
        addChangeStateEventListeners();
    },
    update: function(){}
};