function spawnPlayer(state, x, y, spriteKey, frame=0){
	/* create a new sprite at the tile location corresponding to x and y */
	var newPlayer = state.game.add.sprite(x, y, spriteKey, frame);
	newPlayer.anchor.setTo(0.5);
	newPlayer.speed = 125;
	newPlayer.health = 5;
	newPlayer.isRunning = false;

	/* enable physics on player sprite and add hitbox size */
	state.game.physics.arcade.enable(newPlayer);
	newPlayer.body.gravity.y = 600;
	newPlayer.body.setSize(11, 40, 35, 24);

	/* add the different player animations to the sprite */
	newPlayer.animations.add('jump', createAnimationFrameArray(10 + 2, 4) , 20, true);
	newPlayer.animations.add('run', createAnimationFrameArray(10*2, 10), 50, true);
	newPlayer.animations.add('idle', createAnimationFrameArray(0, 4), 10, true);
	newPlayer.animations.add('run-shoot', createAnimationFrameArray(10*3, 10), 20, false);
	newPlayer.animations.add('idle-shoot', createAnimationFrameArray(10*4, 3), 20, false);
	newPlayer.animations.add('cling', createAnimationFrameArray(10*5, 1), 3, false);

	/* invulnerable variable used for handling when player takes damage */
	newPlayer.invulnerable = false;

	/* W A S D object used for handling player direction input */
	newPlayer.wasd = {
		up: state.game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: state.game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: state.game.input.keyboard.addKey(Phaser.Keyboard.A),
		right: state.game.input.keyboard.addKey(Phaser.Keyboard.D)
	};

	/* add another input variable for player jumps: SPACEBAR */
	newPlayer.jumpButton = state.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


	newPlayer.handleInput = function(){

		/* handle left/right running, using the W A S D keys */
		
		if (this.wasd.left.isDown) {
		
			this.scale.x = -1;
			this.body.velocity.x = -this.speed;
			this.isRunning = true;
			if(this.body.onFloor()){ this.play('run');}
			else {this.play('jump');}

		}
		else if (this.wasd.right.isDown) {

			this.scale.x = 1;
			this.body.velocity.x = this.speed;
			this.isRunning = true;
			if(this.body.onFloor()){ this.play('run');}
			else {this.play('jump');}

		}
		else { 

			this.body.velocity.x = 0;
			this.isRunning = false;
			if(this.body.onFloor()){ this.play('idle');}
		
		}
	
		/* Handle jumps */

		/* jump when body is on the floor */
		if ( this.jumpButton.isDown && (this.body.onFloor() || this.body.onWall())) {

			this.body.velocity.y = -200;
			this.play('jump');
		}

	}

	/* update function called automatically by game loop */
	newPlayer.update = function() {
		this.handleInput();
	}

	return newPlayer;
}

function createAnimationFrameArray(startIndex, numOfFrames) {
    var array = [];
    for (var i = startIndex; i < startIndex + numOfFrames; i++) {array.push(i);}
    return array;
}