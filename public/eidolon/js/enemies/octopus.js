/* This file implements the logic for Octopus class enemies 
 * these enemies fire missiles, contact with the Octopus or their missiles
 * should instantly kill player
 */

/* function Octopus impements the base class of the Octopus enemies */
function Octopus(state, enemyGroup, x, y) {
	var octopus = state.game.add.sprite(x, y, 'octopus', 0);
	octopus.anchor.setTo(0.5, 0.5);
	octopus.health = 1;

	/* Set octopus' physics properties */
	state.game.physics.arcade.enable(octopus);
	/* setting the collision box of sprite, 
	 * setSize(width, height, offsetX, offsetY) */
	octopus.body.setSize(14, 20, 7, 12);
	octopus.body.gravity.y = 200;
	octopus.scale.x = 1;

	octopus.animations.add('idle', createAnimationFrameArray(0, 4), 10, true);

	octopus.play('idle');

	octopus.decrementHealth = function(damage) {
		this.health -= damage;
		if (this.health <= 0) {
			this.kill();
		}
	}

	return octopus;
}

/* ShootingOctopus creates an octopus that shoots in a fixed direction */
function ShootingOctopus(state, enemyGroup, x, y) {
	var octopus = Octopus(state, enemyGroup, x, y);
	/* set the intervale between shots in milliseconds */
	octopus.shootTimer = 0;
	octopus.shootCooldown = 2000;

	octopus.update = function(){
		// console.log("octopuse update");
		console.log(state.game.time.now > this.shootTimer);
		if(state.game.time.now > this.shootTimer) {
			this.shoot();
			this.shootTimer = state.game.time.now + this.shootCooldown;
		}

	}

	octopus.shoot = function() {
		console.log("Octopus shooting!");
		var bullet = spawnEnemyBullet(state, this, -this.scale.x);
		enemyGroup.add(bullet);
	}

	return octopus;
}