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
		if(enemy.type == ENEMY_TYPES.PROJECTILE){
			enemy.explode();
		}
	},

	startNextLevel: function(sprite, tile) {
		if(sprite == this.player){
			this.state.start("Level1_2");
		}
	},

	hitDeathTile: function(sprite, tile) {
		if (sprite == this.player && (this.player.alive)){
			this.player.explode();
		}
	},

	createEnemies: function() {
		var enemies = this.game.add.group()

   		var octopus1 = ShootingOctopus(
	   		this,
	   		enemies,
	   		25 * EidolonGlobals.tilesize,
	   		28 * EidolonGlobals.tilesize,
	   		1000,
	   		1
	   	);

	   	var octopus2 = ShootingOctopus(
	   		this,
	   		enemies,
	   		13 * EidolonGlobals.tilesize,
	   		19 * EidolonGlobals.tilesize,
	   		1000,
	   		-1
	   	);

	   	var octopus3 = ShootingOctopus(
	   		this,
	   		enemies,
	   		38 * EidolonGlobals.tilesize,
	   		11 * EidolonGlobals.tilesize,
	   		1500,
	   		1
	   	);

		this.enemies = enemies;
	},

	render: function() {

		// this.game.debug.body(this.player);
	}

}