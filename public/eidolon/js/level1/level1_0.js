var level1_0 = function(game){};

level1_0.prototype = {
	init: function(){
		console.log("STARTING LEVEL 1_0");
	},

	preload: function(){},
	
	create: function(){
		/* Adding the loaded assets to the game */
		this.blasterSound = this.game.add.audio('blasterSound'); 
	   	this.jumpSound = this.game.add.audio('jumpSound'); 
	    this.playerGrunt = this.game.add.audio('playerGrunt'); 
	    // enemyGrunt = this.game.add.audio('enemyGrunt');

	    this.createBackgrounds();

	    this.layer0 = null;
	    this.map = createMap(this, 'level1_0_map', 'caveTiles');

	    this.player = spawnPlayer(
	    	this,
	    	10 * EidolonGlobals.tilesize,
	    	28 * EidolonGlobals.tilesize,
	    	'player',
	    	0
	    );
	   
	    this.game.camera.follow(this.player);

	},
	
	update: function() {

		/* collide the player with the map tiles */
		this.game.physics.arcade.collide(this.player, this.layer0);

		/* move the middleground based on current camera location, */
		this.parallaxBackgrounds();

	},

	restart: function() {
		this.state.start('Level1_0');
	},

	startNextLevel: function() {
		this.state.start("Level1_1");
	}

	createBackgrounds: function() {
		/* create background images, background and middleground, used to create parallax effect */
		this.background = this.game.add.tileSprite(0, 0, EidolonGlobals.width, EidolonGlobals.height, 'background');
		this.background.fixedToCamera = true;

		this.middleground = this.game.add.tileSprite(0, 0, EidolonGlobals.width, EidolonGlobals.height, 'middleground');
		this.middleground.fixedToCamera = true;
	},

	parallaxBackgrounds: function(){
		this.middleground.tilePosition.x = this.layer0.x * -0.5;
	}

}
