var theGame = function(game) {};

theGame.prototype = {
	
	init: function(){
		console.log("STARTING THE MAIN GAME");
		this.tilesize = 16;
	},

	preload: function(){},

	create: function(){

		this.createMap();

		this.player = this.spawnPlayer(5 * this.tilesize, 5 * this.tilesize, 'viking');

		this.game.camera.follow(this.player);

	},

	update: function(){

		this.game.physics.arcade.collide(this.player, this.layer0);

	},

	createMap: function(){
		/* the csv of the map */
		var map = this.game.add.tilemap('map', 16, 16);
		/* the tileset corresponding to the csv */
		map.addTilesetImage('tiles');
		/* create the first layer using the map */
		this.layer0 = map.createLayer(0);

		this.layer0.resizeWorld();

		/* Setting tile collision for impassable tiles
		 * This includes: walls, pillars, misc objects	
		 */

		/* Side Walls, (includes the dark or empty squares) */
		map.setCollisionBetween(0,1);

		/* Top walls */
		map.setCollisionBetween(10,12);
		// map.setCollisionBetween(20,24);
		map.setCollision(40);
		map.setCollision(43);
		map.setCollision(46);

		map.setCollisionBetween(48,49);
		map.setCollisionBetween(58,59);

		// map.setCollisionBetween(50,56);

		map.setCollisionBetween(78,79);
		map.setCollisionBetween(88,89);


		/* Bottom walls */
		map.setCollisionBetween(17,19);
		map.setCollision(9);

		/* Misc wall objects: pipes, vents */
		map.setCollisionBetween(3,9);
		map.setCollisionBetween(13,14);
		map.setCollision(24);
		map.setCollision(34);
		map.setCollisionBetween(44,45);
		map.setCollisionBetween(28,29);
		map.setCollisionBetween(38,39);

	},

	spawnPlayer(x, y, spriteKey, frame=0){

		var newPlayer = this.game.add.sprite(x, y, spriteKey, frame);
		newPlayer.anchor.setTo(0.5);
		newPlayer.speed = 50;

		this.game.physics.arcade.enable(newPlayer);

		newPlayer.wasd = {
			up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
		};

		newPlayer.handleInput = function(){
			if (this.wasd.left.isDown) {
				this.scale.x = -1;
				this.body.velocity.x = -this.speed;
			}
			else if (this.wasd.right.isDown) {
				this.scale.x = 1;
				this.body.velocity.x = this.speed;
			}
			else { this.body.velocity.x = 0;}
		
			if (this.wasd.up.isDown) {
				this.body.velocity.y = -this.speed;
			}
			else if (this.wasd.down.isDown) {
				this.body.velocity.y = this.speed;
			}
			else { this.body.velocity.y = 0;}
		}

		newPlayer.update = function() {
			this.handleInput();
		}

		return newPlayer;
	}

}