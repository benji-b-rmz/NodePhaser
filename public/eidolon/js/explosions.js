/* This file contains a various explosion animations
 * roundExplosion: a small/mid-sized explosion used for when player dies
 */

var ExplosionEnum = Object.freeze({
	round: 			1,
	ground: 		2, 
	largeGround: 	3,
	mushroom:   	4,
});


/* roundExplosion, creates a sprite animation for a small explosion */
function Explosion(state, x, y, explosionKey, callback=null) {
	/* create a new sprite at the x,y coords */
	var explosion = state.game.add.sprite(x, y, explosionKey, 0);
	explosion.anchor.setTo(0.5, 0.5);

	/* set the animation frames depending on the type of explosionType passed */
	switch(explosionKey) {
		case 'roundExplosion':
			explosion.animations.add('explode', createAnimationFrameArray(0, 8), 20, false);
			break;
		case 'groundExplosion':
			explosion.animations.add('explode', createAnimationFrameArray(0, 8), 20, false);
			break;
		case 'largeGroundExplosion':
			explosion.animations.add('explode', createAnimationFrameArray(0, 10), 20, false);
			break;
		case 'mushroomExplosion':
			explosion.animations.add('explode', createAnimationFrameArray(0, 12), 20, false);
			break;
		default:
			explosion.animations.add('explode', createAnimationFrameArray(0), 5, false);
	}

	explosion.play('explode');

	explosion.animations.currentAnim.onComplete.add(function () {callback}, this);

	return explosion;
}
