
var titleScreen = function(game) {};

titleScreen.prototype = {

	init: function(){
		console.log("ENTERING THE TITLE SCREEN");
		
		this.titleTextStyle = {
			font: '40px Helvetica',
			fill: '#FFFFFF',
			fontWeight: '700'
		};
		this.menuTextStyle = {
			font: '20px Helvetica',
			fill: '#FFFFFF',
			fontWeight: '700'
		};

		this.titleString = "DUNGEON CRAWLER";

		this.stage.setBackgroundColor("#000000");

	},
	preload: function(){},
	create: function(){
		/* create the title, play, and credits text */
		this.titleText = game.add.text(this.world.width/2, this.world.height/2, this.titleString, this.titleTextStyle);
		this.titleText.anchor.set(0.5);

		this.playText = game.add.text(this.world.width/2, this.world.height * 2/3, "PLAY", this.menuTextStyle);
		this.playText.anchor.set(0.5);
		this.playText.inputEnabled = true;
		this.playText.events.onInputDown.add(this.startGame, this);
	},
	update: function(){},
	startGame: function() {
		/* transfer to TheGame state to run the game */
		this.state.start('TheGame');
	}

}