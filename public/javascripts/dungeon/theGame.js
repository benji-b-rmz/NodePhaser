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

	},

	update: function(){},

	createMap: function(){
		// the csv of the map
		var map = this.game.add.tilemap('map', 16, 16);
		// the tileset corresponding to the csv
		map.addTilesetImage('tiles');
		// create the first layer using the map
		this.layer0 = map.createLayer(0);

		this.layer0.resizeWorld();

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