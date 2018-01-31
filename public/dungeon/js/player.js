function spawnPlayer(state, x, y, spriteKey, frame=0){
	/* create a new sprite at the tile location corresponding to x and y */
	var newPlayer = state.game.add.sprite(x, y, spriteKey, frame);
	newPlayer.anchor.setTo(0.5);
	newPlayer.speed = 125;
	newPlayer.health = 5;
	newPlayer.isRunning = false;

	state.game.physics.arcade.enable(newPlayer);
	newPlayer.body.gravity.y = 600;
	newPlayer.body.setSize(11, 40, 35, 24);

	newPlayer.animations.add('jump', createAnimationFrameArray(10 + 2, 4) , 30, true);
	newPlayer.animations.add('run', createAnimationFrameArray(10*2, 10), 50, true);
	// player.animations.add('down', [], 10, true);
	newPlayer.animations.add('idle', createAnimationFrameArray(0, 4), 10, true);
	newPlayer.animations.add('run-shoot', createAnimationFrameArray(10*3, 10), 20, false);
	newPlayer.animations.add('idle-shoot', createAnimationFrameArray(10*4, 3), 20, false);

	newPlayer.invulnerable = false;

	newPlayer.wasd = {
		up: state.game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: state.game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: state.game.input.keyboard.addKey(Phaser.Keyboard.A),
		right: state.game.input.keyboard.addKey(Phaser.Keyboard.D)
	};

	newPlayer.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


	newPlayer.handleInput = function(){

		/* handle left/right running, using the W A S D keys */
		
		if (this.wasd.left.isDown) {
			this.scale.x = -1;
			this.body.velocity.x = -this.speed;
			this.isRunning = true;
			if(this.body.onFloor()){ this.play('run');}
			else if(this.body.onWall()){ this.play('cling');}

		}
		else if (this.wasd.right.isDown) {
			this.scale.x = 1;
			this.body.velocity.x = this.speed;
			this.isRunning = true;
			if(this.body.onFloor()){ this.play('run');}
			else if(this.body.onWall()){ this.play('cling');}

		}
		else { 
			this.body.velocity.x = 0;
			this.isRunning = false;
			if(this.body.onFloor()){ this.play('idle');}
			else if(this.body.onWall()){ this.play('cling');}
		}
	
		/* Handle jumps */

		/* jump when body is on the floor */
		if ( this.jumpButton.isDown && this.body.onFloor() ){
			this.body.velocity.y = -200;
			this.play('jump');
		}
		else if ( this.jumpButton.isDown && (this.body.onWall() && !this.body.onFloor())) {
		/* jump when body is on wall, this version jumps up and away from wall */	
			this.body.velocity.y = -200;
			this.body.velocity.x = this.scale.x * -50;
			this.play('jump');
		}

	}

	newPlayer.update = function() {
		this.handleInput();
	}

	return newPlayer;
}