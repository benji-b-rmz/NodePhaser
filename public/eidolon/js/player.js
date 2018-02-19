/* This file contains Player sprite creation code and related functions */

/* spawnPlayer() creates a new player sprite at the x,y, coords */
function spawnPlayer(state, x, y, spriteKey, frame=0){

	/* create a new sprite at the tile location corresponding to x and y */
	var newPlayer = state.game.add.sprite(x, y, spriteKey, frame);
	newPlayer.anchor.setTo(0.5, 0.5);

	/* add player bullet group */
	newPlayer.bullets = state.game.add.group();

	/* set some physics constants */
	newPlayer.runSpeed = 125;
	newPlayer.jumpSpeed = -250;
	newPlayer.wallJumpSpeed = -400;
	newPlayer.health = 5;
	newPlayer.isRunning = false;
	newPlayer.invulnerable = false;
	newPlayer.canWallJump = true; /* this resets every time player touches the ground, allows player to wall jump once */
	newPlayer.canDoubleJump = true;
	newPlayer.shootTimer = state.game.time.now;
	newPlayer.shootCooldown = 250; /* how many milliseconds between each shot */

	/* enable physics on player sprite and add hitbox size */
	state.game.physics.arcade.enable(newPlayer);
	newPlayer.body.collideWorldBounds = true;
	newPlayer.body.gravity.y = 600;
	newPlayer.body.setSize(11, 35, 35, 27);

	/* add the different player animations to the sprite */
	newPlayer.animations.add('jump', createAnimationFrameArray(10 + 2, 4) , 20, true);
	newPlayer.animations.add('run', createAnimationFrameArray(10*2, 10), 50, true);
	newPlayer.animations.add('idle', createAnimationFrameArray(10*4, 3), 5, true);
	newPlayer.animations.add('run-shoot', createAnimationFrameArray(10*3, 10), 20, false);
	newPlayer.animations.add('idle-shoot', createAnimationFrameArray(10*4 +1, 2), 20, false);
	newPlayer.animations.add('cling', createAnimationFrameArray(10*5, 1), 3, false);

	

	/* W A S D object used for handling player direction input */
	newPlayer.wasd = {
		up: state.game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: state.game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: state.game.input.keyboard.addKey(Phaser.Keyboard.A),
		right: state.game.input.keyboard.addKey(Phaser.Keyboard.D)
	};

	/* add another input variable for player jumps: SPACEBAR */
	newPlayer.jumpButton = state.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	newPlayer.shootButton = state.game.input.keyboard.addKey(Phaser.Keyboard.P);

	newPlayer.handleInput = function(){

		/* handle left/right running, using the W A S D keys */

		if (!(this.wasd.left.isDown || this.wasd.right.isDown) ||
			 (this.wasd.left.isDown && this.wasd.right.isDown)) { 

			this.body.velocity.x = 0;
			this.isRunning = false;
			if(this.body.onFloor()){ this.play('idle');}
		
		}
		else if (this.wasd.right.isDown) {

			this.scale.x = 1;
			this.body.velocity.x = this.runSpeed;
			this.isRunning = true;
			if(this.body.onFloor()){ this.play('run');}
			else {this.play('jump');}

		}
		else if (this.wasd.left.isDown) {
		
			this.scale.x = -1;
			this.body.velocity.x = -this.runSpeed;
			this.isRunning = true;
			if(this.body.onFloor()){ this.play('run');}
			else {this.play('jump');}

		}
		/* Handle jumps */

		/* jump when body is on the floor or made new contact with wall */
		if ( this.jumpButton.isDown){  

			if (this.body.onFloor() ){  
				this.body.velocity.y = this.jumpSpeed;
				this.play('jump');
			}
			else if (this.body.onWall() && this.canWallJump) {
				this.canWallJump = false;
				this.body.velocity.y = this.jumpSpeed;
				this.play('jump');
			}
			// else if (this.canDoubleJump){
			// 	this.canDoubleJump = false;
			// 	this.body.velocity.y = this.jumpSpeed;
			// 	this.play('jump');
			// }
		}

		/* handle shooting */
		if (this.shootButton.isDown){
			if(state.game.time.now > this.shootTimer){
				
				this.shoot(); /*creates a sprite shooting in the direction player is facing */
				
				if(this.isRunning)
					this.play('run-shoot');
				else
					this.play('idle-shoot');

				this.shootTimer = state.game.time.now + this.shootCooldown;
			}
		}

	}

	/* update function called automatically by game loop */
	newPlayer.update = function() {
		this.handleInput();
		/* reset the players ability to wall jump every time on floor or in air, encourages wall to wall jumping */
		if (!this.body.onWall()){ 
			this.canWallJump = true;
		}
		if (this.body.onFloor()){
			this.canDoubleJump = true;	
		}
	}

	/* create an explosion sprite/animate it on the player's current location*/
	newPlayer.explode = function() {
		this.kill();
		Explosion(state, this.body.x, this.body.y, 'groundExplosion', state.restart());
		return;
	}

	newPlayer.shoot = function() {
		var newBullet = spawnBullet(state, this);
		this.bullets.add(newBullet);
	}


	return newPlayer;
		
}


