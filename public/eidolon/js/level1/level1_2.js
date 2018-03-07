var level1_2 = function(game){};

level1_2.prototype = {

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
	    this.map = createMap(this, 'level1_2_map', 'caveTiles');

	    this.player = spawnPlayer(
	    	this,
	    	4 * EidolonGlobals.tilesize,
	    	13 * EidolonGlobals.tilesize,
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
			gameContext.state.start('Level1_2');
		}, 500);
	},

	enemyHitPlayerHandler: function(player, enemy) {
		player.explode();
		if(enemy.type == ENEMY_TYPES.PROJECTILE){
			enemy.explode();
		}
	},

	startNextLevel: function() {
		this.state.start("Level1_2");
	},

	hitDeathTile: function(sprite, tile) {
		if (sprite == this.player && (this.player.alive)){
			this.player.explode();
		}
	},

	createEnemies: function() {
		var enemies = this.game.add.group()

		// crab enemies
		var crab1 = PatrolCrab(
	   		this,
	   		enemies,
	   		15 * EidolonGlobals.tilesize,
	   		11 * EidolonGlobals.tilesize,
	   		75,
	   		4 * EidolonGlobals.tilesize
	   	);

	   	var crab1 = PatrolCrab(
	   		this,
	   		enemies,
	   		17 * EidolonGlobals.tilesize,
	   		39 * EidolonGlobals.tilesize,
	   		75,
	   		4 * EidolonGlobals.tilesize
	   	);


		// octopus enemies
   		var octopus1 = ShootingOctopus(
	   		this,
	   		enemies,
	   		23 * EidolonGlobals.tilesize,
	   		15 * EidolonGlobals.tilesize,
	   		2000,
	   		1
	   	);

	   	var octopus2 = ShootingOctopus(
	   		this,
	   		enemies,
	   		32 * EidolonGlobals.tilesize,
	   		21 * EidolonGlobals.tilesize,
	   		1000,
	   		-1
	   	);

	   	var octopus3 = ShootingOctopus(
	   		this,
	   		enemies,
	   		11 * EidolonGlobals.tilesize,
	   		31 * EidolonGlobals.tilesize,
	   		1000,
	   		1
	   	);

	   	var octopus4 = ShootingOctopus(
	   		this,
	   		enemies,
	   		14 * EidolonGlobals.tilesize,
	   		39 * EidolonGlobals.tilesize,
	   		1000,
	   		1
	   	);

	   	var octopus5 = ShootingOctopus(
	   		this,
	   		enemies,
	   		24 * EidolonGlobals.tilesize,
	   		39 * EidolonGlobals.tilesize,
	   		1000,
	   		-1
	   	);

		this.enemies = enemies;
	},

	render: function() {

		// this.game.debug.body(this.player);
	}

}