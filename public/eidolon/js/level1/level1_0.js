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

	    createBackgrounds(this);

	    
	    this.layer0 = null;
	    this.map = createMap(this, 'level1_0_map', 'caveTiles');

	    this.player = spawnPlayer(
	    	this,
	    	10 * EidolonGlobals.tilesize,
	    	28 * EidolonGlobals.tilesize,
	    	'player',
	    	0
	    );

	    this.createEnemies();


	    this.game.camera.follow(this.player);

	},
	
	update: function() {

		/* collide the player with the map tiles */
		this.game.physics.arcade.collide(this.player, this.layer0);
		this.game.physics.arcade.collide(this.enemies, this.layer0);
		this.game.physics.arcade.collide(this.player, this.enemies);
		/* move the middleground based on current camera location, */
		parallaxBackgrounds(this);
	},

	restart: function() {
		this.state.start('Level1_0');
	},

	startNextLevel: function() {
		this.state.start("Level1_1");
	},

	hitDeathTile: function(sprite, tile) {
		if (sprite == this.player) {
			this.restart();
		}
	},

	createEnemies: function() {
		var enemies = this.game.add.group()

   		var crab = PatrolCrab(
	   		this,
	   		22 * EidolonGlobals.tilesize,
	   		28 * EidolonGlobals.tilesize,
	   		3 * EidolonGlobals.tilesize
	   	);

		enemies.add(crab);

		this.enemies = enemies;
	},

	render: function() {

		// this.game.debug.body(this.player);
	}

}
