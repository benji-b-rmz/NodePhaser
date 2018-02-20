/* Projectiles file for impelementing the code for different type of projectiles
 * such as player and enemy bullets
 */

/* spawnBullet() function creates a bullet at the current location
 * and sets its velocity in the direction the parent sprite is facing 
 */
function spawnBullet(state, parentSprite) {
	/* create the sprite at the parent sprite's x,y */
	var bullet = state.game.add.sprite(parentSprite.x, parentSprite.y, 'bullet', 0);
	bullet.anchor.setTo(0.5,0.5);

	/* set some physics constants */
	bullet.fireSpeed = 300;

	/* enable physics on the sprite for collision logic */
	state.game.physics.arcade.enable(bullet);
	bullet.body.collideWorldBounds = true;

	/* set it moving in the direction the parent sprite is facing */
	bullet.body.velocity.x = parentSprite.scale.x * bullet.fireSpeed;

	/* add bullet sprite animations */
	bullet.animations.add('shoot', createAnimationFrameArray(0,2), 5, true);

	bullet.play('shoot');

	return bullet;
} 

/* very similar to spawnBullet() may be an area for refactoring */
function spawnEnemyBullet(state, parentSprite, direction) {
	/* create the sprite at the parent sprite's x,y */
	var bullet = state.game.add.sprite(parentSprite.x, parentSprite.y, 'enemyBullet', 0);
	bullet.anchor.setTo(0.5,0.5);
	bullet.type = ENEMY_TYPES.PROJECTILE;

	/* set some physics constants */
	bullet.fireSpeed = 150;

	/* enable physics on the sprite for collision logic */
	state.game.physics.arcade.enable(bullet);
	bullet.body.collideWorldBounds = true;

	/* set it moving in the direction the parent sprite is facing */
	bullet.body.velocity.x = direction * bullet.fireSpeed;

	/* add bullet sprite animations */
	bullet.animations.add('shoot', createAnimationFrameArray(0,2), 5, true);

	bullet.play('shoot');

	bullet.update = function() {

		if ((this.body.onWall() || this.body.onFloor()) && this.alive){
			this.explode();
		}
	};

	bullet.explode = function() {
		this.kill();
		Explosion(state, this.body.x, this.body.y, 'roundExplosion');
		return;
	};

	return bullet;
} 

