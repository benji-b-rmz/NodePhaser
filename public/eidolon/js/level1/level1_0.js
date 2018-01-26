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
	    enemyGrunt = this.game.add.audio('enemyGrunt');

	    this.createBackgrounds();

	    this.map = this.createMap();

	    this.player = this.spawnPlayer(
	    	10 * EidolonGlobals.tilesize,
	    	55 * EidolonGlobals.tilesize,
	    	'player',
	    	0
	    );
	   
	    this.game.camera.follow(this.player);

	},
	
	update: function(){

		/* collide the player with the map tiles */
		this.game.physics.arcade.collide(this.player, this.layer0);

		/* move the middleground based on current camera location, */
		this.parallaxBackgrounds();
	},

	createMap: function(){
		// Collision map
	    var map = this.game.add.tilemap('map', EidolonGlobals.tilesize, EidolonGlobals.tilesize);

	    //  Now add in the tileset
	    map.addTilesetImage('tiles');
	    
	    //  Create our layer
	    this.layer0 = map.createLayer(0);

	    //  Resize the world
	    this.layer0.resizeWorld();

	    /* Set tile callbacks for special tiles */
	    // map.setTileIndexCallback(78, onHit, this);


	    /* Set tile collisions for solid impassable tiles */

	    // General cave wall edges and fill
	    map.setCollisionBetween(7, 10);
	    map.setCollisionBetween(13, 16);
	    map.setCollisionBetween(19, 22);
	    map.setCollisionBetween(25, 28);

	    // Colored Platforms
	    map.setCollisionBetween(36, 41);
	    map.setCollisionBetween(43, 46); //the ends are not collided with

	    // Slabs
	    map.setCollisionBetween(54,55); // flat slab
	    map.setCollisionBetween(56,57); map.setCollision(51); // positive slope slab
	    map.setCollisionBetween(58,59); map.setCollision(52); // negative slope slab

	    // Ceiling 
	    map.setCollisionBetween(61,64);
	    map.setCollision(66);

	    // Stone Blocks
	    map.setCollisionBetween(90, 94);
	    map.setCollisionBetween(96, 99);
	    map.setCollisionBetween(102, 103);
	    map.setCollisionBetween(108, 109);

	    // Water
	    // map.setCollision(78);
	    // map.setCollision(84);

	    // Heads
	    map.setCollisionBetween(80, 81);
	    map.setCollisionBetween(86, 87);

	    // Foliage
	    map.setCollision(83); map.setCollision(89); // long-bottom foliage
	    map.setCollisionBetween(110, 113); // 110-111 medium sized foliage, 112 - med-small, 113, smallest
	    map.setCollision(114); // ceiling foliage


	    //  Un-comment this on to see the collision tiles
	    // layer.debug = true;

	    return map;
	},

	spawnPlayer: function(x, y, spriteKey, frame=0){
		/* create a new sprite at the tile location corresponding to x and y */
		var newPlayer = this.game.add.sprite(x, y, spriteKey, frame);
		newPlayer.anchor.setTo(0.5);
		newPlayer.speed = 125;
		newPlayer.health = 5;
		newPlayer.isRunning = false;

		this.game.physics.arcade.enable(newPlayer);
		newPlayer.body.gravity.y = 600;
		newPlayer.body.setSize(11, 40, 35, 24);

		newPlayer.animations.add('jump', createAnimationFrameArray(10, 6) , 50, true);
    	newPlayer.animations.add('run', createAnimationFrameArray(10*2, 10), 50, true);
    	// player.animations.add('down', [], 10, true);
    	newPlayer.animations.add('idle', createAnimationFrameArray(0, 4), 10, true);
    	newPlayer.animations.add('run-shoot', createAnimationFrameArray(10*3, 10), 20, false);
    	newPlayer.animations.add('idle-shoot', createAnimationFrameArray(10*4, 3), 20, false);
    
    	newPlayer.invulnerable = false;

    	newPlayer.wasd = {
			up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
		};

		newPlayer.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


		newPlayer.handleInput = function(){
			/* handle left/right running */
			if (this.wasd.left.isDown) {
				this.scale.x = -1;
				this.body.velocity.x = -this.speed;
				this.isRunning = true;
				if(this.body.onFloor()){ this.play('run');}
			}
			else if (this.wasd.right.isDown) {
				this.scale.x = 1;
				this.body.velocity.x = this.speed;
				this.isRunning = true;
				if(this.body.onFloor()){ this.play('run');}
			}
			else { 
				this.body.velocity.x = 0;
				this.isRunning = false;
				if(this.body.onFloor()){ this.play('idle');}
			}
		
			/* handle jumps */
			if ( this.jumpButton.isDown && (this.body.onFloor() || this.body.onWall()) ){
				this.body.velocity.y = -200;
				this.play('jump');
			}
		}

		newPlayer.update = function() {
			this.handleInput();
		}

		return newPlayer;
	},

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

function createAnimationFrameArray(startIndex, numOfFrames) {
    var array = [];
    for (var i = startIndex; i < startIndex + numOfFrames; i++) {array.push(i);}
    return array;
}