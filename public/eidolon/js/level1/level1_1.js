var level1_1 = function(game){};

level1_1.prototype = {

	init: function(){
		console.log("STARTING LEVEL 1_1");
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
	    this.map = createMap(this, 'level1_1_map', 'caveTiles');

	    this.player = spawnPlayer(
	    	this,
	    	4 * EidolonGlobals.tilesize,
	    	33 * EidolonGlobals.tilesize,
	    	'player',
	    	0
	    );

	    this.createEnemies();

	    this.game.camera.follow(this.player,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

	},
	
	update: function() {

		/* collide the player with the map tiles */
		this.game.physics.arcade.collide(this.player, this.layer0);
		this.game.physics.arcade.collide(this.enemies, this.layer0);
	    this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHitPlayerHandler, null, this);
		/* move the middleground based on current camera location, */
		parallaxBackgrounds(this);
	},
	
	restart: function() {
		var gameContext = this; //workaround to access higher scope within setTimeout scrope
		setTimeout(function(){    
			gameContext.state.start('Level1_1');
		}, 500);
	},

	enemyHitPlayerHandler: function(player, enemy) {
		player.explode();
	},

	startNextLevel: function() {
		this.state.start("Level1_1");
	},

	hitDeathTile: function(sprite, tile) {
		if (sprite == this.player && (this.player.alive)){
			this.player.explode();
		}
	},

	createEnemies: function() {
		var enemies = this.game.add.group()

   		var crab = PatrolCrab(
	   		this,
	   		23 * EidolonGlobals.tilesize,
	   		14 * EidolonGlobals.tilesize,
	   		5 * EidolonGlobals.tilesize
	   	);

		enemies.add(crab);

		this.enemies = enemies;
	},

	render: function() {

		// this.game.debug.body(this.player);
	}

}