
var ASSET_MANAGER = new AssetManager();

//hero images
ASSET_MANAGER.queueDownload("./resources/hero/defender.png");
ASSET_MANAGER.queueDownload("./resources/hero/defenderTitle.png");
ASSET_MANAGER.queueDownload("./resources/hero/defenderShadow.png");
ASSET_MANAGER.queueDownload("./resources/hero/character2.png");
ASSET_MANAGER.queueDownload("./resources/hero/greenguy.png");
ASSET_MANAGER.queueDownload("./resources/hero/eren.png");
ASSET_MANAGER.queueDownload("./resources/hero/eren2.png");
ASSET_MANAGER.queueDownload("./resources/hero/ErenJ.png");
ASSET_MANAGER.queueDownload("./resources/hero/ErenJ2.png");

//enemies images
ASSET_MANAGER.queueDownload("./resources/enemies/monstor2.png");
ASSET_MANAGER.queueDownload("./resources/enemies/monstor2rev.png");
ASSET_MANAGER.queueDownload("./resources/enemies/enemies.png");
ASSET_MANAGER.queueDownload("./resources/enemies/skeleton.png");
ASSET_MANAGER.queueDownload("./resources/enemies/boss.png");

//sounds
ASSET_MANAGER.queueDownload("./resources/sound/bruh.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/castleHurt.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/newRound.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/roar.mp3");

ASSET_MANAGER.queueDownload("./resources/sound/enemyDie.wav");
ASSET_MANAGER.queueDownload("./resources/sound/enemyDieThree.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/enemyHurt.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/fireballSound.wav");
ASSET_MANAGER.queueDownload("./resources/sound/arrowSound.wav");
ASSET_MANAGER.queueDownload("./resources/sound/collectCoin.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/eren.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/explosion.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/game-lose-2.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/notEnough.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/register.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/upgrade.mp3");


ASSET_MANAGER.queueDownload("./resources/sound/openTreasure.wav");
ASSET_MANAGER.queueDownload("./resources/sound/shieldBlock.wav");
ASSET_MANAGER.queueDownload("./resources/sound/swordAttack.wav");
ASSET_MANAGER.queueDownload("./resources/sound/playerHurt.mp3");

//music
ASSET_MANAGER.queueDownload("./resources/sound/startingMusic.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/eightbit_lit.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/gameoverSound.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/medieval_lit.mp3");
ASSET_MANAGER.queueDownload("./resources/sound/dumb_lit.mp3");



//Power Up images
ASSET_MANAGER.queueDownload("./resources/powerUps/coin.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/coinDisplay.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/powerUp1.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/spike.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/arrow.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/healthIncrease.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/title.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/airSlash.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/slash.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/shield.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/sonicwave.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/star.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/timeWatch.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/times2.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/speedDisplay.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/cooldown.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/lazerbeam.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/nuke.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/healthPotion.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/castleDefense.png");
ASSET_MANAGER.queueDownload("./resources/powerUps/damageIncrease.gif");
ASSET_MANAGER.queueDownload("./resources/powerUps/greenguyarrow.png");

//Background images
ASSET_MANAGER.queueDownload("./resources/background/bird.png");
ASSET_MANAGER.queueDownload("./resources/background/castle.png");
ASSET_MANAGER.queueDownload("./resources/background/castledefenderlogo.png");
ASSET_MANAGER.queueDownload("./resources/background/castlefull.png");
ASSET_MANAGER.queueDownload("./resources/background/sun.png");
ASSET_MANAGER.queueDownload("./resources/background/chest.png");
ASSET_MANAGER.queueDownload("./resources/background/background.jpg");
ASSET_MANAGER.queueDownload("./resources/background/healthgreen.jpg");
ASSET_MANAGER.queueDownload("./resources/background/healthred.jpg");
ASSET_MANAGER.queueDownload("./resources/background/healthblue.png");
ASSET_MANAGER.queueDownload("./resources/background/gold.png");
ASSET_MANAGER.queueDownload("./resources/background/exit.png");
ASSET_MANAGER.queueDownload("./resources/background/explosion.png");
ASSET_MANAGER.queueDownload("./resources/background/cart.png");
//ASSET_MANAGER.queueDownload("./resources/.png");
//ASSET_MANAGER.queueDownload("./resources/.png");
//ASSET_MANAGER.queueDownload("./resources/.png");


ASSET_MANAGER.downloadAll(function() {
    var gameEngine = new GameEngine();
    var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
    ASSET_MANAGER.autoRepeat("./resources/sound/eightbit_lit.mp3");
    ASSET_MANAGER.autoRepeat("./resources/sound/dumb_lit.mp3");
    ASSET_MANAGER.autoRepeat("./resources/sound/medieval_lit.mp3");
    ASSET_MANAGER.autoRepeat("./resources/sound/gameoverSound.mp3");
    
    
    ctx.imageSmoothingEnabled = false;

    
    gameEngine.init(ctx);
    
    
    gameEngine.init(ctx);
    
	new SceneManager(gameEngine);
 
	gameEngine.start();

});