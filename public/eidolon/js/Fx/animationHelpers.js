/* this file containts functions that help with sprite animations */

/* createAnimation Frame Array returns an array populated by 
 * the numbers from the startIndex to startIndex+numOfFrames
 * this is to help adding animations to sprites who have multiple 
 * animations on their spritesheets
 * check out https://phaser.io/docs/2.6.2/Phaser.AnimationManager.html#add
 * used to add animations for most sprites in this project
 */

function createAnimationFrameArray(startIndex, numOfFrames) {
    var array = [];
    for (var i = startIndex; i < startIndex + numOfFrames; i++) {array.push(i);}
    return array;
}
