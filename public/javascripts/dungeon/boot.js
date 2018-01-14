var boot = function(game){};

boot.prototype = {

	preload: function(){
		console.log("STARTING THE GAME!");
	},
	
	create: function(){
		
		game.renderer.renderSession.roundPixels = false // no blurring

	}

}