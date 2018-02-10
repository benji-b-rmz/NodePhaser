var EidolonGlobals = {
	width: 		480,
	height: 	270,
	tilesize: 	16
};

var EidolonGame = new Phaser.Game(
	EidolonGlobals.width,
	EidolonGlobals.height,
	Phaser.CANVAS,
	"Eidolon"
);

EidolonGame.state.add("Boot", boot);
EidolonGame.state.add("LoadScreen", loadScreen);
EidolonGame.state.add("TitleScreen", titleScreen);
EidolonGame.state.add("GameOver", gameOver);
EidolonGame.state.add("Victory", victory);
EidolonGame.state.add("Credits", credits);

/* Adding level states */

/* LEVEL 1 */
EidolonGame.state.add("Level1_0", level1_0);
EidolonGame.state.add("Level1_1", level1_1);

/* Start the game */
EidolonGame.state.start("Boot");