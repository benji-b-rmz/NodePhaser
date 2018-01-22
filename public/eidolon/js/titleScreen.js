var titleScreen = function(game){};

titleScreen.prototype = {
	init: function(){
		console.log("STARTING TITLE SCREEN");
	},

	preload: function(){},
	
	create: function(){
		/* initialize background images */
		this.createBackgrounds();

		/* Create main title text */
		this.titleText = this.game.add.text(EidolonGlobals.width/2, EidolonGlobals.height/2 - 10, 'EIDOLON', { font: '60px Helvetica', fill: '#ff3333', fontWeight: '700'});
		this.titleText.anchor.set(0.5);

		/* Clickable 'Play' Text. Click to start the game */
		this.playGameText = this.game.add.text(EidolonGlobals.width/2, EidolonGlobals.height/2 + 40, 'Play Game', { font: '15px Helvetica', fill: '#ffffff', fontWeight: '700'});
		this.playGameText.anchor.set(0.5);
		this.playGameText.inputEnabled = true;
		this.playGameText.events.onInputDown.add(this.playGame, this);

		/* 'Credits' option, click to transfer to credits screen */
		this.creditsText = this.game.add.text(EidolonGlobals.width/2, EidolonGlobals.height/2 + 70, 'Credits', { font: '15px Helvetica', fill: '#ffffff', fontWeight: '700'});
		this.creditsText.anchor.set(0.5);
		this.creditsText.inputEnabled = true;
		this.creditsText.events.onInputDown.add(this.showCredits, this);

		/* Press ENTER to start game */
		this.startGameKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.startGameKey.onDown.add(this.playGame, this);
	},
	
	update: function(){
		/* move the middleground image to create moving background */
		this.middleground.tilePosition.x -= 0.1;
	},

	createBackgrounds: function() {
		/* create background images, background and middleground, used to create parallax effect */
		this.background = this.game.add.tileSprite(0, 0, EidolonGlobals.width, EidolonGlobals.height, 'background');
		this.background.fixedToCamera = true;

		this.middleground = this.game.add.tileSprite(0, 0, EidolonGlobals.width, EidolonGlobals.height, 'middleground');
		this.middleground.fixedToCamera = true;
	},

	playGame: function() {
		/* transition into the first level */
		this.state.start('Level1_0');
	},

	showCredits: function() {
		/* transition into the creditst screen */
		this.state.start('Credits');
	}

}