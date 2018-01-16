// Configure the display/scale of the game then transition to preloader

var boot = function(game){};

boot.prototype = {

	preload: function(){
		console.log("Booting up game");
		this.load.image('loadbar', '/images/dungeon/menu/loadbar.png');

	},

	create: function(){
		
		this.game.renderer.renderSession.roundPixels = false // no blurring
		this.state.start('Preload');
	}

}