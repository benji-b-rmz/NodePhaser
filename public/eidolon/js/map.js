/* This file contains functions dealing with creating level map
 * and environment backgrounds
 */


/* function createBackgrounds for the current level */
function createBackgrounds(state){
    /* create background images, background and middleground, used to create parallax effect */
    state.background = state.game.add.tileSprite(0, 0, EidolonGlobals.width, EidolonGlobals.height, 'background');
    state.background.fixedToCamera = true;

    state.middleground = state.game.add.tileSprite(0, 0, EidolonGlobals.width, EidolonGlobals.height, 'middleground');
    state.middleground.fixedToCamera = true;
}

/* function parallaxBackgrounds moves the middle ground in relation to the current position
 * this creates the effect of the background moving as you move around 
 */
function parallaxBackgrounds(state){
    state.middleground.tilePosition.x = state.layer0.x * -0.5;
}

/* function createmap, called by create() function in each level state
 * used to generate tilemap layer and collision logic for each level
 */
function createMap(state, mapCSVKey, tilesetImageKey) {
// Collision map
    var map = state.game.add.tilemap(mapCSVKey, EidolonGlobals.tilesize, EidolonGlobals.tilesize);

    //  Now add in the tileset
    map.addTilesetImage(tilesetImageKey);
    
    //  Create our layer
    state.layer0 = map.createLayer(0);

    //  Resize the world
    state.layer0.resizeWorld();

    if(tilesetImageKey == 'caveTiles'){
        //set the collision/callback indices for the caveTiles tileset
        setCaveMapCollisionTiles(state, map);
        console.log("Tried to set the cave map collision tiles");
    }

    // uncomment debug bool to debug collision tiles
    // state.layer0.debug = true;

    return map;
}


function setCaveMapCollisionTiles(state, map) {
	/* Set tile callbacks for special tiles */
    // map.setTileIndexCallback(78, onHit, state);

    /* Set tile collisions for solid impassable tiles */
    this.state = state;
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

    // Heads
    map.setCollisionBetween(80, 81);
    map.setCollisionBetween(86, 87);

    // Foliage
    map.setCollision(83); map.setCollision(89); // long-bottom foliage
    map.setCollisionBetween(110, 113); // 110-111 medium sized foliage, 112 - med-small, 113, smallest
    map.setCollision(114); // ceiling foliage

    // LAVA
    map.setTileIndexCallback(78, state.hitDeathTile, state);
    map.setTileIndexCallback(84, state.hitDeathTile, state);

    // SPIKE/Insta-Death TILES
    //top
    map.setTileIndexCallback(121, state.hitDeathTile, state);
    map.setTileIndexCallback(122, state.hitDeathTile, state);
    map.setTileIndexCallback(123, state.hitDeathTile, state);
    map.setTileIndexCallback(124, state.hitDeathTile, state);
    //left
    map.setTileIndexCallback(127, state.hitDeathTile, state);
    map.setTileIndexCallback(133, state.hitDeathTile, state);
    //right
    map.setTileIndexCallback(130, state.hitDeathTile, state);
    map.setTileIndexCallback(136, state.hitDeathTile, state);
    //bottom
    map.setTileIndexCallback(139, state.hitDeathTile, state);
    map.setTileIndexCallback(140, state.hitDeathTile, state);
    map.setTileIndexCallback(141, state.hitDeathTile, state);
    map.setTileIndexCallback(142, state.hitDeathTile, state);

	console.log("SET CAVEMAP COLLISIONS");

}