demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#ffcc00';
        
        addChangeStateEventListeners();
    },
    upload: function(){}
};