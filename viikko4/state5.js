demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#ff5050';
        
        addChangeStateEventListeners();
    },
    update: function(){}
};