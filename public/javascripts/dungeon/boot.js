// Configure the display/scale of the game then transition to preloader

var boot = function(game){};

boot.prototype = {

	preload: function(){
		/* load the minimum assets needed for the load screen */
		console.log("Booting up game");
		this.load.image('loadbar', '/images/dungeon/menu/loadbar.png');

	},

	create: function(){
		/* set game rendering & display settings */
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		/* enable crisp rendering, found here: https://www.belenalbeza.com/articles/retro-crisp-pixel-art-in-phaser/ */
		this.game.renderer.renderSession.roundPixels = true // no blurring
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

		this.state.start('Preload');
	}

}