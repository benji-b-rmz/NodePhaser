/* This file has the logic for a simple walking crab enemy 
 * should instantly kill player on hit
 */


/* function PatrolCrab passes the spawn point for the crab
 * and the boundaries is should patrol
 * as soon as it reaches one boundary, it turns around and walks to
 * the other one
 */
function PatrolCrab(state, x, y, patrolLength) {
	var crab = state.game.add.sprite(x, y, 'crab', 32);
	crab.anchor.setTo(0.5, 0.5);

	crab.runSpeed = 50;
	crab.health = 1;

	state.game.physics.arcade.enable(crab);
	crab.body.setSize(15, 16, 16, 14);
	crab.body.gravity.y = 200;
	crab.scale.x = 1;

	crab.animations.add('walk', createAnimationFrameArray(0, 4), 10, true);
	crab.play('walk');

	crab.decrementHealth = function(damage) {
		this.health -= damage;
		if (this.health <= 0) {
			this.kill();
		}
	}

	crab.update = function(){

		if(this.scale.x == 1) { 
			this.body.velocity.x = -crab.runSpeed;	
			if(this.body.x < x) {
				console.log("Reached left patrol limit");
				this.scale.x = -1;
			}
		}
		else {
			this.body.velocity.x = crab.runSpeed;
			if(this.body.x >  (x + patrolLength)) {
				console.log("Reached right patrol limit");
				this.scale.x = 1;
			}
		}
	}

	state.game.debug.body(crab);

	return crab;
}