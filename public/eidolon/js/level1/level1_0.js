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
	    	12 * EidolonGlobals.tilesize,
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
			gameContext.state.start('Level1_0');
		}, 500);
	},

	startNextLevel: function(sprite, tile) {
		if(sprite == this.player){
			this.state.start("Level1_1");
		}
	},

	hitDeathTile: function(sprite, tile) {
		if (sprite == this.player && (this.player.alive)){
			this.player.explode();
		}
	},

	enemyHitPlayerHandler: function(player, enemy) {
		player.explode();
		if(enemy.type == ENEMY_TYPES.PROJECTILE){
			enemy.explode();
		}
	},

	createEnemies: function() {
		var enemies = this.game.add.group();

   		var crab1 = PatrolCrab(
	   		this,
	   		enemies,
	   		23 * EidolonGlobals.tilesize,
	   		14 * EidolonGlobals.tilesize,
	   		50,
	   		4 * EidolonGlobals.tilesize
	   	);

   		var crab2 = PatrolCrab(
	   		this,
	   		enemies,
	   		37 * EidolonGlobals.tilesize,
	   		14 * EidolonGlobals.tilesize,
	   		50,
	   		4 * EidolonGlobals.tilesize
	   	);


		this.enemies = enemies;
	},

	render: function() {

		// this.game.debug.body(this.player);
	}

}
